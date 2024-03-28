import PokeAPI from 'pokeapi-typescript';

const getPokemonList = async ({limit, offset}: {limit: number; offset: number}) => {
    const result = await PokeAPI.Pokemon.list(limit, offset);
    const list = result.results.map((pokemon) => ({
        name: pokemon.name,
    }));
    return {...result, results: list};
};

const getPokemonDetails = async (pokemonName: string) => {
    const result = await PokeAPI.Pokemon.resolve(pokemonName);
    return {
        sprite: result.sprites.front_default,
        name: result.name,
        height: result.height,
        weight: result.weight,
    };
};

export const PokemonApi = {
    getPokemonList,
    getPokemonDetails,
};
