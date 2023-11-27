import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuecoms from "vue-coms";

import 'vue-coms/dist/vue-coms.css';
import 'vue-coms/dist/fonts/font.scss';

createApp(App).use(store).use(router).use(vuecoms).mount('#app')
