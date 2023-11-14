import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/routes"

import microApp from '@micro-zoe/micro-app'


microApp.start({
  preFetchApps: [
    { name: 'app-vue2-demo', url: 'http://localhost:4001/' }
  ],
  globalAssets: {
    js: ['https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js']
  },
  plugins: {
    modules: {
      // appName即应用的name值
      'app-vite-demo': [{
        loader(code) {
          if (process.env.NODE_ENV === 'development') {
            // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
            code = code.replace(/(from|import)(\s*['"])(\/app-vite-demo\/)/g, all => {
              return all.replace('/app-vite-demo/', 'http://localhost:4003/app-vite-demo/')
            })
          }
          return code
        }
      }]
    }
  }
})

microApp.addDataListener('app-vue2-demo',(data) => {
  console.log("基座监听接收到的数据==>：", data);

  Vue.prototype.$notify({
    title: '来自子应用的数据',
    message: data.type,
    position:'top-right'
  })

  //当子应用的数据有path属性时，基座进行路由跳转
  if (data.path && data.path !== router.currentRoute.path) {
    router.push(data.path);
  }
});

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
