import { BaseAction } from '@actions/base/base.action';
import { Input } from '@actions/models';
import {
    GenerateSchemaKeys,
    generateSchema,
    GenerateSchemaEntry,
} from '@lib/schematics/generate';
import inquirer, { DistinctQuestion } from 'inquirer';

export class GenerateAction extends BaseAction {
    public async build(
        schematic: GenerateSchemaKeys,
        name?: string,
        path?: string,
        options?: Input
    ): Promise<void> {
        const promptQuestions = await this.generateQuestions(
            schematic,
            path,
            name
        );
        const result = await inquirer.prompt(promptQuestions);
    }
    public async generateQuestions(
        schematic: GenerateSchemaKeys,
        path?: string,
        name?: string
    ): Promise<Input> {
        return generateSchema[schematic];
    }
}
