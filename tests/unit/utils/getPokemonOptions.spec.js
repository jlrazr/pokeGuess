import {
  getPokemons,
  getPokemonData,
  getPokemonOptions,
} from "@/utils/getPokemonOptions";

describe("getPokemonOptions utilities", () => {
  test("must return an array of numbers", () => {
    const getPokemonsOutput = getPokemons();
    expect(getPokemonsOutput.length).toBeGreaterThanOrEqual(650);
    expect(getPokemonsOutput[0]).toBe(1);
    expect(getPokemonsOutput[324]).toBe(325);
    expect(getPokemonsOutput[649]).toBe(650);
  });

  test("must return an array of 4 elements with pokemon data", async () => {
    const getPokemonsDataOutput = await getPokemonData([1, 2, 3, 4]);
    expect(getPokemonsDataOutput.length).toBe(4);
    expect(getPokemonsDataOutput[0]).toBeInstanceOf(Object);
    expect(getPokemonsDataOutput[0].data.name).toBe("bulbasaur");
    expect(getPokemonsDataOutput[1].data.name).toBe("ivysaur");
    expect(getPokemonsDataOutput[2].data.name).toBe("venusaur");
    expect(getPokemonsDataOutput[3].data.name).toBe("charmander");
  });

  test("must return an array of objects with random pokemons", async () => {
    const getPokemonOptionsOutput = await getPokemonOptions();
    expect(getPokemonOptionsOutput.length).toBe(4);
    expect(getPokemonOptionsOutput[0]).toBeInstanceOf(Object);
    expect(getPokemonOptionsOutput[0].data.name).toEqual(expect.any(String));
  });
});
