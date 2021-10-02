import { Input } from '@actions/models';
import { CollectionFactory } from '@collections/types';
import { QuestionsTemplateKeys } from '@lib/schematics/generate/types';

export default class AppFactory {
    static async execute(
        schematic: QuestionsTemplateKeys,
        name?: string,
        path?: string,
        options?: Input
    ) {
        console.log(schematic, name, path, options);
    }
}
