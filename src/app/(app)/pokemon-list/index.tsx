import {FontAwesome} from '@expo/vector-icons';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {ErrorBoundaryProps, Link, Stack, router} from 'expo-router';
import {useCallback, useRef, useState} from 'react';
import {View, Text, Pressable, ScrollView, PressableStateCallbackType} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {useUserStore} from '~global/GlobalStores/user-store';
import {PokemonQueries} from '~networking/pokemon/queries/pokemon-queries';
import {FlashList} from '@shopify/flash-list';
import {INamedApiResource, IPokemon} from 'pokeapi-typescript';
import {ExpoImage} from '~components/ExpoImage';
import {queryClient} from '~libs/query-client';

const PokemonComponent = ({pokemon}: {pokemon: INamedApiResource<IPokemon>}) => {
    const {data: pokemonDetails} = useQuery(PokemonQueries.pokemonDetailsQuery(pokemon.name));

    const onPressPokemon = useCallback(() => {
        router.navigate({
            pathname: '/pokemon-list/[pokemon]',
            params: {pokemon: pokemon.name},
        });
    }, [pokemon.name]);

    return (
        <Pressable
            onPress={onPressPokemon}
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
        >
            <ExpoImage
                source={{uri: pokemonDetails?.sprites.front_default}}
                style={{height: 100, width: 100}}
            />
            <Text key={pokemon.name + '-name'} style={{fontSize: 20, fontWeight: 'bold'}}>
                {pokemon.name}
            </Text>
        </Pressable>
    );
};

export default function PokemonListScreen() {
    const {styles, theme} = useStyles(styleSheet);
    const flashlistRef = useRef<FlashList<INamedApiResource<IPokemon>>>(null);

    const {
        data: pokemonList,
        fetchNextPage,
        hasNextPage,
        isFetching,
        refetch,
    } = useInfiniteQuery(PokemonQueries.paginatedPokemonQuery);

    const onPressRefresh = () => {
        queryClient.setQueryData(PokemonQueries.paginatedPokemonQuery.queryKey, (oldData) => {
            if (!oldData) return undefined;
            return {
                ...oldData,
                pages: oldData.pages.slice(0, 1),
                pageParams: oldData.pageParams.slice(0, 1),
            };
        });
        refetch();
        flashlistRef.current?.scrollToIndex({index: 0, animated: true});
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Pokemon List',
                    headerRight: () => (
                        <Pressable onPress={onPressRefresh}>
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
            {!!pokemonList && (
                <FlashList
                    data={pokemonList}
                    renderItem={({item}) => <PokemonComponent pokemon={item} key={item.name} />}
                    onEndReached={() => {
                        if (hasNextPage && !isFetching) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    estimatedItemSize={119}
                    ref={flashlistRef}
                    // numColumns={3}
                    keyExtractor={(item) => item.name}
                />
            )}
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
