import path from 'path';

export const envVariable = {
    collectionsDir: '@collections',
    collections: '@collections/collections.json',
    cliConfigPath: path.resolve(__dirname, '..', 'cli.config.json'),
    templates: {
        app: path.resolve(__dirname, '..', 'templates', 'react', 'app'),
    },
};
