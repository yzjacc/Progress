import Home from "./pages/index.js"
import Movie from "./pages/moviePage.js"
import MovieDetail from "./pages/movieDetail.js"
import Login from "./pages/login.js"
import store from "./store/index.js"

const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        {
            path: "/movie", component: Movie, meta: {
                //自定义的数据，该数据通常会被导航守卫使用
                needLogin: true
            }
        },
        {
            path: "/movie/:id", component: MovieDetail, meta: {
                //自定义的数据，该数据通常会被导航守卫使用
                needLogin: true
            }
        },
        { path: "/login", component: Login }
    ],
    mode: "hash"
})

//注册全局导航守卫：beforeEach，传入的函数会在每次进入页面之前运行
//一旦注册了该守卫，除非在守卫中调用next函数，否则不会改变地址
router.beforeEach(function (to, from, next) {
    if (to.meta && to.meta.needLogin) {
        //需要登录的页面
        if (store.state.loginUser.data) {
            //已登录
            next(); //放行
        }
        else {
            next("/login"); //跳转到登录页
        }
    }
    else {
        next();//放行
    }
})


export default router;