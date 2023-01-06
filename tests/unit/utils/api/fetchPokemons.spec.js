import pokemonApi from "@/utils/api/fetchPokemons.js";

describe("pokemonApi", () => {
  test("the correct URL for the enpoint", () => {
    expect(pokemonApi.defaults.baseURL).toBe(
      "https://pokeapi.co/api/v2/pokemon"
    );
  });
});
