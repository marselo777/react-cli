import { Input } from '@actions/models';
import { CollectionFactory } from '@collections/types';
import { envVariable } from '@constants';
import { UserConfiguration } from '@lib/configuration/configuration';
import { QuestionsTemplateKeys } from '@lib/schematics/generate/types';
import fs from 'fs-extra';
import { join, resolve } from 'path';
import { AppOptions } from './app.schema';

export default class AppFactory {
    static async execute(
        schematic: QuestionsTemplateKeys,
        name: string,
        path?: string,
        options?: Input,
        schema?: AppOptions
    ) {
        const configuration = UserConfiguration.create();

        // const outputDir = join(configuration.userDir, name);
        // await fs.copy(envVariable.templates.app, outputDir, {
        //     recursive: true,
        // });
        console.log(schema, 'app-factory');

        console.log(schematic, name, path, options);
    }
}
