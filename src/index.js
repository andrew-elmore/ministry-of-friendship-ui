import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';

import {initialize} from 'utils/ParseUtils';
import createAppStore from './store';
import theme from './theme';

import Dashboard from 'views/Dashboard';


initialize();
const store = createAppStore();
const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <CssVarsProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Dashboard/>} />
                </Routes>
            </BrowserRouter>
        </CssVarsProvider>
    </Provider>
);
