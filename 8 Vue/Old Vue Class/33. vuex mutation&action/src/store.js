import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); // $store state  $store.state.name
//32 中那么写是错误的 不能再组件中修改vuex的数据

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    name: 'shanshan',
    age: 18,
    look: 'beautiful',
    studentList: []
  },
  getters: {
    person (state) {
      return `姓名：${state.name} 年龄${state.age}`
    },
    newStudentList (state, getters) {
      return state.studentList.map(student => `姓名：${student.name} 年龄：${student.age} ${getters.person}`)
    }
  },
  mutations: {
    changeStudentList (state, {tempObj, name}) {
      // setTimeout(() => {
        state.studentList.push(tempObj);
        state.name = name;
      // }, 1000)
    }
  },
  actions: {
    changeStudentList ( {commit}, payload ) {
      setTimeout(()=>{
        commit('changeStudentList',payload )
      }, 1000)
    }
  }
})
