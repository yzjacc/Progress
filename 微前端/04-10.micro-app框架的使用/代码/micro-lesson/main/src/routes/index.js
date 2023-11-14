import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue")
    },
    {
      //路由路径最好是非严格匹配
      path: "/app-vue2-demo*",
      name: "Vue2DemoPage",
      component: () => import("@/views/Vue2DemoPage.vue")
    },
    {
      //路由路径最好是非严格匹配
      path: "/app-react-demo*",
      name: "ReactDemoPage",
      component: () => import("@/views/ReactDemoPage.vue")
    },
    {
      path: "/app-vite-demo*",
      name: "ViteDemoPage",
      component: () => import("@/views/ViteDemoPage.vue")
    }
  ]
});

router.beforeEach((to, from, next) => { 
  console.log("主--->", to);
  console.log("主--->", from);

  next();
})

export default router;