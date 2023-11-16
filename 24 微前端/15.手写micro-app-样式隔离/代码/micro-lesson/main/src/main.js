import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/routes";
import SimpleMicroApp from './micro-ce';

window.__MICRO_APP_ENVIRONMENT__ = true;

window.globalStr = "hello 基座应用";

SimpleMicroApp.start();

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
