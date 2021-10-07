import { BaseAction } from '@actions/base/base.action';
import { QuestionsTemplateKeys } from 'src/questions/generate/types';
import { envVariable } from '@constants';
import { ModuleRunner } from '@lib/runners/ModuleRunner';
import { CollectionsSchema } from 'src/collections/collections.schema';
import { CollectionFactory, CollectionsSchemas } from 'src/collections/types';
import { GenerateCommandOptions } from '@commands/generate';
import { defaultQuestionsSchema, questionsSchema } from '@questions/generate';
import inquirer from 'inquirer';
import { transformSchema } from '@lib/transformation';
import { getQuestions } from '@lib/common';
export class GenerateAction extends BaseAction {
    public async build(options: GenerateCommandOptions): Promise<void> {
        const schematic = await getSchematicName<QuestionsTemplateKeys>(
            options.schematic
        );

        const collections = await ModuleRunner.load<CollectionsSchema>(
            envVariable.collections
        );

        const collectionFactory = await ModuleRunner.load<CollectionFactory>(
            collections?.[schematic].factory,
            {
                importType: 'default',
            }
        );

        const schemaJson = await ModuleRunner.load<CollectionsSchemas>(
            collections?.[schematic].schema
        );

        const parsedSchema = await transformSchema(schemaJson);

        const generateValues = {
            ...parsedSchema,
            ...options,
        };

        const questions = await getQuestions(questionsSchema, schematic);
        const questionsResult = await inquirer.prompt(
            questions,
            generateValues
        );

        collectionFactory?.execute(questionsResult, options);
    }
}

async function getSchematicName<Keys>(schematicType?: Keys): Promise<Keys> {
    if (schematicType) {
        return schematicType;
    } else {
        const { schematic } = await inquirer.prompt<any>(
            defaultQuestionsSchema
        );
        return schematic;
    }
}
