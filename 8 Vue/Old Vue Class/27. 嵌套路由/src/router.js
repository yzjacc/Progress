import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';

Vue.use(Router); // $router $route

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active-exact',
  linkActiveClass: 'active',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/home'
    // },
    {
      path: '/home',
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
      component: () => import('./views/Community'),
      redirect: '/community/academic',
      children: [
        {
          //自动识别父类名
          path: 'academic',
          name: 'academic',
          component: () => import('./views/Academic')
        },
        {
          path: 'download',
          name: 'download',
          component: () => import('./views/Download')
        },
        {
          path: 'personal',
          name: 'personal',
          component: () => import('./views/Personal')
        }
      ]
    },
    {
      path: '/NotFound',
      component: () => import('./views/NotFound')
    },
    {
      path: '*',
      redirect (to) {
        if(to.path === '/') {
          return '/home';
        } else {
          return '/NotFound';
        }
      }
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
