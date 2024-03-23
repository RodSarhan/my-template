import {Stack, Redirect} from 'expo-router';
import React from 'react';

import {useUserStore} from '~global/GlobalStores/user-store';

export default function AppLayout() {
    const user = useUserStore((state) => state.user);

    if (!user) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/sign-in" />;
    }

    return (
        <Stack
            screenOptions={{
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: true,
            }}
        />
    );
}
