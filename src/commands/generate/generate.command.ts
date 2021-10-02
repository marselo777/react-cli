import { BaseCommand } from '@commands/base/base.command';
import { generateSchema } from '@lib/schematics/generate/generate';
import { GenerateSchemaKeys } from '@lib/schematics/generate/models';
import { Command } from 'commander';
import inquirer from 'inquirer';

export class GenerateCommand extends BaseCommand {
    public load(program: Command) {
        program
            .command('generate <schematic> [name] [path]')
            .alias('g')
            .action(
                async (
                    schematic: GenerateSchemaKeys,
                    name: string,
                    path: string,
                    command: Command
                ) => {
                    await this.action.build(schematic, name, path);
                }
            );
    }
}
