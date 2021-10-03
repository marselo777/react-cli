import { BaseCommand } from '@commands/base/base.command';
import { QuestionsTemplateKeys } from '@lib/schematics/generate/types';
import { Command } from 'commander';

export class GenerateCommand extends BaseCommand {
    public load(program: Command) {
        program
            .command('generate <schematic> [name] [path]')
            .alias('g')
            .description('Кек')
            .option('-s, --slice', 'Нужно ли генерировать Slice', true)
            .option('--no-slice', 'Убрать генерацию Slice', false)
            .option('--spec', 'Генерировать ли тесты', true)
            .option('--no-spec', 'Убрать генерацию тестов', false)
            .option('-e, --epic', 'Нужно ли генерировать Epic', true)
            .option('--no-epic', 'Убрать генерацию Epic', false)
            .option('-i, --depsInstall', 'Нужно ли установить зависимости', true)
            .action(
                async (
                    schematic: QuestionsTemplateKeys,
                    name: string,
                    path: string,
                    command: Command
                ) => {
                    console.log(command, 'command');
                    await this.action.build(schematic, name, path);
                }
            );
        
    }
}
