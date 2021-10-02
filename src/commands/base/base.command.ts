import { BaseAction } from '@actions/base/base.action';
import { Command } from 'commander';

export abstract class BaseCommand {
    constructor(protected action: BaseAction) {}

    public abstract load(program: Command): void;
}
