import { resolve } from 'path';
interface ModuleRunnerOptions {
    importType?: 'default';
}
export class ModuleRunner {
    static async load<ModuleType>(
        path: string,
        options?: ModuleRunnerOptions
    ): Promise<ModuleType> {
        const module = await import(path);
        if (options?.importType === 'default') {
            return module.default;
        } else {
            return module;
        }
    }
}
