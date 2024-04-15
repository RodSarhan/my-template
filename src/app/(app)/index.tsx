import {FontAwesome} from '@expo/vector-icons';
import {ErrorBoundaryProps, Link, Stack, router} from 'expo-router';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, Pressable, ScrollView, PressableStateCallbackType} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {PressableLink} from '~components/common/PressableLink';
import {useUserStore} from '~global/GlobalStores/user-store';
import {bustPersistQueryClient, removeAllQueries} from '~networking/clients/query-client';

export default function HomeScreen() {
    const {styles, theme} = useStyles(sheet);
    const setUser = useUserStore((state) => state.setUser);
    const user = useUserStore((state) => state.user);
    const {t} = useTranslation();

    const onPressSignOut = useCallback(() => {
        setUser(undefined);
        removeAllQueries();
        bustPersistQueryClient();
    }, [setUser]);

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Home',
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable style={styles.infoButton}>
                                <FontAwesome
                                    name="info-circle"
                                    size={25}
                                    color={theme.colors.primary100}
                                />
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Text style={styles.titleText}>{t('welcome-name', {name: user?.fullName})}</Text>
            <PressableLink href="/pokemon-list/" asChild style={styles.button}>
                <Pressable>
                    <Text style={styles.buttonLabel}>Go To Pokemon List</Text>
                </Pressable>
            </PressableLink>
            <PressableLink href="/testing-screen/" asChild style={styles.button}>
                <Pressable>
                    <Text style={styles.buttonLabel}>Testing Screen</Text>
                </Pressable>
            </PressableLink>
            <Pressable onPress={onPressSignOut} style={styles.button}>
                <Text style={styles.buttonLabel}>{t('sign-out')}</Text>
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

const sheet = createStyleSheet((theme, runtime) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary900,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary50,
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary800,
    },
    infoButton: ({pressed}: PressableStateCallbackType) => ({
        marginRight: 15,
        opacity: pressed ? 0.5 : 1,
    }),
    button: ({pressed}: PressableStateCallbackType) => ({
        marginTop: 10,
        backgroundColor: theme.colors.primary300,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        opacity: pressed ? 0.5 : 1,
    }),
}));
