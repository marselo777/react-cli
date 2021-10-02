import { QuestionCollection } from 'inquirer';

export const componentSchema: QuestionCollection = [
    {
        type: 'input',
        name: 'name',
        message: 'Укажите название для компонента',
        when: (answer) => {
            return !answer.name;
        },
    },
];
