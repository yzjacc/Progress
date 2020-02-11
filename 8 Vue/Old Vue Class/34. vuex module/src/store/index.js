import Vue from 'vue';
import Vuex from 'vuex';
import student from './student';
import learn from './learn';

Vue.use(Vuex); // $store state  $store.state.name

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    student,
    learn
  },
  
})
