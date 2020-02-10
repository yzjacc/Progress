import movieService from "../services/movieService.js"

export default {
    namespaced:true,
    state: {
        current: 1,
        total: 0,
        pageSize: 2,
        datas: [],
        isLoading: false //是否正在远程获取数据
    },
    mutations: {
        setState(state, newState = {}) {
            for (const prop in newState) {
                state[prop] = newState[prop];
            }
        }
    },
    actions: {
        fetch(context) {
            context.commit("setState", { isLoading: true })
            //根据当前的分页设置，获取电影数据
            movieService.getMovies(context.state.current, context.state.pageSize).then(resp => {
                // {total:xxx, datas:[xxx]}
                context.commit("setState", resp)
                context.commit("setState", { isLoading: false })
            })
        }
    }
}