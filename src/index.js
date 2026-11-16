import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import {initialize} from 'utils/ParseUtils';
import Dashboard from 'views/Dashboard';
import ProfileView from 'views/ProfileView';
import SquadAdd from 'views/SquadAdd';
import createAppStore from './store';
import theme from './theme';
import Layout from "./components/ui/Layout";
import AppProviders from "./auth/AppProviders";
import AuthGate from "./auth/AuthGate";
import ClerkTokenBridge from "./auth/ClerkTokenBridge";

initialize();
const store = createAppStore();
const root = createRoot(document.getElementById('root'));

root.render(
    <AppProviders>
        <Provider store={store}>
            <CssVarsProvider theme={theme} defaultMode="light">
                <CssBaseline />
                <AuthGate>
                    <ClerkTokenBridge />
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route exact path="/" element={<Dashboard />} />
                                <Route exact path="/squad/add" element={<SquadAdd />} />
                                <Route exact path="/profile" element={<ProfileView />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </AuthGate>
            </CssVarsProvider>
        </Provider>
    </AppProviders>
);
