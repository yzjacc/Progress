import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/reset.css';
//路由守卫 执行顺序 全局 独享 组件内
Vue.config.productionTip = false;
//全局守卫
router.beforeEach((to, from, next)=>{
  console.log('beforeEach');
  next();
})
//路由内数据都被解析完毕 （组件数据加载完毕）
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve');
  next();
})
//都彻底执行完了
router.afterEach(() => {
  console.log('afterEach');
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')