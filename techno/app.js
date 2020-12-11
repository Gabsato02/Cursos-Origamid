const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
    mensagemAlerta: '',
    alertaAtivo: false,
    carrinhoAtivo: false
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString('PT-BR', {style: 'currency', currency: 'BRL'});
    },
    maiuscula(valor) {
      return valor.toUpperCase();
    }
  },
  computed: {
    carrinhoTotal() {
      let total = 0;
      if(this.carrinho.length) {
        this.carrinho.forEach(el => {
          total+= el.preco;
        })
      }
      return total;
    }
  },
  methods: {
    fetchProdutos() {
      fetch('./api/produtos.json')
        .then(r => r.json())
        .then(r => {
          this.produtos = r;
        })
    },
    fetchProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(r => r.json())
        .then(r => {
          this.produto = r;
        })
    },
    abrirModal(id) {
      this.fetchProduto(id);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    fecharModal({target, currentTarget}) {
      if (currentTarget === target) this.produto = false;
    },
    clickForaCarrinho({target, currentTarget}) {
      if (currentTarget === target) this.carrinhoAtivo = false;
    },
    adicionarItem(event) {
      const {id, nome, preco} = this.produto;

      this.produto.estoque--;
      this.carrinho.push({
        id,
        nome,
        preco
      });

      this.alerta(`O item ${nome} foi adicionado ao carrinho.`);
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
    checarLocalStorage() {
      if (window.localStorage.carrinho) this.carrinho = JSON.parse(window.localStorage.carrinho);
    },
    compararEstoque() {
      const itens = this.carrinho.filter(({id}) => id === this.produto.id);
      this.produto.estoque -= itens.length;
    },
    alerta(mensagem) {
      this.mensagemAlerta = mensagem;
      this.alertaAtivo = true;
      setTimeout(() => {
        this.alertaAtivo = false;
      }, 1000)
    },
    router() {
      const hash = document.location.hash.replace('#', '');
      if(hash) this.fetchProduto(hash);
    }
  },
  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    },
    produto() {
      const hash = this.produto.id || '';
      document.title = this.produto.nome ||'Techno';
      history.pushState(null, null, `#${hash}`);

      if (this.produto) this.compararEstoque();
    }
  },
  created() {
    this.fetchProdutos();
    this.checarLocalStorage();
    this.router();
  }
})