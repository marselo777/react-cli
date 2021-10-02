import { GenerateSchema } from '../models';

export type ReactTemplatesKeys =
    | 'app'
    | 'component'
    | 'container'
    | 'epic'
    | 'slice'
    | 'widget';

export const reactSchema: GenerateSchema = {
    app: [
        {
            name: '',
        },
    ],
    component: [],
    container: [
        {
            type: 'input',
            name: 'name',
            message: 'Укажите название для контейнера',
            when: (answer) => {
                console.log(answer, 'answer');
                return true;
            },
        },
        {
            type: 'confirm',
            name: 'tests',
            message: 'Сгенерировать тесты?',
        },
        {
            type: 'confirm',
            message: 'Сгенерировать Slice?',
            name: 'slice',
        },
        {
            type: 'confirm',
            message: 'Сгенерировать Epic?',
            name: 'epic',
        },
    ],
    epic: [],
    slice: [],
    widget: [],
};
