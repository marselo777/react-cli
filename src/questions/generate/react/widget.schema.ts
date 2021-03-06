import { QuestionCollection } from 'inquirer';

export const widgetSchema: QuestionCollection = [
    {
        type: 'input',
        name: 'name',
        message: 'Укажите название для виджета',
        when: (answer: any) => {
            return !answer.name;
        },
    },
];
