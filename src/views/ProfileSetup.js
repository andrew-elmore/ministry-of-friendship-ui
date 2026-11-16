import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from 'components/core/Stack';
import Card from 'components/core/Card';
import Input from 'components/core/Input';
import Button from 'components/core/Button';
import Typography from 'components/core/Typography';
import profileActions from 'actions/profileActions';

const ProfileSetup = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(({ profile }) => profile.isLoading);
    const [gamerTag, setGamerTag] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!gamerTag.trim()) {
            setError('Gamer Tag is required');
            return;
        }

        try {
            await dispatch(profileActions.create(gamerTag.trim()));
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again later');
        }
    };

    return (
        <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
            <Card sx={{ width: '100%', maxWidth: 400, p: 8, backgroundColor: 'secondary.400' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Stack spacing={4} alignItems="center">
                        <Typography variant="h4" textAlign="center">Choose your Gamer Tag</Typography>
                        <Input
                            data-testid="profile-gamertag"
                            placeholder="Gamer Tag"
                            value={gamerTag}
                            onChange={setGamerTag}
                            error={error}
                            sx={{ width: '100%' }}
                        />
                        <Button
                            data-testid="profile-submit"
                            type="submit"
                            disabled={isLoading}
                            sx={{ width: '100%' }}
                        >
                            {isLoading ? 'ENLISTING...' : 'ENLIST'}
                        </Button>
                    </Stack>
                </form>
            </Card>
        </Stack>
    );
};

export default ProfileSetup;
