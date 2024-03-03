import {hexToRGBA} from '~styles/style-helpers';

const sharedColors = {
    barbie: '#ff9ff3',
    oak: '#1bb1a1',
    sky: '#48dbfb',
    fog: '#c8d6e5',
    aloes: '#00d2d3',
    blood: '#eb4d4b',
    pumpkin: '#f0932b',
    brown: '#BB9580',
} as const;

const sharedThemeValues = {
    components: {
        typography: {
            bold: {
                fontWeight: 'bold',
            },
            thin: {
                fontWeight: '300',
            },
        },
    },
    margins: {
        sm: 2,
        md: 4,
        lg: 8,
        xl: 12,
    },
    utils: {
        hexToRGBA: hexToRGBA,
    },
} as const;

export const lightTheme = {
    ...sharedThemeValues,
    colors: {
        ...sharedColors,
        textPrimary: '#000000',
        backgroundPrimary: '#FFF3EC',
        buttonBackground: '#BB9580',
    },
    props: {statusBarText: 'dark'},
} as const;

export const darkTheme = {
    ...sharedThemeValues,
    colors: {
        ...sharedColors,
        textPrimary: '#FFFFFF',
        backgroundPrimary: '#1E1E1E',
        buttonBackground: '#3F3F3F',
    },
    props: {statusBarText: 'light'},
} as const;

// export type that will be used to describe your theme
export type AppTheme = typeof lightTheme | typeof darkTheme;
