import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      index: 0,
    },
  },
  {
    path: '/about',
    component: () => import('../views/About.vue'),
    meta: {
      index: 1,
    },
  },
  {
    path: '/user',
    component: () => import('../views/user/Layout.vue'),
    meta: {
      index: 2,
    },
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

router.beforeEach((to, from, next) => {
  if (from.matched.length > 0 && to.matched.length > 0) {
    const fromIndex = from.matched[0].meta.index;
    const toIndex = to.matched[0].meta.index;
    const direction = fromIndex <= toIndex ? 'right' : 'left';
    store.routerDirection.fromIndex = fromIndex;
    store.routerDirection.toIndex = toIndex;
    store.routerDirection.direction = direction;
  }

  next();
});

export default router;
