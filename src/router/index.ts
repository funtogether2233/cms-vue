import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/index.vue')
    }
  ]
});

// 导航守卫

export default router;
