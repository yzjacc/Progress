import Vue from 'vue'
import App from './App.vue'
import router from "@/routes"
import monitor from "monitor-sdk";
import './style.css'

Vue.config.productionTip = false

monitor.init({
  // trackerAll: true,
  vue: {
    Vue,
    router
  }
});

Vue.prototype.$monitor = monitor;

const app = new Vue({
  render: h => h(App),
  router
})
app.$mount('#app')


