import { shallowMount, mount } from "@vue/test-utils";
import MainPage from "@/pages/MainPage";
import { pokemons } from "../mocks/pokemons.mock";

describe("MainPage Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MainPage);
  });

  test("must match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("must execute mixPokemonArray function on beforeMount", () => {
    const mixPokemonSpy = jest.spyOn(MainPage.methods, "mixPokemonArray");
    const wrapper = shallowMount(MainPage);
    expect(mixPokemonSpy).toHaveBeenCalled();
  });

  test("must match with snapshot after pokemons have been loaded", () => {
    const wrapper = shallowMount(MainPage, {
      data() {
        return {
          pokemonsArray: pokemons,
          pickedPokemon: pokemons[0],
          revealPokemon: false,
          playerWin: false,
          playerLose: false,
          message: "",
          score: 0,
          record: 0,
        };
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("must show the PokemonPic and PokemonOptions components mounted and redered", () => {
    const wrapper = shallowMount(MainPage, {
      data() {
        return {
          pokemonsArray: pokemons,
          pickedPokemon: pokemons[0],
          revealPokemon: false,
          playerWin: false,
          playerLose: false,
          message: "",
          score: 0,
          record: 0,
        };
      },
    });

    const pokePic = wrapper.find("pokemon-pic-stub");
    const options = wrapper.find("pokemon-options-stub");

    expect(pokePic.exists()).toBeTruthy();
    expect(pokePic.attributes("pokeid")).toBe("150");

    expect(options.exists()).toBeTruthy();
    expect(options.attributes("pokemons")).toBeTruthy();
  });

  test("tests the checkAnswer function", async () => {
    const wrapper = shallowMount(MainPage, {
      data() {
        return {
          pokemonsArray: pokemons,
          pickedPokemon: pokemons[0],
          revealPokemon: false,
          playerWin: false,
          playerLose: false,
          message: "",
          score: 0,
          record: 0,
        };
      },
    });

    await wrapper.vm.checkAnswer(150);

    expect(wrapper.find("button"));
    expect(wrapper.vm.revealPokemon).toBe(true);
    expect(wrapper.vm.message).toBe(
      `Yes! The pokemon is ${pokemons[0].data.name}`
    );

    await wrapper.vm.checkAnswer(111);
    expect(wrapper.vm.message).toBe(
      `Sorry, the hidden pokemon was ${pokemons[0].data.name}`
    );
  });
});
