
const epicName = createEpic(action$ => action$.pipe(ofType()));
export default [epicName];