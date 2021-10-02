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

export type GenerateSchemaEntry = typeof questionsSchema;
