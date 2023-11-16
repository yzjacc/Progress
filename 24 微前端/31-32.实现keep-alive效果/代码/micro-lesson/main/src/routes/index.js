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
    {
      path: "/404",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue")
    },
    {
      path:"*",
      beforeEnter:(to,from,next)=>{
        if(to.path.startsWith('/app')){
          //如果路由以/app开头，说明是子应用，放行
          next();
        }
        else{
          next({path:'/404'})
        }
      }
    }
  ]
})

export default router;