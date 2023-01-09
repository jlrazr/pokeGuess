<template>
  <div class="img-container">
    <img class="hidden" :src="imgSrc" alt="Guess the hidden Pokémon" />
    <img
      v-if="reveal"
      class="fade-in"
      :src="imgSrc"
      alt="Guess the hidden Pokémon"
    />
  </div>
</template>

<script>
export default {
  props: {
    pokeId: {
      type: Number,
      required: true,
    },
    reveal: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  computed: {
    imgSrc() {
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokeId}.svg`;
      return img;
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  position: absolute;
  height: 110px;

  @media (min-width: 766px) {
    height: 200px;
  }
}

.img-container {
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  height: 120px;

  @media (min-width: 766px) {
    height: 200px;
  }
}

.hidden {
  filter: brightness(0);
  -moz-user-drag: none;
  -webkit-user-drag: none;
}

.remove-hidden {
  opacity: 1;
}
</style>
