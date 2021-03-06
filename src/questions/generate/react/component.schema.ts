import { QuestionCollection } from 'inquirer';

export const componentSchema: QuestionCollection = [
    {
        type: 'input',
        name: 'name',
        message: 'Укажите название для компонента',
        when: (answer: any) => {
            return !answer.name;
        },
    },
    {
        type: 'input',
        name: 'path',
        message: 'Укажите путь к папке в которую нужно сгенерировать компонент',
        when: (answer: any) => {
            return !answer.path;
        },
    },
];
