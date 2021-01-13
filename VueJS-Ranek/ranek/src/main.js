import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PaginaCarregando from './components/PaginaCarregando.vue'
import ErroNotificacao from './components/ErroNotificacao.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.component('PaginaCarregando', PaginaCarregando);
app.component('ErroNotificacao', ErroNotificacao);
app.config.globalProperties.$filters = {
    currencyPTBR(value) {
        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
            return numericValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        }
        else {
            return '';
        }
    },
    capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
};

app.mount('#app');
