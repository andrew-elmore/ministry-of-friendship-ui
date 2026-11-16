import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { setTokenAccessor } from 'utils/ParseUtils';

export default function ClerkTokenBridge() {
    const { getToken } = useAuth();

    useEffect(() => {
        setTokenAccessor(getToken);
        return () => setTokenAccessor(null);
    }, [getToken]);

    return null;
}
