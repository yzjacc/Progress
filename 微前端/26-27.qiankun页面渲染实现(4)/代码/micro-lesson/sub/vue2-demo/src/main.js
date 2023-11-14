import "./public-path"; //解决静态文件路径问题
import Vue from 'vue'
import App from './App.vue'
// import router from "@/routes"
import VueRouter from "vue-router";
//获取路由静态配置
import routes from "@/routes"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);



Vue.use(VueRouter);

let router = null;
let instance = null;

function render(props = {}){
  //主应用传递过来的挂载子应用的div容器
  const { container,routerBase} = props;

  console.log(routerBase);


  //当然这里的前提是主应用和子应用是同一个版本的vue-router
  // Vue.prototype.$parentRouter = parentRouter;

  //创建router
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : "/",
    mode: "history",
    routes
  });

  instance = new Vue({
    render: h => h(App),
    router
  }).$mount(container ? container.querySelector('#app') : '#app') //避免和主应用id冲突
}

//独立运行时
if(!window.__POWERED_BY_QIANKUN__){
  render();
}

export async function bootstrap(){
  console.log('vue2 子应用 bootstrap')
}

export async function mount(props){
  console.log('vue2 子应用 mount')

  Vue.prototype.$parentProps = props;

  // props.onGlobalStateChange((state,prev)=>{
  //   console.log('子应用监听currentState',state);
  //   console.log('子应用监听prevState',prev);
  // })

  // let state = {
  //   type: 9999,
  //   score: 100
  // }

  // props.setGlobalState(state);

  render(props);
}

export async function unmount(props){
  console.log('vue2 子应用 unmount')
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
  props.container.innerHTML = '';
}

// new Vue({
//   render: h => h(App),
//   router
// }).$mount('#app')
