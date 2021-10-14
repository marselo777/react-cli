import { QuestionCollection } from 'inquirer';

export const appSchema: QuestionCollection = [
    {
        type: 'input',
        name: 'name',
        message: 'Укажите название для приложения',
        when: (answer) => {
            return !answer.name;
        },
    },
    {
        type: 'confirm',
        name: 'install',
        message: 'Установить зависимости?',
        when: (answer) => {
            return typeof answer?.installDeps === 'undefined';
        },
    },
];
