import pokemonApi from "@/utils/api/fetchPokemons.js";

const getPokemons = () => {
  const pokemons = Array.from(Array(650));
  return pokemons.map((_, index) => index + 1);
};

const getPokemonData = async ([poke1, poke2, poke3, poke4] = []) => {
  const promiseArray = [
    pokemonApi.get(`/${poke1}`),
    pokemonApi.get(`/${poke2}`),
    pokemonApi.get(`/${poke3}`),
    pokemonApi.get(`/${poke4}`),
  ];
  const pokemonData = await Promise.all(promiseArray);
  return pokemonData;
};

const getPokemonOptions = async () => {
  const allPokemons = getPokemons().sort(() => Math.random() - 0.5);
  const optionsNum = 4;
  const pickedPokemons = allPokemons.splice(0, optionsNum);
  const finalPokemons = getPokemonData(pickedPokemons);

  return finalPokemons;
};

export { getPokemonOptions, getPokemons, getPokemonData };
