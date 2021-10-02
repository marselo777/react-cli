import { BaseAction } from '@actions/base/base.action';
import { Input } from '@actions/models';
import { questionsSchema, GenerateSchemaEntry } from '@lib/schematics/generate';
import { QuestionsTemplateKeys } from '@lib/schematics/generate/types';
import inquirer, { DistinctQuestion } from 'inquirer';
import { envVariable } from '@constants';
import { ModuleRunner } from '@lib/runners/ModuleRunner';
import { CollectionsSchema } from '@collections/collections.schema';
import { CollectionFactory } from '@collections/types';
export class GenerateAction extends BaseAction {
    public async build(
        schematic: QuestionsTemplateKeys,
        name?: string,
        path?: string,
        options?: Input
    ): Promise<void> {
        const collections = await ModuleRunner.load<CollectionsSchema>(
            envVariable.collections
        );

        const schemaFactory = await ModuleRunner.load<CollectionFactory>(
            collections[schematic].factory,
            {
                importType: 'default',
            }
        );
        schemaFactory.execute(schematic, name, path, options);
    }
}
