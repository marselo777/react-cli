import fs from 'fs-extra';
import { join, resolve } from 'path';
import { ComponentOptions } from './component.schema';
import TaskManager from 'listr';
import chalk from 'chalk';
import { template } from 'lodash';
import { AbstractFactory } from '../AbstractFactory';
import { UserConfiguration } from '../../utils/root-configuration/configuration';

export default class ComponentFactory extends AbstractFactory {
    async execute(props: ComponentOptions, options: ComponentOptions) {
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
        const readedFile = resolve(__dirname, 'files', 'ts', baseFileName);
        console.log(__dirname, 'dir');
        console.log(readedFile, 'read');
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
