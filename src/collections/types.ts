import { GenerateCommandOptions } from '@commands/generate';
import { QuestionsTemplateKeys } from '@lib/schematics/generate/types';
import appSchema from '@collections/app/schema.json';
import containerSchema from '@collections/container/schema.json';
export interface CollectionFactory {
    execute: (
        schematic: QuestionsTemplateKeys,
        name?: string,
        options?: GenerateCommandOptions,
        schema?: Record<string, any>
    ) => Promise<void>;
}


export type CollectionsSchemas = typeof appSchema | typeof containerSchema;