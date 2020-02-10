import loginUser from "./loginUser.js"
import movie from "./movie.js"

export default new Vuex.Store({
    modules: { //配置模块
        loginUser,
        movie
    }
})
