import React from 'react';
import { useClerk } from '@clerk/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Stack from 'components/core/Stack';
import Card from 'components/core/Card';
import Button from 'components/core/Button';
import Typography from 'components/core/Typography';

const ProfileView = () => {
    const clerk = useClerk();
    const navigate = useNavigate();
    const profile = useSelector(({ profile }) => profile.me);

    return (
        <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
            <Card sx={{ width: '100%', maxWidth: 400, p: 8, backgroundColor: 'secondary.400' }}>
                <Stack spacing={4} alignItems="center">
                    <Typography variant="h4" textAlign="center">{profile?.get('gamerTag')}</Typography>
                    <Button data-testid="manage-account-button" sx={{ width: '100%' }} onClick={() => clerk.openUserProfile()}>
                        Manage email, password &amp; connections
                    </Button>
                    <Button data-testid="sign-out-button" color="danger" sx={{ width: '100%' }} onClick={() => clerk.signOut()}>
                        Sign out
                    </Button>
                    <Button variant="outlined" sx={{ width: '100%' }} onClick={() => navigate('/')}>
                        Back
                    </Button>
                </Stack>
            </Card>
        </Stack>
    );
};

export default ProfileView;
