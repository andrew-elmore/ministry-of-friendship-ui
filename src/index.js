import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';

import {initialize} from 'utils/ParseUtils';
import createAppStore from './store';
import theme from './theme';

import Layout from "./components/ui/Layout";
import Authorize from "./components/ui/Authorize";
import Dashboard from 'views/Dashboard';
import Signup from 'views/Signup';
import SquadAdd from 'views/SquadAdd';

initialize();
const store = createAppStore();
const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <CssVarsProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        {/* <Route exact path="/forgot-password" element={<ForgotPassword />} /> */}
                        <Route exact path="/signup" element={<Signup />} />
                        <Route element={<Authorize />}>
                            <Route exact path="/" element={<Dashboard />} />
                            <Route exact path="/squad/add" element={<SquadAdd />} />
                        </Route>
                        {/* <Route path="*" element={<NotFound />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </CssVarsProvider>
    </Provider>
);
