export async function getQuestions<
    Questions extends Record<string, any> = any,
    QuestionsKey extends string = string
>(
    questions: Questions,
    schematics: QuestionsKey
): Promise<Questions[QuestionsKey]> {
    return questions[schematics];
}
