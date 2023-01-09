import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonOptions Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, { props: { pokemons } });
  });

  test("must match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("must show the 4 pokemons options correctly", () => {
    const liTags = wrapper.findAll("li");
    expect(liTags.length).toBe(4);
    expect(liTags[0].text()).toBe("MewTwo");
    expect(liTags[1].text()).toBe("Bulbasaur");
    expect(liTags[2].text()).toBe("Ivysaur");
    expect(liTags[3].text()).toBe("Voltorb");
  });

  test("must emmit the selection with its own paramenters when clicked", () => {
    const [li1, li2, li3, li4 ] = wrapper.findAll("li");

    li1.trigger("click");
    li2.trigger("click");
    li3.trigger("click");
    li4.trigger("click");

    expect(wrapper.emitted("pickPokemon").length).toBe(4);
    expect(wrapper.emitted("pickPokemon")[0]).toStrictEqual([150]);
    expect(wrapper.emitted("pickPokemon")[1]).toStrictEqual([1]);
    expect(wrapper.emitted("pickPokemon")[2]).toStrictEqual([2]);
    expect(wrapper.emitted("pickPokemon")[3]).toStrictEqual([100]);
  });
});
