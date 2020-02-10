import App from "./app.js"
import Home from "./pages/index.js"
import Movie from "./pages/moviePage.js"

//路由配置
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/movie", component: Movie }
    ],
    mode: "hash"
})

//仅负责启动vue和启动时的配置，所有的界面，交给组件app来渲染
new Vue({
    template: `<App />`,
    components: {
        App
    },
    el: "#app",
    router
})