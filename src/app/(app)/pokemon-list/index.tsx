import {FontAwesome} from '@expo/vector-icons';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {ErrorBoundaryProps, Link, Stack} from 'expo-router';
import {useRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {PokemonQueries} from '~networking/pokemon/queries/pokemon-queries';
import {FlashList} from '@shopify/flash-list';
import {ExpoImage} from '~components/common/ExpoImage';
import {queryClient} from '~networking/clients/query-client';
import {useTranslation} from 'react-i18next';

const PokemonComponent = ({
    pokemon,
}: {
    pokemon: {
        name: string;
    };
}) => {
    const {data: pokemonDetails} = useQuery(PokemonQueries.pokemonDetailsQuery(pokemon.name));

    return (
        <Link href={`/pokemon-list/${pokemon.name}`} asChild>
            <Pressable style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <ExpoImage
                    source={{uri: pokemonDetails?.sprite}}
                    style={{height: 100, width: 100}}
                />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{pokemon.name}</Text>
            </Pressable>
        </Link>
    );
};

export default function PokemonListScreen() {
    const {styles, theme} = useStyles(sheet);
    const {t} = useTranslation();
    const flashlistRef = useRef<
        FlashList<{
            name: string;
        }>
    >(null);

    const {
        data: pokemonList,
        fetchNextPage,
        hasNextPage,
        isFetching,
        refetch,
    } = useInfiniteQuery(PokemonQueries.paginatedPokemonQuery());

    const onPressRefresh = () => {
        queryClient.setQueryData(PokemonQueries.paginatedPokemonQuery().queryKey, (oldData) => {
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
                <>
                    <Text>{t('found-count-pokemon', {count: pokemonList.length})}</Text>
                    <FlashList
                        data={pokemonList}
                        renderItem={({item}) => <PokemonComponent pokemon={item} key={item.name} />}
                        onEndReached={() => {
                            if (hasNextPage && !isFetching) {
                                fetchNextPage();
                            }
                        }}
                        onEndReachedThreshold={0.1}
                        estimatedItemSize={119}
                        ref={flashlistRef}
                        numColumns={3}
                    />
                </>
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

const sheet = createStyleSheet((theme, runtime) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary900,
        paddingTop: 10,
        width: '100%',
    },
}));
