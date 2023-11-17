const routes = {
  mode: 'history',
  routes: [
    {
      path: '/error-show',
      name: 'ErrorShow',
      component: () => import('@/pages/ErrorPage.vue'),
    },
    {
      path: '/performance-show',
      name: 'PerformanceShow',
      component: () => import('@/pages/PerformancePage.vue'),
    },
    {
      path: '/action-show',
      name: 'ActionShow',
      component: () => import('@/pages/ActionPage.vue'),
    },
    {
      path: '/behavior-show',
      name: 'BehaviorShow',
      component: () => import('@/pages/BehaviorPage.vue'),
    }
  ]
}

export default routes;