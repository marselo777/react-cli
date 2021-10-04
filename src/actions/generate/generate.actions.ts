import { BaseAction } from '@actions/base/base.action';
import { QuestionsTemplateKeys } from '@lib/schematics/generate/types';
import { envVariable } from '@constants';
import { ModuleRunner } from '@lib/runners/ModuleRunner';
import { CollectionsSchema } from 'src/collections/collections.schema';
import { CollectionFactory } from 'src/collections/types';
import { GenerateCommandOptions } from '@commands/generate';
import { questionsSchema } from '@lib/schematics/generate';
import inquirer from 'inquirer';
export class GenerateAction extends BaseAction {
    public async build(
        schematic: QuestionsTemplateKeys,
        name?: string,
        path?: string,
        options?: GenerateCommandOptions
    ): Promise<void> {
        const collections = await ModuleRunner.load<CollectionsSchema>(
            envVariable.collections
        );

        const collectionFactory = await ModuleRunner.load<CollectionFactory>(
            collections?.[schematic].factory,
            {
                importType: 'default',
            }
        );

        const schemaJson = await ModuleRunner.load(
            collections?.[schematic].schema
        );
        const parsedSchema = await transformSchema(schemaJson as any);

        const generateValues = {
            ...parsedSchema,
            ...options,
            name,
        };

        const questions = await getQuestions(questionsSchema, schematic);
        const questionsResult = await inquirer.prompt(
            questions,
            generateValues
        );

        collectionFactory?.execute(
            schematic,
            name,
            path,
            options,
            questionsResult
        );
    }
}

async function getQuestions<
    Questions extends Record<string, any> = any,
    QuestionsKey extends string = string
>(
    questions: Questions,
    schematics: QuestionsKey
): Promise<Questions[QuestionsKey]> {
    return questions[schematics];
}

async function transformSchema(schema: { properties: Record<string, any> }) {
    return Object.entries(schema?.properties || {}).reduce(
        (prev, [key, value]) => {
            if (value?.default) {
                return { ...prev, [key]: value.default };
            }
            return {
                [key]: null,
            };
        },
        {}
    );
}
