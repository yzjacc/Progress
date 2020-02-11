import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  //1 只要是 根路径 与根路径下的子路径都会有 
  // router-link-active 的类
  //2 router-link-exact-active 完全匹配 点哪个router-link 就会加上该类名
  linkExactActiveClass: 'active-exact',//改名
  linkActiveClass: 'active',//改名
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/learn',
      name: 'learn',
      component: () => import('./views/Learn')
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('./views/Student')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('./views/Community')
    }
  ]
})




























// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Home.vue'

// Vue.use(Router);  // $router $route

// // hash history

// export default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })
