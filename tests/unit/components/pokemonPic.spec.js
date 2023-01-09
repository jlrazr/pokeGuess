import { shallowMount } from "@vue/test-utils";
import PokemonPic from "@/components/PokemonPic";

describe("PokemonPic Component", () => {
  test("must match the snapshot", () => {
    const wrapper = shallowMount(PokemonPic, {
      props: {
        pokeId: 150,
        reveal: false,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("must show a hidden/black image and pokemon with ID 150", () => {
    const wrapper = shallowMount(PokemonPic, {
      props: {
        pokeId: 150,
        reveal: false,
      },
    });

    const [image1, image2] = wrapper.findAll("img");
    expect(image1.exists()).toBeTruthy();
    expect(image1.classes("hidden")).toBe(true);
    expect(image2).toBe(undefined);
    expect(image1.attributes().src).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg"
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("must show the Pokemon if revealPokemon = true", () => {
    const wrapper = shallowMount(PokemonPic, {
      props: {
        pokeId: 150,
        reveal: true,
      },
    });

    console.log(wrapper.html());
    const [image1, image2] = wrapper.findAll("img");
    expect(image1.exists()).toBeTruthy();
    expect(image2.classes("fade-in")).toBe(true);
  });
});
