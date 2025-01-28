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
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./img/super-earth.png)`,
                    backgroundSize: 'cover',
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