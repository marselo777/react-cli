import { GenerateCommandOptions } from '@commands/generate';
import { Input } from '../models';

export abstract class BaseAction {
    public abstract build(
        schematic?: string,
        path?: string,
        name?: string,
        options?: GenerateCommandOptions
    ): Promise<void>;
}
