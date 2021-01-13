import { createStore } from 'vuex';
import { api } from '../services/services.js';

export default createStore({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    },
    usuario_produtos: null
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload);
    }
  },
  actions: {
    getUsuarioProdutos(context) {
      api.get(`/produto?usuario_id=${context.state.usuario.id}`)
      .then(response => {
        context.commit('UPDATE_USUARIO_PRODUTOS', response.data);
      });
    },
    getUsuario(context) {
      return api.get(`/usuario`)
      .then(response => {
        context.commit('UPDATE_USUARIO', response.data);
        context.commit('UPDATE_LOGIN', true);
      })
    },
    criarUsuario(context, payload) {
      context.commit('UPDATE_USUARIO', {id: payload.email});
      return api.post('/usuario', payload);
    },
    deslogarUsuario(context) {
      context.commit('UPDATE_USUARIO', {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      });
      window.localStorage.removeItem("token");
      context.commit('UPDATE_LOGIN', false);
    },
    logarUsuario(context, payload) {
      return api.login({
        username: payload.email,
        password: payload.senha
      }).then(response => {
        console.log(response.data.token);
        window.localStorage.token = `Bearer ${response.data.token}`;
      });
    }
  },
  modules: {
  }
})
