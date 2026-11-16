/**
 * Clerk appearance built from the app's Joy palette so the Clerk sign-in, sign-up and account windows match
 * the Ministry of Friendship look. Uses Clerk's appearance variables rather than CSS overrides.
 */
const clerkAppearance = {
    variables: {
        colorPrimary: '#FEDB1F',
        colorPrimaryForeground: '#17182B',
        colorBackground: '#232442',
        colorForeground: '#FFFFFF',
        colorMutedForeground: '#D1D2E0',
        colorInput: '#17182B',
        colorInputForeground: '#FFFFFF',
        colorNeutral: '#FFFFFF',
        colorDanger: '#FF5A5A',
        colorSuccess: '#FEDB1F',
        fontFamily: 'Liberation Serif, serif',
        borderRadius: '0.5rem',
    },
};

export default clerkAppearance;
