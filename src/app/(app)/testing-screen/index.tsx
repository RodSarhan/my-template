import {FontAwesome} from '@expo/vector-icons';
import {ErrorBoundaryProps, Stack} from 'expo-router';
import {View, Text, Pressable, PressableStateCallbackType} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react';
import React from 'react';

export default function TestingScreen() {
    const {styles, theme} = useStyles(sheet);
    const {t} = useTranslation();

    useEffect(() => {
        console.log('Hello');
        return () => {
            console.log('Bye');
        };
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Testing Screen',
                    headerRight: () => (
                        <Pressable onPress={() => {}}>
                            {({pressed}) => (
                                <FontAwesome
                                    name="refresh"
                                    size={25}
                                    color={theme.colors.primary100}
                                    style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                                />
                            )}
                        </Pressable>
                    ),
                }}
            />
            <Pressable onPress={() => {}} style={styles.button}>
                <Text style={styles.buttonLabel}>{'Do Something'}</Text>
            </Pressable>
        </View>
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
        width: '100%',
        padding: 20,
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary800,
    },
    button: ({pressed}: PressableStateCallbackType) => ({
        marginTop: 10,
        backgroundColor: theme.colors.primary300,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        opacity: pressed ? 0.5 : 1,
    }),
}));
