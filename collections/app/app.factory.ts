import { GenerateCommandOptions } from '@commands/generate';
import { envVariable } from '@constants';
import { UserConfiguration } from '@lib/configuration/configuration';
import { QuestionsTemplateKeys } from '@lib/schematics/generate/types';
import fs from 'fs-extra';
import { join, resolve } from 'path';
import { AppOptions } from './app.schema';
import TaskManager from 'listr';
import chalk from 'chalk';
import execa from 'execa';

export default class AppFactory {
    static async execute(
        schematic: QuestionsTemplateKeys,
        name: string,
        path?: string,
        options?: GenerateCommandOptions,
        props?: AppOptions
    ) {
        const configuration = await UserConfiguration.create();
        const appName = props?.name || name;
        const outputDir = join(configuration.userDir, appName);
        const tasks = new TaskManager();
        tasks.add({
            title: 'Генерация шаблона приложения',
            task: () => {
                return fs.copy(envVariable.templates.app, outputDir, {
                    recursive: true,
                });
            },
        });
        tasks.add({
            title: 'Установка зависимостей',
            task: () => {
                return execa('npm', ['install'], {
                    cwd: resolve(configuration.userDir, appName),
                });
            },
            skip: () => !!props?.installDeps,
        });
        await tasks.run();
        console.log(
            chalk.blue(
                `Приложение ${name} успешно сгенерировано, приятной работы!`
            )
        );
    }
}
