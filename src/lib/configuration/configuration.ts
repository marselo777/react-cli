import { ModuleRunner } from '@lib/runners/ModuleRunner';
import path from 'path';
import { CliConfig } from '@types';
import { envVariable } from '@constants';
export class UserConfiguration {
    static async create() {
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
        return {
            userDir: process.cwd(),
            ...config,
        };
    }
}
