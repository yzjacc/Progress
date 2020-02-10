import movieService from "../services/movieService.js"

export default {
    namespaced: true,
    state: {
        datas: [],
        page: 1,
        pageSize: 2,
        total: 0,
        isLoading: false
    },
    mutations: {
        setState(state, newState = {}) {
            for (const prop in newState) {
                state[prop] = newState[prop];
            }
        }
    },
    actions: {
        async fetch(context) {
            context.commit("setState", { isLoading: true });
            const resp = await movieService.getMovies(context.state.page, context.state.pageSize)
            context.commit("setState", { isLoading: false, ...resp });
        }
    }
}