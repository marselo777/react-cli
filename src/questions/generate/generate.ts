import { QuestionCollection } from 'inquirer';
import choices from 'inquirer/lib/objects/choices';
import {
    appSchema,
    componentSchema,
    containerSchema,
    epicSchema,
    sliceSchema,
    widgetSchema,
} from './react';

export const questionsSchema = {
    container: containerSchema,
    app: appSchema,
    widget: widgetSchema,
    slice: sliceSchema,
    component: componentSchema,
    epic: epicSchema,
};

export const defaultQuestionsSchema:QuestionCollection =  {
    message: 'Выберите по какой схеме начать генерацию',
    type: 'list',
    name: 'schematic',
    choices: Object.keys(questionsSchema),
}

export type GenerateSchemaEntry = typeof questionsSchema;
