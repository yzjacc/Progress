import Vue from "vue";
import Vuex from "vuex";
import api from "./api";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keyWrod: "",
    list: [],
    count: 0,
    page: 1,
    showModal: false,
    editStu: {}
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    setCount(state, count) {
      state.count = count;
    },
    setModal(state, bool) {
      state.showModal = bool;
    },
    setEditStu(state, stu) {
      state.editStu = stu;
    }
  },
  actions: {
    getList(ctx, obj) {
      api.findByPage(obj.page, obj.size).then(data => {
        ctx.commit("setList", data.data.data.findByPage);
        ctx.commit("setCount", data.data.data.cout);
      });
    },
    updateStu({ commit, state }, stu) {
      return api
        .updateStu(stu)
        .then(res => {
          if(res.data.status == 'success') {
              commit('setModal', false);
              Object.assign(state.editStu, stu)
              return {
                  msg: res.data.msg,
                  status: 'success'
              }
          } else {
            return {
                msg: res.data.msg,
                status: 'fail'
            }
          }
        })
       
    }
  }
});
