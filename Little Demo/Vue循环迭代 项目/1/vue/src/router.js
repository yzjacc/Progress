import Vue from 'vue'
import Router from 'vue-router'
import addStu from './views/addStu.vue'
import stuList from './views/stuList.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/addStu',
      name:'addStudent',
      component: addStu
    },
    {
      path: '/stuList',
      component: stuList,
      name: 'studentList'
    },
    {
      path: '*',
      redirect: '/stuList'
    }
  ],
  linkExactActiveClass: 'active'
})
