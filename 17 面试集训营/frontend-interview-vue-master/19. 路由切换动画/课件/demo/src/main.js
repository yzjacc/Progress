import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'tailwindcss/tailwind.css';
import './global.css';

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
