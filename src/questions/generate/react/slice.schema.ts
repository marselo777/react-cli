import { QuestionCollection } from 'inquirer';

export const sliceSchema: QuestionCollection = [
    {
        type: 'input',
        name: 'name',
        message: 'Укажите название для Slice',
        when: (answer: any) => {
            return !answer.name;
        },
    },
    {
        type: 'list',
        name: 'outputDir',
        message: 'В какой директории создать?',
        choices: ['containers', 'entities'],
    },
];
