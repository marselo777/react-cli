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
import collections from '@slenter/cli-schematics';
import path from 'path';
export class GenerateAction extends BaseAction {
    public async build(options: GenerateCommandOptions): Promise<void> {
        const schematic = await getSchematicName<QuestionsTemplateKeys>(
            options.schematic
        );

        const collectionFactory = await ModuleRunner.load<CollectionFactory>(
            path.join(
                '@slenter/cli-schematics',
                'sources',
                collections?.[schematic].factory
            ),
            {
                importType: 'default',
            }
        );

        const schemaJson = await ModuleRunner.load<CollectionsSchemas>(
            path.join(
                '@slenter/cli-schematics',
                'sources',
                collections?.[schematic].schema
            )
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

        collectionFactory &&
            new collectionFactory().execute(questionsResult, options);
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
