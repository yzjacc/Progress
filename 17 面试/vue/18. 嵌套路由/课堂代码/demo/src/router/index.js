import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/user',
    component: () => import('../views/user/Layout.vue'),
    children: [
      {
        path: '', // 匹配的 /user
        component: () => import('../views/user/Profile.vue'),
      },
      {
        path: 'address', // /user/address
        component: () => import('../views/user/Address.vue'),
      },
      {
        path: 'security',
        component: () => import('../views/user/Security.vue'),
      },
      {
        path: 'friends',
        component: () => import('../views/user/Friends.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
