import React from 'react';
import { SignInButton, SignUpButton, useUser } from '@clerk/react';
import Sheet from 'components/core/Sheet';
import Card from 'components/core/Card';
import Stack from 'components/core/Stack';
import Button from 'components/core/Button';
import Typography from 'components/core/Typography';
import ProcessingOverlay from 'components/core/ProcessingOverlay';

const SignInWall = () => (
    <Sheet
        sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
        }}
    >
        <Card
            sx={{
                width: '100%',
                maxWidth: 400,
                p: 8,
                backgroundColor: 'secondary.400',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Stack spacing={4} alignItems="center">
                <Typography variant="h4" textAlign="center">Ministry of Friendship</Typography>
                <SignInButton mode="modal">
                    <Button data-testid="sign-in-button" sx={{ width: '100%' }}>SIGN IN</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <Button data-testid="sign-up-button" variant="outlined" sx={{ width: '100%' }}>CREATE ACCOUNT</Button>
                </SignUpButton>
            </Stack>
        </Card>
    </Sheet>
);

export default function AuthGate({ children }) {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) return <ProcessingOverlay enabled />;
    if (!isSignedIn) return <SignInWall />;
    return <React.Fragment key={user.id}>{children}</React.Fragment>;
}
