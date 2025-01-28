import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: "#FFFBEA",
                    100: "#FFF3C4",
                    200: "#FEEB9E",
                    300: "#FEE378",
                    400: "#FEDB1F",
                    500: "#ECC800",
                    600: "#D4B100",
                    700: "#A68A00",
                    800: "#786400",
                    900: "#4A3E00",

                    solidColor: 'var(--joy-palette-common-secondary)',
                    solidBg: 'var(--joy-palette-primary-400)',
                    solidHoverBg: 'var(--joy-palette-primary-500)',
                    solidActiveBg: 'var(--joy-palette-primary-600)',
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
                    50: "#EDEDF2",
                    100: "#D1D2E0",
                    200: "#A3A5C4",
                    300: "#7578A7",
                    400: "#3B3E71",
                    500: "#2F3159",
                    600: "#232442",
                    700: "#17182B",
                    800: "#0C0C14",
                    900: "#040407",

                    solidColor: 'var(--joy-palette-common-white)',
                    solidBg: 'var(--joy-palette-secondary-400)',
                    solidHoverBg: 'var(--joy-palette-secondary-500)',
                    solidActiveBg: 'var(--joy-palette-secondary-600)',
                    solidDisabledColor: 'var(--joy-palette-neutral-400)',
                    solidDisabledBg: 'var(--joy-palette-neutral-100)',

                    softColor: 'var(--joy-palette-secondary-400)',
                    softBg: 'var(--joy-palette-secondary-50)',
                    softHoverBg: 'var(--joy-palette-secondary-100)',
                    softActiveColor: 'var(--joy-palette-secondary-600)',
                    softActiveBg: 'var(--joy-palette-secondary-200)',
                    softDisabledColor: 'var(--joy-palette-neutral-400)',
                    softDisabledBg: 'var(--joy-palette-neutral-50)',

                    plainColor: 'var(--joy-palette-secondary-400)',
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