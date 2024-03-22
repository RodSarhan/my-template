import React from 'react';
import {Link, Tabs, Stack} from 'expo-router';
import {useClientOnlyValue} from '~utils/hooks/useClientOnlyValue';
import {Pressable} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
    return (
        <Stack
            screenOptions={{
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, false),
            }}
            initialRouteName="one"
        >
            <Stack.Screen
                name="one"
                options={{
                    title: 'Tab One',
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({pressed}) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={25}
                                        color={'red'}
                                        style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Stack.Screen
                name="two"
                options={{
                    title: 'Tab Two',
                }}
            />
        </Stack>
    );
}
