<template>
  <div class="container">
    <ul>
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.data.id"
        @click="$emit('pickPokemon', pokemon.data.id)"
      >
        {{ pokemon.data.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true,
    },

    methods: {
      pickPokemon() {
        return;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    list-style-type: none;

    li {
      margin-right: 50px;
      background: #fff;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      cursor: pointer;
      margin-bottom: 10px;
      width: 250px;
      padding: 14px 5px;
      font-weight: 600;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
