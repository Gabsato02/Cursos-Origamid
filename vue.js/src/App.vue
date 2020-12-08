<template>
  <div id="nav">
    <router-link to="/">Home</router-link>

    <button @click='verPreco'>VER PREÇO</button>
  </div>
</template>

<script>
export default {
  data() {},
  methods: {
    verPreco() {
      fetch("https://api.iextrading.com/1.0/stock/aapl/quote")
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    },
  },
};
</script>
