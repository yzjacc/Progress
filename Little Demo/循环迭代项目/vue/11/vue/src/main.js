import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './tools/toast'
import api from './api'

Vue.config.productionTip = false
Vue.prototype.$toast = toast
Vue.prototype.$api = api
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
