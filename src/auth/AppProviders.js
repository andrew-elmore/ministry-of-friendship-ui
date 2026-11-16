import React from 'react';
import { ClerkProvider } from '@clerk/react';
import clerkAppearance from './clerkAppearance';

const CLERK_KEY = process.env.CLERK_PUBLISHABLE_KEY;

export default function AppProviders({ children }) {
    if (!CLERK_KEY) {
        throw new Error('Missing CLERK_PUBLISHABLE_KEY. Set it in .env (local) or the Render environment before building the UI.');
    }

    return (
        <ClerkProvider
            publishableKey={CLERK_KEY}
            afterSignOutUrl="/"
            appearance={clerkAppearance}
        >
            {children}
        </ClerkProvider>
    );
}
