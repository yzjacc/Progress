const routes = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Page1',
      component: () => import('@/views/Page1.vue')
    },
    {
      path: '/page2',
      name: 'Page2',
      component: () => import('@/views/Page2.vue')
    },
    {
      path: '/page3',
      name: 'Page3',
      component: () => import('@/views/Page3.vue')
    },
    {
      path: '/page4',
      name: 'Page4',
      component: () => import('@/views/Page4.vue')
    }
  ]
}

export default routes