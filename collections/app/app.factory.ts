import { Input } from '@actions/models';
import { CollectionFactory } from '@collections/types';
import { GenerateCommandOptions } from '@commands/generate';
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
        options?: GenerateCommandOptions,
        props?: AppOptions
    ) {
        const configuration = await UserConfiguration.create();

        // const outputDir = join(configuration.userDir, name);
        // await fs.copy(envVariable.templates.app, outputDir, {
        //     recursive: true,
        // });
    }
}
