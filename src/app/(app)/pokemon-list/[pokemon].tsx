import {FontAwesome} from '@expo/vector-icons';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {ErrorBoundaryProps, Link, Stack, router, useLocalSearchParams} from 'expo-router';
import {useCallback, useRef, useState} from 'react';
import {View, Text, Pressable, ScrollView, PressableStateCallbackType} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {PokemonQueries} from '~networking/pokemon/queries/pokemon-queries';
import {ExpoImage} from '~components/ExpoImage';
import Animated, {withSpring} from 'react-native-reanimated';

export default function PokemonDetailsScreen() {
    const {styles, theme} = useStyles(styleSheet);
    const params = useLocalSearchParams<{pokemon: string}>();
    const {data: pokemonDetails} = useQuery(PokemonQueries.pokemonDetailsQuery(params.pokemon));

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: params.pokemon.toUpperCase(),
                }}
            />
            <Animated.Image
                source={{uri: pokemonDetails?.sprites.front_default}}
                style={{height: 200, width: 200}}
                sharedTransitionTag={params.pokemon + '-image'}
            />
            <Animated.Text
                style={{fontSize: 20, fontWeight: 'bold'}}
                sharedTransitionTag={params.pokemon + '-name'}
            >
                {pokemonDetails?.name}
            </Animated.Text>
            <Text>{`Height: ${pokemonDetails?.height}`}</Text>
            <Text>{`Weight: ${pokemonDetails?.weight}`}</Text>
            <Text>{`Base Experience: ${pokemonDetails?.base_experience}`}</Text>
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

const styleSheet = createStyleSheet((theme, runtime) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary900,
        paddingTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
