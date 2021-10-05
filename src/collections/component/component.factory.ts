import { GenerateCommandOptions } from '@commands/generate';
import { envVariable } from '@constants';
import { UserConfiguration } from '@lib/configuration/configuration';
import fs from 'fs-extra';
import { join, resolve } from 'path';
import { ComponentOptions } from './component.schema';
import TaskManager from 'listr';
import chalk from 'chalk';
import execa from 'execa';
import { ModuleRunner } from '@lib/runners/ModuleRunner';
import {template} from 'lodash';

export default class ComponentFactory {
    static async execute(
        props: ComponentOptions,
        options: GenerateCommandOptions,
    ) {
        const configuration = await UserConfiguration.create({
            path: props?.path,
        });
        const componentName = props?.name || options.name;
        const outputDir = join(configuration.userDir, componentName + '.ts');
        const tasks = new TaskManager();

        tasks.add({
            title: 'Генерация компонента',
            task: async (ctx) => {
                const componentTemplate = await fs.readFile(envVariable.templates.component);
                const compile = template(String(componentTemplate));
                ctx.template = compile({
                    Name: componentName
                })
            }
        });

        tasks.add({
            title: 'Обработка компонента',
            task: async ({template}) => {
                return fs.outputFile(outputDir, template);
            }
        })

        await tasks.run();
        console.log(
            chalk.green(
                `Компонент ${componentName} успешно сгенерирован.`
            )
        );
    }
}
