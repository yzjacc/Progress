import app from "./app.js"
import router from "./router.js"
import store from "./store/index.js"
const template = `<app></app>`;
store.dispatch("loginUser/autoLogin");
const config = {
    el: "#app",
    components: {
        app
    },
    template,
    router,
    store
}

new Vue(config)