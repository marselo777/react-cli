import { BaseCommand } from '@commands/base/base.command';
import { QuestionsTemplateKeys } from '@lib/schematics/generate/types';
import { Command } from 'commander';

export class GenerateCommand extends BaseCommand {
    public load(program: Command) {
        program
            .command('generate <schematic> [name] [path]')
            .alias('g')
            .action(
                async (
                    schematic: QuestionsTemplateKeys,
                    name: string,
                    path: string,
                    command: Command
                ) => {
                    await this.action.build(schematic, name, path);
                }
            );
    }
}
