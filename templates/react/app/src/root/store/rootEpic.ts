import {combineEpics, Epic} from 'redux-observable';

export const rootEpic: Epic<any, any, any, any> = combineEpics();
