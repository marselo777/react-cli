import { ModuleRunner } from '@lib/runners/ModuleRunner';
import path from 'path';
import { CliConfig } from '@types';
import { envVariable } from '@constants';
export interface IUserConfiguration {
    path?: string;
}
export class UserConfiguration {
    static async create(options?: IUserConfiguration) {
        const cliConfig = await ModuleRunner.load<CliConfig>(
            envVariable.cliConfigPath
        );
        const userCliConfig = await ModuleRunner.load<CliConfig>(
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
            ...config,
        };
    }
}
