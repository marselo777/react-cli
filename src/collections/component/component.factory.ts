import { GenerateCommandOptions } from '@commands/generate';
import { envVariable } from '@constants';
import { UserConfiguration } from '@lib/configuration/configuration';
import fs from 'fs-extra';
import { join } from 'path';
import { ComponentOptions } from './component.schema';
import TaskManager from 'listr';
import chalk from 'chalk';
import { template } from 'lodash';
import { AbstractFactory } from '@collections/AbstractFactory';

export default class ComponentFactory extends AbstractFactory {
    async execute(props: ComponentOptions, options: GenerateCommandOptions) {
        const configuration = await UserConfiguration.create({
            path: props?.path,
        });
        const componentName = props?.name || options.name;
        const componentExt = options.style ? 'styles.ts' : 'ts';
        const baseFileName = [configuration.defaultFileName, componentExt].join(
            '.'
        );
        const outputFileName = [componentName, componentExt].join('.');
        const outputDir = join(configuration.userDir, outputFileName);
        const readedFile = join(envVariable.templates.component, baseFileName);
        const tasks = new TaskManager();

        tasks.add({
            title: 'Генерация компонента',
            task: async (ctx) => {
                const componentTemplate = await fs.readFile(readedFile);
                const replacedFile = template(String(componentTemplate))({
                    Name: componentName,
                });
                ctx.template = replacedFile;
            },
        });

        tasks.add({
            title: 'Обработка компонента',
            task: async ({ template }) => {
                return fs.outputFile(outputDir, template);
            },
        });

        await tasks.run();
        console.log(chalk.green(`Компонент ${componentName} успешно создан.`));
    }
}
