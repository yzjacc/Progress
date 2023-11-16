import { createRouter,createWebHistory } from 'vue-router';
import {qiankunWindow} from 'vite-plugin-qiankun/dist/helper'

const base = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/app-vite-demo' : '/';

const router = createRouter({
  history: createWebHistory(base),
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