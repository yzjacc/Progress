import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); // $store state  $store.state.name

export default new Vuex.Store({
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

  },
  actions: {

  }
})
