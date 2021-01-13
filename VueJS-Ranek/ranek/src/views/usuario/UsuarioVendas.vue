<template>
 <section>
     <div v-if="vendas">
         <h2>Vendas</h2>
         <div class="produtos-wrapper" v-for="(venda, index) in vendas" :key="index">
             <produto-item v-if="venda.produto" :produto="venda.produto">
                 <p class="comprador">
                     <span>Comprador: </span>
                     {{venda.comprador_id}}
                 </p>
             </produto-item>
              <div class="entrega">
                <h3>Entrega</h3>
                <ul v-if="venda.endereco">
                  <li v-for="(value, key) in venda.endereco" :key="key">
                    {{ $filters.capitalize(key) }}: <span style="font-style: italic">{{value}}</span>
                  </li>
                </ul>
              </div>
         </div>
     </div>
 </section>
</template>

<script>
import ProdutoItem from "../../components/ProdutoItem.vue";
import { api } from "../../services/services.js";
import { mapState } from "vuex";

export default {
    components: {
        ProdutoItem
    },
    data() {
        return {
            vendas: null,
        }
    },
    computed: {
        ...mapState(["usuario", "login"])
    },
    methods: {
        getVendas() {
            api.get(`/transacao?tipo=vendedor_id`)
            .then(response => {
                this.vendas = response.data;
            })
        }
    },
    watch: {
        login() {
            this.getVendas();
        }
    },
    created() {
        if (this.login) this.getVendas();
    }
}
</script>

<style scoped>
    .produto-wrapper {
        margin-bottom: 40px;
    }

    .comprador span {
        color: #e80;
    }

    .entrega {
      display: grid;
      grid-template-columns: minmax(100px, 200px) 1fr;
      grid-gap: 20px;
      margin-bottom: 60px;
    }
    h3 {
      justify-self: end;
      margin: 0px;
    }

    h2 {
        margin-bottom: 20px;
    }

    @media screen and (max-width: 500px) {
        .entrega {
            grid-template-columns: 1fr;
            grid-gap: 10px;
        }
        h3 {
            justify-self: start;
        }
    } 
</style>