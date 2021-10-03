import { BaseAction } from '@actions/base/base.action';
import { Input } from '@actions/models';
import { QuestionsTemplateKeys } from '@lib/schematics/generate/types';
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

        const collectionFactory = await ModuleRunner.load<CollectionFactory>(
            collections[schematic].factory,
            {
                importType: 'default',
            }
        );

        const schemaJson = await ModuleRunner.load(
            collections[schematic].schema
        );
        const parsedSchema = await transformSchema(schemaJson as any);
        collectionFactory.execute(schematic, name, path, options, parsedSchema);
    }
}

async function transformSchema(schema: { properties: Record<string, any> }) {
    return Object.entries(schema.properties).reduce((prev, [key, value]) => {
        if (value?.default) {
            return { ...prev, [key]: value.default };
        }
        return {
            [key]: null,
        };
    }, {});
}
