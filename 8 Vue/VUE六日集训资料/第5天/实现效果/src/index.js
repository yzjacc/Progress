import App from "./app.js"
import router from "./router.js"
import store from "./store/index.js"
//仅负责启动vue和启动时的配置，所有的界面，交给组件app来渲染
store.dispatch("loginUser/syncLocal"); //同步本地存储
window.store = store;

const vm = new Vue({
    template: `<App />`,
    components: {
        App
    },
    el: "#app",
    router,
    store
})
