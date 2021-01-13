<template>
  <section>
    
    <usuario-form>
      <ErroNotificacao :erros="erros"/>
      <button class="btn" @click.prevent="atualizarUsuario">
        Atualizar Usuário
      </button>
    </usuario-form>
  </section>
</template>

<script>
import UsuarioForm from "../../components/UsuarioForm.vue";
import { api } from "../../services/services.js";

export default {
  name: "UsuarioEditar",
  components: { UsuarioForm },
  data() {
    return {
      erros: []
    }
  },
  methods: {
    atualizarUsuario() {
      this.erros = [];
      api
        .put(`/usuario`, this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({name: "usuario"});
        })
        .catch(error => {
          this.erros.push(error.response.data.message);
        });
    },
  },
};
</script>

<style>
</style>