import {UnistylesRuntime} from 'react-native-unistyles';
import {LocalStorage} from '~global/LocalStorage/local-storage';
import {navigationDarkTheme, navigationLightTheme} from '~styles/navigation-themes';
import {hexToRGBA} from '~styles/style-helpers';

const sharedColors = {
    white: '#FFFFFF',
    black: '#000000',
    blue100: '#D3EAF8',
    blue200: '#A9D4F2',
    blue300: '#77ACDA',
    blue400: '#4F81B6',
    blue500: '#214E86',
    blue600: '#183C73',
    blue700: '#102D60',
    blue800: '#0A1F4D',
    blue900: '#061540',
    green100: '#E0F9CF',
    green200: '#BDF4A2',
    green300: '#8ADE6E',
    green400: '#5ABD46',
    green500: '#229118',
    green600: '#117C11',
    green700: '#0C6813',
    green800: '#075414',
    green900: '#044514',
    cyan100: '#CAFBF7',
    cyan200: '#97F7F6',
    cyan300: '#60DDE7',
    cyan400: '#38B9CF',
    cyan500: '#058AAF',
    cyan600: '#036B96',
    cyan700: '#02517D',
    cyan800: '#013965',
    cyan900: '#002953',
    yellow100: '#FDF6CB',
    yellow200: '#FCEC97',
    yellow300: '#F8DC63',
    yellow400: '#F1CA3C',
    yellow500: '#E8B100',
    yellow600: '#C79300',
    yellow700: '#A77700',
    yellow800: '#865C00',
    yellow900: '#6F4A00',
    red100: '#FCE4CD',
    red200: '#FAC29D',
    red300: '#F0966B',
    red400: '#E16B45',
    red500: '#CE3010',
    red600: '#B11A0B',
    red700: '#940A08',
    red800: '#77050C',
    red900: '#620310',
} as const;

const sharedThemeValues = {
    text: {
        bold: 'bold',
        thin: '300',
    },
    components: {},
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
    theme: 'light',
    colors: {
        ...sharedColors,
        primary50: '#000000',
        primary100: '#18181b',
        primary200: '#27272a',
        primary300: '#3f3f46',
        primary400: '#52525b',
        primary500: '#71717a',
        primary600: '#a1a1aa',
        primary700: '#d4d4d8',
        primary800: '#e4e4e7',
        primary900: '#f4f4f5',
    },
    props: {statusBarText: 'dark'},
} as const;

export const darkTheme = {
    ...sharedThemeValues,
    theme: 'dark',
    colors: {
        ...sharedColors,
        primary50: '#FAFAFA',
        primary100: '#F4F4F5',
        primary200: '#E4E4E7',
        primary300: '#D4D4D8',
        primary400: '#A1A1AA',
        primary500: '#71717A',
        primary600: '#52525B',
        primary700: '#3F3F46',
        primary800: '#27272A',
        primary900: '#18181B',
    },
    props: {statusBarText: 'light'},
} as const;

export const changeTheme = (theme: 'light' | 'dark') => {
    LocalStorage.general.setTheme(theme);
    UnistylesRuntime.setTheme(theme === 'dark' ? 'dark' : 'light');
};
