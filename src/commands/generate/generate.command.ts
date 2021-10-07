import { BaseCommand } from '@commands/base/base.command';
import { QuestionsTemplateKeys } from 'src/questions/generate/types';
import { Command } from 'commander';

export interface GenerateCommandOptions {
    slice: boolean;
    spec: boolean;
    epic: boolean;
    install: boolean;
    path: string;
    name: string;
    style?: boolean;
    schematic: QuestionsTemplateKeys
}

export type  GenerateOptions = Omit<GenerateCommandOptions, 'schematic' | 'name' | 'path'>;
export class GenerateCommand extends BaseCommand {
    public load(program: Command) {
        program
            .command('generate <schematic> [name] [path]')
            .alias('g')
            .description('Кек')
            .option('-s, --slice', 'Нужно ли генерировать Slice', true)
            .option('--no-slice', 'Убрать генерацию Slice', false)
            .option('--spec', 'Генерировать ли тесты', true)
            .option('--style', 'Создает styled-компонент')
            .option('--no-spec', 'Убрать генерацию тестов', false)
            .option('-e, --epic', 'Нужно ли генерировать Epic', true)
            .option('--no-epic', 'Убрать генерацию Epic', false)
            .option('-i, --install', 'Нужно ли установить зависимости', true)
            .option('--no-install', 'Убрать установку зависимостей', false)
            .option('-p, --path <type>', 'Путь к папке для сгенерированных файлов.', (value) => value)
            .action(
                async (
                    schematic: QuestionsTemplateKeys,
                    name: string,
                    path: string,
                    opt: GenerateOptions
                ) => {
                    const options = {
                        path,
                        name,
                        schematic,
                        ...opt
                    }

                    await this.action.build(options);
                }
            );
        
    }
}
