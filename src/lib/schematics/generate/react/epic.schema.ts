import { QuestionCollection } from 'inquirer';

export const epicSchema: QuestionCollection = [
    {
        type: 'input',
        name: 'name',
        message: 'Укажите название для Epic',
        when: (answer) => {
            return !answer.name;
        },
    },
    {
        type: 'list',
        name: 'outputDir',
        message: 'В какой директории создать?',
        choices: ['containers', 'entities', 'epics'],
    },
];
