import { GenerateCommandOptions } from '@commands/generate';
import { envVariable } from '@constants';
import { UserConfiguration } from '@lib/configuration/configuration';
import fs from 'fs-extra';
import { join, resolve } from 'path';
import { AppOptions } from './app.schema';
import TaskManager from 'listr';
import chalk from 'chalk';
import execa from 'execa';
import { AbstractFactory } from '@collections/AbstractFactory';

export default class AppFactory extends AbstractFactory {
    async execute(props: AppOptions, options: GenerateCommandOptions) {
        const configuration = await UserConfiguration.create({
            path: props?.path,
        });
        const appName = props?.name || options.name;
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
            skip: () => !props?.install,
        });
        await tasks.run();
        console.log(
            chalk.green(`Приложение ${appName} успешно сгенерировано.`)
        );
    }
}
