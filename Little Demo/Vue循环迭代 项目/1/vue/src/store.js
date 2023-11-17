import Vue from "vue";
import Vuex from "vuex";
import api from "./api";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        keyWrod: "",
        list: [],
        count: 0,
        page: 1
    },
    mutations: {
        setList(state, list) {
            state.list = list;
        },
        setCount(state, count) {
            state.count = count;
        }
    },
    actions: {
        getList(ctx ,obj) {
            api.findByPage(obj.page, obj.size).then(data => {
                ctx.commit("setList", data.data.data.findByPage);
                ctx.commit("setCount", data.data.data.cout);
            })
        }
    }
});
