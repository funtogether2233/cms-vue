import type { RouteRecordRaw } from 'vue-router';
import dynamicRoutes from '@/router/home';

// 首选菜单
export let firstMenu: any = null;

// 根据菜单匹配路由
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

// 根据路径匹配菜单
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu;
      }
    }
  }
  return undefined;
}
