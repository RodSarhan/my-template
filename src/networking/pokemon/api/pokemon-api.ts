import PokeAPI from 'pokeapi-typescript';

const getPokemonList = async ({limit, offset}: {limit: number; offset: number}) => {
    const result = await PokeAPI.Pokemon.list(limit, offset);
    return result;
};

const getPokemonDetails = async (pokemonName: string) => {
    const result = await PokeAPI.Pokemon.resolve(pokemonName);
    return result;
};

export const PokemonApi = {
    getPokemonList,
    getPokemonDetails,
};
