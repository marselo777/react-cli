import {configureStore} from '@reduxjs/toolkit';
import {createEpicMiddleware, EpicMiddleware} from 'redux-observable';
import {rootEpic} from './rootEpic';
import {rootReducer} from './rootReducer';

const epicMiddleware: EpicMiddleware<any> = createEpicMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);