import path from 'path';

export const envVariable = {
    collectionsDir: '@collections',
    collections: '@collections/collections.json',
    templates: {
        app: path.resolve(__dirname, '..', 'templates', 'react', 'app'),
    },
};
