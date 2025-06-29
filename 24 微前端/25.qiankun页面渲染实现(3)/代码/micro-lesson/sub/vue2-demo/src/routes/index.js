// import Vue from "vue";
// import VueRouter from "vue-router";

// Vue.use(VueRouter);

// const router = new VueRouter({
//   mode: "history",
  // routes: [
  //   {
  //     path: "/",
  //     name: "Home",
  //     component: () => import("@/views/Home.vue")
  //   },
  //   {
  //     path: "/about",
  //     name: "About",
  //     component: () => import("@/views/About.vue")
  //   },
  //   {
  //     path: "/users",
  //     name: "Users",
  //     component: () => import("@/views/Users.vue")
  //   }
  // ]
// });

// export default router;

const routes = [
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

export default routes;