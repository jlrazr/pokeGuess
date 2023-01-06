<template>
  <div class="container">
    <h1 v-if="!pickedPokemon">Getting pokemons out of their pokeballs...</h1>
    <div class="container" v-else>
      <h2>Can you guess the Pokémon?</h2>
      <PokemonPic :pokeId="pickedPokemon.data.id" :reveal="revealPokemon" />
      <PokemonOptions :pokemons="pokemonsArray" @pick-pokemon="checkAnswer" />
      <h2 class="fade-in message">
        {{ message }}
      </h2>
      <button class="fade-in" v-if="playerLose || playerWin" @click="newGame">
        Play again!
      </button>
    </div>
    <h3>Score: {{ score }}</h3>
    <h3>Personal record: {{ record }}</h3>
  </div>
</template>

<script>
import PokemonOptions from "@/components/PokemonOptions.vue";
import PokemonPic from "@/components/PokemonPic.vue";
import { getPokemonOptions } from "@/utils/getPokemonOptions.js";

export default {
  name: "MainPage",
  components: {
    PokemonOptions,
    PokemonPic,
  },

  data() {
    return {
      pokemonsArray: [],
      pickedPokemon: null,
      revealPokemon: false,
      playerWin: false,
      playerLose: false,
      message: "",
      score: 0,
      record: localStorage.getItem("record") || 0,
    };
  },

  methods: {
    async mixPokemonArray() {
      const randomPick = Math.floor(Math.random() * 4);
      this.pokemonsArray = await getPokemonOptions();
      this.pickedPokemon = this.pokemonsArray[randomPick];
    },
    checkAnswer(pokemonId) {
      this.revealPokemon = true;
      if (pokemonId === this.pickedPokemon.data.id) {
        this.playerWin = true;
        this.score++;
        this.message = `Yes! The pokemon is ${this.pickedPokemon.data.name}`;
        this.setRecord();
      } else {
        this.playerLose = true;
        this.score = 0;
        this.message = `Sorry, the hidden pokemon was ${this.pickedPokemon.data.name}`;
      }
    },
    newGame() {
      this.revealPokemon = false;
      this.pickedPokemon = null;
      this.message = "";
      this.playerWin = false;
      this.playerLose = false;
      this.pokemonsArray = [];
      this.record = localStorage.getItem("record");
      this.mixPokemonArray();
    },
    setRecord() {
      const currScore = this.score;
      const currRecord = localStorage.getItem("record");

      if (currScore > currRecord) {
        localStorage.setItem("record", currScore);
      }
    },
  },

  beforeMount() {
    this.mixPokemonArray();
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;

  h2 {
    color: #fff;
    font-size: 22px;

    @media (min-width: 766px) {
      font-size: 32px;
    }
  }

  h3 {
    color: #fff;
    font-size: 16px;
    margin: 0;

    @media (min-width: 766px) {
      font-size: 32px;
    }
  }

  button {
    margin-right: 10px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
    padding: 14px 5px;
    font-weight: 600;
  }

  span {
    color: green;
    font-weight: 700;
  }

  .message {
    font-size: 14px;

    @media (min-width: 766px) {
      font-size: 32px;
    }
  }
}
</style>
