import {FontAwesome} from '@expo/vector-icons';
import {ErrorBoundaryProps, Link, Stack, router} from 'expo-router';
import {useCallback, useState} from 'react';
import {View, Text, Pressable, ScrollView, PressableStateCallbackType} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {useUserStore} from '~global/GlobalStores/user-store';
import {bustPersistQueryClient, removeAllQueries} from '~libs/query-client';

export default function HomeScreen() {
    const {styles, theme} = useStyles(styleSheet);
    const setUser = useUserStore((state) => state.setUser);

    const onPressSignOut = useCallback(() => {
        setUser(undefined);
        bustPersistQueryClient();
        removeAllQueries();
    }, [setUser]);

    const onPressGoToPokemonList = useCallback(() => {
        router.navigate({
            pathname: '/pokemon-list/',
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Home',
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({pressed}) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={25}
                                        color={theme.colors.primary100}
                                        style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Pressable onPress={onPressGoToPokemonList} style={styles.pressable}>
                <Text style={styles.title}>Go To Pokemon List</Text>
            </Pressable>
            <Pressable onPress={onPressSignOut} style={styles.pressable}>
                <Text style={styles.title}>Sign Out</Text>
            </Pressable>
        </ScrollView>
    );
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
    const {theme} = useStyles();
    return (
        <View style={{flex: 1, backgroundColor: theme.colors.red500}}>
            <Text>{props.error.message}</Text>
            <Text onPress={props.retry}>Try Again?</Text>
        </View>
    );
}

const styleSheet = createStyleSheet((theme, runtime) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary900,
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary800,
    },
    pressable: ({pressed}: PressableStateCallbackType) => ({
        backgroundColor: theme.colors.primary300,
        padding: 10,
        borderRadius: 10,
        width: '50%',
        alignItems: 'center',
        opacity: pressed ? 0.5 : 1,
    }),
}));
