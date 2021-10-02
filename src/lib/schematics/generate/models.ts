import { QuestionCollection } from 'inquirer';
import { generateSchema } from './generate';
import { ReactTemplatesKeys } from './react/react.schema';
export type GenerateSchema = Record<ReactTemplatesKeys, QuestionCollection>;

export type GenerateSchemaKeys = keyof typeof generateSchema;
