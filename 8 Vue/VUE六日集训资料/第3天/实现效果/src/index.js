import App from "./app.js"
//仅负责启动vue和启动时的配置，所有的界面，交给组件app来渲染
new Vue({
    template: `<App />`,
    components: {
        App
    },
    el: "#app"
})