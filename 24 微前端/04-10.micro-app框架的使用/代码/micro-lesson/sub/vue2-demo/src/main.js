import Vue from 'vue'
import App from './App.vue'
import router from "@/routes"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

function handleMicroData() { 
  //如果当前是微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) { 
    //获取父应用传递的数据
    console.log("子应用接收到的数据--->：", window.microApp.getData());
  
    //事件监听基座下发的数据
    window.microApp.addDataListener((data) => {
      console.log("子应用通过事件监听接收到的数据==>：", data);

      Vue.prototype.$notify({
        title: '来自基座的新数据',
        message: data.type,
        position:'bottom-right'
      })

      //当基座下发的数据有path属性时进行路由跳转
      if (data.path && data.path !== router.currentRoute.path) {
        router.push(data.path);
      }
    }, true);
  }
}

let app = null
// 👇 将渲染操作放入 mount 函数 -- 必填
function mount () {
  app = new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
  handleMicroData();
}

// 👇 将卸载操作放入 unmount 函数 -- 必填
function unmount () {
  app.$destroy()
  app.$el.innerHTML = ''
  app = null
}



// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}