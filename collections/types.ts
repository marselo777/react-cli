import { Input } from '@actions/models';
import { QuestionsTemplateKeys } from '@lib/schematics/generate/types';

export interface CollectionFactory {
    execute: (
        schematic: QuestionsTemplateKeys,
        name?: string,
        path?: string,
        options?: Input,
        schema?: Record<string, any>
    ) => Promise<void>;
}
