<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input type="text" id="nome" name="nome" v-model='produto.nome'/>

    <label for="preco">Preço (R$)</label>
    <input type="number" id="preco" name="preco" v-model='produto.preco'/>

    <label for="fotos">Fotos</label>
    <input type="file" id="fotos" name="fotos" multiple ref='fotos'/>

    <label for="descricao">Descrição</label>
    <textarea id="descricao" name="descricao" v-model='produto.descricao'></textarea>

    <input type='button' value='Adicionar Produto' class='btn' @click.prevent='adicionarProduto'>
  </form>
</template>

<script>
import { api } from '../services/services.js';

export default {
  name: "ProdutoAdicionar",
  data() {
      return {
          produto: {
              nome: '',
              preco: '',
              descricao: '',
              fotos: null,
              usuario_id: '',
              vendido: 'false'
          }
      };
  },
  methods: {
      formatarProduto() {
        const form = new FormData();

        const files = this.$refs.fotos.files;
        console.log(files);
        for (let i = 0; i < files.length; i++) {
            form.append(files[i].name, files[i]);
        }

        form.append("nome", this.produto.nome);
        form.append("preco", this.produto.preco);
        form.append("descricao", this.produto.descricao);
        form.append("vendido", this.produto.vendido);
        form.append("usuario_id", this.$store.state.usuario.id);

        return form;
      },
      adicionarProduto() {
        const produto = this.formatarProduto();
        api.post('/produto', produto)
        .then(() => {
            this.$store.dispatch('getUsuarioProdutos');
        })
        .catch(err => {
            console.log(err);
        })
      }
  }
};
</script>

<style scoped>
    .adicionar-produto {
        display: grid;
        grid-template-columns: 100px 1fr;
        align-items: center;
        margin-bottom: 60px;
    }

    .btn {
        grid-column: 2;
    }

</style>