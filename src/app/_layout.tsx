import {queryClient} from '~libs/query-client';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {ThemeProvider} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import '~styles/unistyles';
import '~localization/i18n';
import {useInitialTheme, useStyles} from 'react-native-unistyles';
import {navigationDarkTheme, navigationLightTheme} from '~styles/navigation-themes';
import {StatusBar} from 'expo-status-bar';
import {useGeneralStore} from '~global/GlobalStores/general-store';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(app)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('~assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const selectedTheme = useGeneralStore((state) => state.theme);
    useInitialTheme(selectedTheme);
    const {theme} = useStyles();
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                value={theme.theme === 'dark' ? navigationDarkTheme : navigationLightTheme}
            >
                <StatusBar style={theme.props.statusBarText} />
                <Stack>
                    <Stack.Screen name="(app)" options={{headerShown: false}} />
                    <Stack.Screen name="sign-in" options={{title: 'Sign In'}} />
                    <Stack.Screen name="modal" options={{presentation: 'modal'}} />
                </Stack>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
