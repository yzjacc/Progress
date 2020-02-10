import app from "./app.js"

const template = `<app></app>`;

const config = {
    el: "#app",
    components: {
        app
    },
    template
}

new Vue(config)