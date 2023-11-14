import { createRouter,createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:"/",
      alias:"/index*",
      name:"Home",
      component:()=>import("@/views/Home.vue")
    },
    {
      path:"/about",
      name:"About",
      component:()=>import("@/views/About.vue")
    },
    {
      path:"/info",
      name:"Info",
      component:()=>import("@/views/Info.vue")
    },
  ]
})

export default router;