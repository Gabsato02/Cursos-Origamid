<template>
  <section>
    <div v-if="produto" class="produto">
      <ul class="fotos" v-if="produto.fotos">
        <li v-for="(foto, index) in produto.fotos" :key="index">
          <img :src="foto.src" :alt="foto.titulo" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="preco">{{ $filters.currencyPTBR(produto.preco) }}</p>
        <p class="descricao">{{ produto.descricao }}</p>
        <transition mode="out-in" v-if="produto.vendido === 'false'">
          <button class="btn" v-if="!finalizar" @click.prevent="finalizar = true">Comprar</button>
          <finalizar-compra
            v-else
            :produto="produto"
          />
        </transition>
        <button class="btn btn-disabled" v-else disabled>Produto vendido</button>
      </div>
    </div>
    <pagina-carregando v-else />
  </section>
</template>

<script>
import { api } from "@/services/services.js";
import PaginaCarregando from "../components/PaginaCarregando.vue";
import FinalizarCompra from "../components/FinalizarCompra.vue";

export default {
  components: { PaginaCarregando, FinalizarCompra },
  name: "Produtos",
  data() {
    return {
      produto: null,
      finalizar: false,
    };
  },
  props: ["id"],
  methods: {
    getProduto() {
      api.get(`/produto/${this.id}`).then((response) => {
        this.produto = response.data;
        document.title = `Ranek - ${this.produto.nome}`;
      });
    },
  },
  created() {
    this.getProduto();
  },
};
</script>

<style lang="css" scoped>
.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.preco {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

img {
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  border-radius: 4px;
}

.fotos {
  grid-row: 1 / 3;
}

.info {
  position: sticky;
  top: 20px;
}

.descricao {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

@media screen and (max-width: 500px) {
  .produto {
    grid-template-columns: 1fr;
  }

  .info {
    position: initial;
    text-align: center;
  }
  .btn {
  margin: 20px auto 0 auto;
  }
}

</style>