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
        // 为route上层菜单路由由进行重定向，仅进行一次
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route });
        }

        // route菜单路由
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

interface IBreadcrumbs {
  name: string;
  path: string;
}

// 根据路径获取面包屑层级
export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = [];
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url });
        breadcrumbs.push({ name: submenu.name, path: submenu.url });
      }
    }
  }
  return breadcrumbs;
}
