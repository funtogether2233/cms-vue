import type { RouteRecordRaw } from 'vue-router';

const HomeComponent = () => import('@/views/home/index.vue');
const LoginComponent = () => import('@/views/login/index.vue');
const NotFoundComponent = () => import('@/views/not-found/index.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'main'
  },
  {
    path: '/main',
    name: 'main',
    component: HomeComponent
  },
  {
    path: '/login',
    component: LoginComponent
  },
  {
    path: '/:pathMatch(.*)',
    component: NotFoundComponent
  }
];

export default routes;
