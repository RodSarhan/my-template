import {useQuery} from '@tanstack/react-query';
import {ErrorBoundaryProps, Stack, useLocalSearchParams} from 'expo-router';
import {useCallback} from 'react';
import {View, Text, Pressable, PressableStateCallbackType} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {PokemonQueries} from '~networking/pokemon/queries/pokemon-queries';
import {ExpoImage} from '~components/common/ExpoImage';
import {useTranslation} from 'react-i18next';
import {useTriggerError} from '~utils/hooks/useScreenError';

export default function PokemonDetailsScreen() {
    const triggerError = useTriggerError();
    const {styles} = useStyles(sheet);
    const {t} = useTranslation();
    const params = useLocalSearchParams<'/(app)/pokemon-list/[pokemon]'>();
    const {data: pokemonDetails} = useQuery(PokemonQueries.pokemonDetailsQuery(params.pokemon));

    const onPressTriggerError = useCallback(() => {
        triggerError('This error was manually triggered');
    }, [triggerError]);

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: params.pokemon.toUpperCase(),
                }}
            />

            {!!pokemonDetails && (
                <>
                    <ExpoImage
                        source={{uri: pokemonDetails?.sprite}}
                        style={{height: 200, width: 200}}
                    />
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{pokemonDetails?.name}</Text>
                    <Text>{`Height: ${pokemonDetails?.height}`}</Text>
                    <Text>{`Weight: ${pokemonDetails?.weight}`}</Text>
                </>
            )}
            <Pressable onPress={onPressTriggerError} style={styles.button}>
                <Text style={styles.buttonLabel}>{t('trigger-error')}</Text>
            </Pressable>
        </View>
    );
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
    const {theme} = useStyles();
    const params = useLocalSearchParams<'/(app)/pokemon-list/[pokemon]'>();

    return (
        <View style={{flex: 1, backgroundColor: theme.colors.red500}}>
            <Stack.Screen
                options={{
                    title: params.pokemon.toUpperCase(),
                }}
            />
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
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
