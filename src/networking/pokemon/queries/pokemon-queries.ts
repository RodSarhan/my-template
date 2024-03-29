import {infiniteQueryOptions, queryOptions} from '@tanstack/react-query';
import {PokemonApi} from '~networking/pokemon/api/pokemon-api';

const paginatedPokemonQuery = () => {
    return infiniteQueryOptions({
        queryKey: ['pokemon', 'list'],
        queryFn: async ({pageParam}) => PokemonApi.getPokemonList({limit: 20, offset: pageParam}),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            return lastPageParam < lastPage.count ? lastPageParam + 20 : undefined;
        },
        select: (data) => {
            return data.pages.flatMap((page) => page.results) ?? [];
        },
    });
};

const pokemonDetailsQuery = (pokemonName: string) => {
    return queryOptions({
        queryKey: ['pokemon', 'details', pokemonName],
        queryFn: async () => PokemonApi.getPokemonDetails(pokemonName),
        throwOnError: true,
    });
};

export const PokemonQueries = {
    paginatedPokemonQuery,
    pokemonDetailsQuery,
};
