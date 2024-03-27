import FontAwesome from '@expo/vector-icons/FontAwesome';
import {ThemeProvider} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
// init styles, localization and dayjs
import '~styles/unistyles';
import '~localization/i18n';
import '~libs/dayjs';
import '~libs/reactotron';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import {useInitialTheme, useStyles} from 'react-native-unistyles';

import {useGeneralStore} from '~global/GlobalStores/general-store';
import {queryClient} from '~libs/query-client';
import {navigationDarkTheme, navigationLightTheme} from '~styles/navigation-themes';
import {enableFreeze} from 'react-native-screens';
import {useHydrateStores} from '~utils/hooks/useHydrateStores';

enableFreeze(true);

// Catch any errors thrown by the Layout component.
export {ErrorBoundary} from 'expo-router';

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = {
    initialRouteName: '(app)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [isFontLoaded, fontLoadingError] = useFonts({
        SpaceMono: require('~assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });
    const isHydrated = useHydrateStores();

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (fontLoadingError) throw fontLoadingError;
    }, [fontLoadingError]);

    useEffect(() => {
        if (isFontLoaded && isHydrated) {
            SplashScreen.hideAsync();
        }
    }, [isFontLoaded, isHydrated]);

    if (!isFontLoaded || !isHydrated) {
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
                    <Stack.Screen name="(app)" options={{headerShown: false, title: 'Home'}} />
                    <Stack.Screen name="sign-in" options={{title: 'Sign In'}} />
                    <Stack.Screen name="modal" options={{presentation: 'modal'}} />
                </Stack>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
