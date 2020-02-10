import loginUser from "./loginUser.js"
import movies from "./movies.js"

export default new Vuex.Store({
    modules: {
        loginUser,
        movies
    }
})