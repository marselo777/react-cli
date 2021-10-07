import { GenerateCommandOptions } from '@commands/generate';
import { QuestionsTemplateKeys } from 'src/questions/generate/types';
import appSchema from '@collections/app/schema.json';
import containerSchema from '@collections/container/schema.json';
export interface CollectionFactory {
    execute: (
        props?: Record<string, any>,
        options?: GenerateCommandOptions,
    ) => Promise<void>;
}


export type CollectionsSchemas = typeof appSchema | typeof containerSchema;