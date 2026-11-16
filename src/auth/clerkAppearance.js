/**
 * Clerk appearance built from the app's Joy palette so the Clerk sign-in, sign-up and account windows match
 * the Ministry of Friendship look. Uses Clerk's appearance variables rather than CSS overrides.
 */
const clerkAppearance = {
    variables: {
        colorPrimary: '#FEDB1F',
        colorTextOnPrimaryBackground: '#17182B',
        colorBackground: '#232442',
        colorText: '#FFFFFF',
        colorTextSecondary: '#D1D2E0',
        colorInputBackground: '#17182B',
        colorInputText: '#FFFFFF',
        colorNeutral: '#FFFFFF',
        colorDanger: '#FF5A5A',
        colorSuccess: '#FEDB1F',
        fontFamily: 'Liberation Serif, serif',
        borderRadius: '0.5rem',
    },
};

export default clerkAppearance;
