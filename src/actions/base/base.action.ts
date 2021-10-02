import { Input } from '../models';

export abstract class BaseAction {
    public abstract build(
        schematic?: string,
        path?: string,
        name?: string,
        options?: Input
    ): Promise<void>;
}
