import { reactSchema } from './react/react.schema';

export const generateSchema = {
    ...reactSchema,
};

export type GenerateSchemaEntry = typeof generateSchema;
