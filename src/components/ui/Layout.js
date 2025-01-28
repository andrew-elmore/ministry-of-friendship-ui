import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';

import Stack from 'components/core/Stack';
import Sheet from 'components/core/Sheet';
import Loader from './Loader';
import Notices from './Notices';


const Layout = () => {
    const theme = useTheme();
    const isAuthorized = useSelector(({ auth }) => auth.isAuthorized);

    if (!isAuthorized) {
        return (
            <>
                <Loader />
                <Outlet />
                <Notices />
            </>
        )
    }

    return (
        <Stack direction="row" sx={{ height: '100vh', width: '100vw' }}>
            <Sheet 
                sx={{
                    width: 'calc(100% - 250px)',
                    height: '100%',
                    overflow: 'auto',
                    background: theme.palette.primary[50],
                }}
            >
                <Outlet />
            </Sheet>
            <Loader />
            <Notices />
        </Stack>
    );
};

export default Layout;