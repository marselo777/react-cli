import { QuestionCollection } from 'inquirer';

export const appSchema: QuestionCollection = [
    {
        type: 'input',
        name: 'name',
        message: 'Укажите название для приложения',
        when: (answer: any) => {
            return !answer.name;
        },
    },
    {
        type: 'confirm',
        name: 'install',
        message: 'Установить зависимости?',
        when: (answer: any) => {
            return typeof answer?.installDeps === 'undefined';
        },
    },
];
