import path from 'path';
import { ModuleRunner } from '../runners';
export interface IUserConfiguration {
    path?: string;
}
export class UserConfiguration {
    static async create(options?: IUserConfiguration) {
        const rootPath = require.main.filename;
        const cliConfig = await ModuleRunner.load(
            path.resolve(rootPath, '..', '..', 'cli.config.json')
        );
        const userCliConfig = await ModuleRunner.load(
            path.resolve(process.cwd(), 'cli.config.json')
        );

        const config = {
            ...cliConfig,
            ...userCliConfig,
        };

        const userDir = [process.cwd()];
        if (options?.path) {
            userDir.push(options.path);
        }
        return {
            userDir: path.resolve(...userDir),
            defaultFileName: '__name__',
            ...config,
        };
    }
}
