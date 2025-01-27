import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: "#EEF4F1",
                    100: "#D2E1D9",
                    200: "#BBD2C6",
                    300: "#98BBA8",
                    400: "#77A68C",
                    500: "#4A5547",
                    600: "#282E27",
                    700: "#BBC4B8",
                    800: "#81897F",
                    900: "#4A5547",

                    solidColor: 'var(--joy-palette-common-white)',
                    solidBg: 'var(--joy-palette-primary-600)',
                    solidHoverBg: 'var(--joy-palette-primary-700)',
                    solidActiveBg: 'var(--joy-palette-primary-800)',
                    solidDisabledColor: 'var(--joy-palette-neutral-400)',
                    solidDisabledBg: 'var(--joy-palette-neutral-200)',

                    softColor: 'var(--joy-palette-primary-500)',
                    softBg: 'var(--joy-palette-primary-50)',
                    softHoverBg: 'var(--joy-palette-primary-100)',
                    softActiveColor: 'var(--joy-palette-primary-600)',
                    softActiveBg: 'var(--joy-palette-primary-200)',
                    softDisabledColor: 'var(--joy-palette-neutral-400)',
                    softDisabledBg: 'var(--joy-palette-neutral-100)',

                    plainColor: 'var(--joy-palette-primary-400)',
                },
                secondary: {
                    50: "#F7EEDC",
                    100: "#E3C488",
                    200: "#CEA658",
                    300: "#C78A16",
                    400: "#F7ECEC",
                    500: "#DDAFAE",
                    600: "#C87D7C",
                    700: "#C7514F",
                    800: "#A2CBB5",
                    900: "#4E956F",

                    solidColor: 'var(--joy-palette-primary-900)',
                    solidBg: 'var(--joy-palette-secondary-500)',
                    solidHoverBg: 'var(--joy-palette-secondary-600)',
                    solidActiveBg: 'var(--joy-palette-secondary-700)',
                    solidDisabledColor: 'var(--joy-palette-neutral-400)',
                    solidDisabledBg: 'var(--joy-palette-neutral-100)',

                    softColor: 'var(--joy-palette-secondary-400)',
                    softBg: 'var(--joy-palette-secondary-50)',
                    softHoverBg: 'var(--joy-palette-secondary-100)',
                    softActiveColor: 'var(--joy-palette-secondary-600)',
                    softActiveBg: 'var(--joy-palette-secondary-200)',
                    softDisabledColor: 'var(--joy-palette-neutral-400)',
                    softDisabledBg: 'var(--joy-palette-neutral-50)',

                    plainColor: 'var(--joy-palette-secondary-500)',
                    plainHoverBg: 'var(--joy-palette-secondary-100)',
                    plainActiveBg: 'var(--joy-palette-secondary-200)',
                    plainDisabledColor: 'var(--joy-palette-neutral-400)',
                },
                background: {
                    surface: "var(--joy-palette-common-white)",
                    base: "#FDFDFD",
                },
                text: {
                    primary: "#070707",
                    secondary: "#464F60",
                    tertiary: "#687182",
                },
            },
        },
    },
    typography: {
        display1: {
            fontFamily: 'Liberation Serif',
            fontSize: '60px',
            fontWeight: 'bold',
        },
        display2: {
            fontFamily: 'Liberation Serif',
            fontSize: '48px',
            fontWeight: 'bold',
        },
        h1: {
            fontFamily: 'Liberation Serif',
            fontSize: '56px',
            fontWeight: 'bold',
        },
        h2: {
            fontFamily: 'Liberation Serif',
            fontSize: '44px',
        },
        h3: {
            fontFamily: 'Liberation Serif',
            fontSize: '32px',
        },
        h4: {
            fontFamily: 'Liberation Serif',
            fontSize: '24px',
            color: 'var(--joy-palette-text-tertiary)',
        },
        bodyLg: {
            fontFamily: 'Liberation Serif',
            fontSize: '24px',
            fontWeight: 'regular',
            lineHeight: '1.25',
        },
        body1: {
            fontFamily: 'Liberation Serif',
            fontSize: '16px',
            fontWeight: 'regular',
            color: 'black',
        },
        body2: {
            fontFamily: 'Liberation Serif',
            fontSize: '16px',
            fontWeight: 'regular',
        },
        button: {
            fontFamily: 'Liberation Serif',
            fontSize: '16px',
            fontWeight: 'medium',
        },
    },
    components: {
        JoyButton: {
            defaultProps: {
                variant: "solid",
            },
            styleOverrides: {
                root: {
                    padding: '12px 36px',
                    '--Button-radius': '8px',
                },
            },
        },
        JoyInput: {
            defaultProps: {
                color: "primary",
                size: "lg",
                variant: "outlined",
            },
        },
    },
});

export default theme;
