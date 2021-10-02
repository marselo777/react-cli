import { GenerateAction } from '@actions/generate/generate.actions';
import { GenerateCommand } from '@commands/generate';
import { Command } from 'commander';
export class Commander {
    public static run(program: Command): void {
        new GenerateCommand(new GenerateAction()).load(program);
    }
}
