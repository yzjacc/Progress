import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue")
    },
    {
      path: "/loadMicroApp",
      name: "LoadMicroApp",
      component: () => import("@/views/LoadMicroApp.vue")
    },
  ]
})

export default router;