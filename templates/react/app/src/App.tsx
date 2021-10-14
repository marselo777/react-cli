import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components';
import { persistor, store } from './root';
import { Routes } from './routes';
import { theme } from './theme';
export const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Routes />
            </ThemeProvider>
        </Provider>
    );
};
