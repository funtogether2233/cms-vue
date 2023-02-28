import type { RouteRecordRaw } from 'vue-router';
import dynamicRoutes from '@/router/home';

export let firstMenu: any = null;

export function mapMenusToRoutes(userMenus: any[]) {
  const routes: RouteRecordRaw[] = [];
  // 根据菜单匹配路由
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = dynamicRoutes.find((item) => item.path === submenu.url);
      if (route) {
        routes.push(route);
      }
      if (!firstMenu && route) {
        firstMenu = submenu;
      }
    }
  }
  return routes;
}
