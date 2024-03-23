import {DarkTheme, Theme, DefaultTheme} from '@react-navigation/native';
import {darkTheme, lightTheme} from '~styles/theme';

export const navigationDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: darkTheme.colors.primary900,
        card: darkTheme.colors.primary800,
        border: darkTheme.colors.primary700,
        primary: darkTheme.colors.blue500,
        text: darkTheme.colors.primary50,
        notification: darkTheme.colors.red500,
    },
};

export const navigationLightTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: lightTheme.colors.primary900,
        card: lightTheme.colors.primary800,
        border: lightTheme.colors.primary700,
        primary: lightTheme.colors.blue500,
        text: lightTheme.colors.primary50,
        notification: lightTheme.colors.red500,
    },
};
