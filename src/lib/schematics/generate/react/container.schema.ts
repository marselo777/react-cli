import { QuestionCollection } from 'inquirer';

export const containerSchema: QuestionCollection = [
    {
        type: 'input',
        name: 'name',
        message: 'Укажите название для контейнера',
        when: (answer) => {
            return !answer.name;
        },
    },
    {
        type: 'confirm',
        name: 'spec',
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
];
