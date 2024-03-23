import {UnistylesRegistry} from 'react-native-unistyles';
import {breakpoints} from '~styles/breakpoints';
import {darkTheme, lightTheme} from '~styles/theme';

// if you defined breakpoints
type AppBreakpoints = typeof breakpoints;

// if you defined themes
type AppThemes = {
    light: typeof lightTheme;
    dark: typeof darkTheme;
};

// override library types
declare module 'react-native-unistyles' {
    export interface UnistylesBreakpoints extends AppBreakpoints {}
    export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addBreakpoints(breakpoints)
    .addThemes({
        light: lightTheme,
        dark: darkTheme,
    })
    .addConfig({});
