import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { LOGIN_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache';
import { firstMenu } from '@/utils/mapMenus';

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 导航守卫
router.beforeEach((to, from) => {
  // 登陆成功。进入home
  const token = localCache.getCache(LOGIN_TOKEN);
  if (to.path === '/main' && !token) {
    return '/login';
  }
  if (to.path === '/main') {
    return firstMenu?.url;
  }
});

export default router;
