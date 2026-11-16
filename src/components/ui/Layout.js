import React from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import Stack from 'components/core/Stack';
import Sheet from 'components/core/Sheet';
import Card from 'components/core/Card';
import Button from 'components/core/Button';
import Typography from 'components/core/Typography';
import profileActions from 'actions/profileActions';
import SquadView from 'views/SquadView';
import ProfileSetup from 'views/ProfileSetup';
import Loader from './Loader';
import Notices from './Notices';


const Layout = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useUser();
    const hasFailed = useSelector(({ profile }) => profile.hasFailed);
    const hasLoadedMe = useSelector(({ profile }) => profile.hasLoadedMe);
    const myProfile = useSelector(({ profile }) => profile.me);
    const mySquad = useSelector(({ squad }) => squad.current);

    const renderContent = () => {
        if (!hasLoadedMe && hasFailed) {
            return (
                <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                    <Card sx={{ width: '100%', maxWidth: 400, p: 8, backgroundColor: 'secondary.400' }}>
                        <Stack spacing={4} alignItems="center">
                            <Typography variant="h4" textAlign="center">Could not load your profile</Typography>
                            <Button
                                data-testid="profile-retry"
                                onClick={() => dispatch(profileActions.me(user.id)).catch(() => {})}
                                sx={{ width: '100%' }}
                            >
                                RETRY
                            </Button>
                        </Stack>
                    </Card>
                </Stack>
            );
        }
        if (!hasLoadedMe) return null;
        if (!myProfile) return <ProfileSetup />;
        return mySquad ? <SquadView /> : <Outlet />;
    };


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
                {renderContent()}
            </Sheet>
            <Loader />
            <Notices />
        </Stack>
    );
};

export default Layout;