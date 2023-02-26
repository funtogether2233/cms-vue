const HomeComponent = () => import('@/views/home/index.vue');
const LoginComponent = () => import('@/views/login/index.vue');
const NotFoundComponent = () => import('@/views/not-found/index.vue');

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
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
