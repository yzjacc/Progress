import Home from "./pages/index.js"
import Movie from "./pages/movie.js"
import MovieDetail from "./pages/movieDetail.js"

const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        {
            path: "/movie", component: Movie, meta: {
                myData: 123
            }
        },
        {
            path: "/movie/:id", component: MovieDetail, meta: {
                myData: 456
            }
        },
    ],
    base: "/第4天/第4天效果/"
})

router.beforeEach((to, from, next) => {
    next();
})

export default router;
