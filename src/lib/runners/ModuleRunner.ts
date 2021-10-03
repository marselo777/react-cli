interface ModuleRunnerOptions {
    importType?: 'default';
    err?: (e: any) => void;
}
export class ModuleRunner {
    static async load<ModuleType extends {}>(
        path?: string,
        options?: ModuleRunnerOptions
    ): Promise<ModuleType | undefined> {
        try {
            const module = await import(path || '');
            if (options?.importType === 'default') {
                return module?.default;
            } else {
                return module;
            }
        } catch (err) {
            options?.err && options?.err(err);
        }
    }
}
