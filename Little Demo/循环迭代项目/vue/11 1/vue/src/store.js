import Vue from "vue";
import Vuex from "vuex";
import api from "./api";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keyWrod: "",
    size: 5,
    list: [],
    count: 0,
    nowPage: 1,
    totalPage: 1,
    showModal: false,
    editStu: {}
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    setCount(state, count) {
      state.count = count;
      state.totalPage = Math.ceil(count/state.size)
    },
    setModal(state, bool) {
      state.showModal = bool;
    },
    setEditStu(state, stu) {
      state.editStu = stu;
    },
    setNowPage(state,n) {
      switch (n) {
        case -1:
          if (state.nowPage > 1) {
            state.nowPage--;
          }
          break;
        case 0:
          if (state.nowPage < state.totalPage) {
            state.nowPage++;
          }
          break;

        default:
          state.nowPage = n;
      }
    },
    setKeyword(state, keyWrod) {
      state.nowPage = 1;
      state.keyWrod = keyWrod;
    }
  },
  actions: {
    getList(ctx) {
      api.findByPage(ctx.state.nowPage, ctx.state.size).then(data => {
        ctx.commit("setList", data.data.data.findByPage);
        ctx.commit("setCount", data.data.data.cont);
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
       
    },
    turnPage({dispatch, commit, state}, n) {
        commit('setNowPage', n);
        if(state.keyWrod) {
           dispatch('search', {
             page: state.nowPage,
             size: state.size,
             sex: -1,
             search: state.keyWrod
           })
        } else {
          dispatch('getList');
        }
       
    },
    searchValue({dispatch, commit, state}, value) {
          commit("setKeyword", value);
          if(state.keyWrod == '') {
            dispatch('getList');
          } else {
              return dispatch('search', {
                  page: state.nowPage,
                  size: state.size,
                  search: value
              })
          }
    },
    search({commit}, data) {
        return api.searchStu(data).then(res => {
          commit("setList", res.data.data.searchList);
          commit("setCount", res.data.data.cont);
          return {
            status: 'success',
            msg: '查找成功'
          }
        })
    },
    delStu({dispatch, state}, sNo) {
        return api.delStu(sNo).then(data => {
            if(state.totalPage === Math.ceil((state.count -1)/state.size)) {
               dispatch('turnPage', state.nowPage)
            } else {
              dispatch('turnPage', -1)
            }
            return {
              status: 'success',
              msg: '删除成功'
            }
        })
    }
  }
});
