import { GenerateCommandOptions } from '@commands/generate';

export abstract class BaseAction {
    public abstract build(options: GenerateCommandOptions): Promise<void>;
}
