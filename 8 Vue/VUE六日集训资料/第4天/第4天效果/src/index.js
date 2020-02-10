import app from "./app.js"
import router from "./router.js"

const template = `<app></app>`;

const config = {
    el: "#app",
    components: {
        app
    },
    template,
    router
}

const vm = new Vue(config)
console.log(vm)