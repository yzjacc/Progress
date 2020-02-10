import Home from "./pages/index.js"
import Movie from "./pages/movie.js"
import Login from "./pages/login.js"
import MovieDetail from "./pages/movieDetail.js"
import store from "./store/index.js"

const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        {
            path: "/movie", component: Movie, meta: {
                needLogin: true
            }
        },
        {
            path: "/movie/:id", component: MovieDetail, meta: {
                needLogin: true
            }
        },
        {
            path: "/login", component: Login
        },
    ],
    base: "/第4天/第4天效果/"
})

router.beforeEach(function (to, from, next) {
    if (to.meta && to.meta.needLogin) {
        if (store.state.loginUser.data) {
            //已登录
            next();
        }
        else{
            next("/login");
        }
    }
    else {
        next();
    }
})

export default router;
