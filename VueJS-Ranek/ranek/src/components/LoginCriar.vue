<template>
  <section>
    <h2>Crie sua conta</h2>
    <ErroNotificacao :erros="erros"/>
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">
        Criar conta
      </button>
      <UsuarioForm v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">
          Criar Usuario
        </button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "../components/UsuarioForm.vue";

export default {
  name: "LoginCriar",
  components: {
    UsuarioForm,
  },
  data() {
    return {
      criar: false,
      erros: []
    };
  },
  methods: {
    async criarUsuario() {
      this.erros = [];
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        this.$router.push({ name: "usuario" });
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.btn-form {
  max-width: 100%;
}
</style>