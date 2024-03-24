import {DarkTheme, Theme, DefaultTheme} from '@react-navigation/native';
import {darkTheme, lightTheme} from '~styles/theme';

export const navigationDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: darkTheme.colors.bg50,
        card: darkTheme.colors.bg100,
        border: darkTheme.colors.bg200,
        primary: darkTheme.colors.blue500,
        text: darkTheme.colors.primary50,
        notification: darkTheme.colors.red500,
    },
};

export const navigationLightTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: lightTheme.colors.bg50,
        card: lightTheme.colors.bg100,
        border: lightTheme.colors.bg200,
        primary: lightTheme.colors.blue500,
        text: lightTheme.colors.primary50,
        notification: lightTheme.colors.red500,
    },
};
