import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./routes";
import { registerMicroApps, start,initGlobalState } from 'qiankun';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.config.productionTip = false;
Vue.use(ElementUI);

//注册子应用
registerMicroApps([
  {
    name: 'app-vue2-demo', // 子应用的唯一名称
    entry: '//localhost:4001', //子应用index.html地址
    container: '#subapp-container', //挂载子应用的容器div
    activeRule: '/app-vue2-demo', //子应用的激活规则
    props:{
      routerBase:'/app-vue2-demo',
      mainRouter: router
    }
  },
  {
    name: 'app-react-demo', // 子应用的唯一名称
    entry: '//localhost:4002', //子应用index.html地址
    container: '#subapp-container', //挂载子应用的容器div
    activeRule: '/app-react-demo', //子应用的激活规则
    props:{
      routerBase:'/app-react-demo',
    }
  },
  // {
  //   name: 'app-vite-demo', // 子应用的唯一名称
  //   entry: '//localhost:4003', //子应用index.html地址
  //   container: '#subapp-container', //挂载子应用的容器div
  //   activeRule: '/app-vite-demo', //子应用的激活规则
  // },
],{
  beforeLoad:(app)=>{
    console.log("全局beforeLoad--",app);
    NProgress.start();
    return Promise.resolve();
  },
  beforeMount:(app)=>{
    console.log("全局beforeMount--",app);
    return Promise.resolve();
  },
  afterMount:(app)=>{
    console.log("全局afterMount--",app);
    NProgress.done();
    return Promise.resolve();
  },
  beforeUnmount:(app)=>{
    console.log("全局beforeUnmount--",app);
    return Promise.resolve();
  },
  afterUnmount:(app)=>{
    console.log("全局afterUnmount--",app);
    return Promise.resolve();
  }
});

//启动qiankun
start({
  prefetch:true,
  sandbox:{
    // strictStyleIsolation: true
    experimentalStyleIsolation:true
  }
});

const initialState = {
  type:1,
  books:[
    {id:1,name:'vue权威指南',price:100},
    {id:2,name:'react权威指南',price:200},
    {id:3,name:'vite权威指南',price:300},
  ]
};
//初始化全局状态
const actions = initGlobalState(initialState)

actions.onGlobalStateChange((state,prev)=>{
  console.log('主应用监听current:',state);
  console.log('主应用监听prev:',prev);

  console.log('initialState:',initialState);
})



new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// import {registerMicroApps, start} from './micro-ss'

// registerMicroApps([
//   {
//     name: 'app-vue2-demo', // 子应用的唯一名称
//     entry: '//localhost:4001', //子应用index.html地址
//     container: '#subapp-container', //挂载子应用的容器div
//     activeRule: '/app-vue2-demo', //子应用的激活规则
//     props:{
//       routerBase:'/app-vue2-demo',
//     }
//   },
//   {
//     name: 'app-react-demo', // 子应用的唯一名称
//     entry: '//localhost:4002', //子应用index.html地址
//     container: '#subapp-container', //挂载子应用的容器div
//     activeRule: '/app-react-demo', //子应用的激活规则
//   },
// ]);

// start();