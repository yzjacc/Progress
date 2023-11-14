import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: window.__MICRO_APP_BASE_ROUTE__ || '/',
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue")
    },
    {
      path: "/about",
      name: "About",
      component: () => import("@/views/About.vue")
    },
    {
      path: "/users",
      name: "Users",
      component: () => import("@/views/Users.vue")
    }
  ]
});

router.beforeEach((to, from, next) => { 
  console.log("子--->", to);
  console.log("子--->", from);

  next();
})

export default router;