import { Input } from '@actions/models';
import { GenerateCommandOptions } from '@commands/generate';
import { QuestionsTemplateKeys } from '@lib/schematics/generate/types';

export interface CollectionFactory {
    execute: (
        schematic: QuestionsTemplateKeys,
        name?: string,
        path?: string,
        options?: GenerateCommandOptions,
        schema?: Record<string, any>
    ) => Promise<void>;
}
