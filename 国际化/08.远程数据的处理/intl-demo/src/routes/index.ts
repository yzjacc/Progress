import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Trans from "@/i18n/translation"

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  // routes: [
  //   {
  //     path: '/',
  //     name: 'Home',
  //     component: HomeView
  //   },
  //   {
  //     path: '/about',
  //     name: 'About',
  //     component: ()=>import('../views/AboutView.vue')
  //   }
  // ]
  routes: [
    {
      path: "/:locale?",
      component: RouterView,
      beforeEnter:Trans.routerMiddleware,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView
        },
        {
          path: 'about',
          name: 'About',
          component: ()=>import('../views/AboutView.vue')
        },
        {
          path: 'post',
          name: 'Post',
          component: ()=>import('../views/PostView.vue')
        }
      ]
    }
  ]
})
export default router;