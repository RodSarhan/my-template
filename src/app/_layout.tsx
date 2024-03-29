// Initialize libraries, global stores, and cients
import '~utils/app-init/init-app';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import {ThemeProvider} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import {useInitialTheme, useStyles} from 'react-native-unistyles';
import {useGeneralStore} from '~global/GlobalStores/general-store';
import {queryClient} from '~networking/clients/query-client';
import {navigationDarkTheme, navigationLightTheme} from '~styles/navigation-themes';
import {useHydrateStores} from '~utils/app-init/useHydrateStores';
import {useTranslation} from 'react-i18next';

// expo-router
// Catch any errors thrown by the Layout component.
export {ErrorBoundary} from 'expo-router';

// expo-router
// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = {
    initialRouteName: '(app)',
};

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
    // Set unistyles initial theme based on the value persisted in general store
    useInitialTheme(selectedTheme);
    const {theme} = useStyles();
    const {t} = useTranslation();
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                value={theme.theme === 'dark' ? navigationDarkTheme : navigationLightTheme}
            >
                <StatusBar style={theme.props.statusBarText} />
                <Stack>
                    <Stack.Screen name="(app)" options={{headerShown: false, title: 'Home'}} />
                    <Stack.Screen name="sign-in" options={{title: t('sign-in')}} />
                    <Stack.Screen name="modal" options={{presentation: 'modal'}} />
                </Stack>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
