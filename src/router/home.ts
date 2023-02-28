import type { RouteRecordRaw } from 'vue-router';

// 系统总览
// 核心技术，商品统计
const overviewComponent = () =>
  import('@/views/home/analysis/overview/index.vue');
const dashboardComponent = () =>
  import('@/views/home/analysis/dashboard/index.vue');

// 系统管理
// 用户管理，部门管理，菜单管理，角色管理
const userComponent = () => import('@/views/home/system/user/index.vue');
const departmentComponent = () =>
  import('@/views/home/system/department/index.vue');
const menuComponent = () => import('@/views/home/system/menu/index.vue');
const roleComponent = () => import('@/views/home/system/role/index.vue');

// 商品中心
// 商品类别，商品信息
const categoryComponent = () =>
  import('@/views/home/product/category/index.vue');
const goodsComponent = () => import('@/views/home/product/goods/index.vue');

// 随便聊聊
// 你的故事，故事列表
const chatComponent = () => import('@/views/home/story/chat/index.vue');
const listComponent = () => import('@/views/home/story/list/index.vue');

const routes: RouteRecordRaw[] = [
  // 核心技术，商品统计
  {
    path: '/main/analysis/overview',
    name: 'overview',
    component: overviewComponent
  },
  {
    path: '/main/analysis/dashboard',
    name: 'dashboard',
    component: dashboardComponent
  },

  // 用户管理，部门管理，菜单管理，角色管理
  {
    path: '/main/system/user',
    name: 'user',
    component: userComponent
  },
  {
    path: '/main/system/department',
    name: 'department',
    component: departmentComponent
  },
  {
    path: '/main/system/menu',
    name: 'menu',
    component: menuComponent
  },
  {
    path: '/main/system/role',
    name: 'role',
    component: roleComponent
  },

  // 商品类别，商品信息
  {
    path: '/main/product/category',
    name: 'category',
    component: categoryComponent
  },
  {
    path: '/main/product/goods',
    name: 'goods',
    component: goodsComponent
  },

  // 你的故事，故事列表
  {
    path: '/main/story/chat',
    name: 'chat',
    component: chatComponent
  },
  {
    path: '/main/story/list',
    name: 'list',
    component: listComponent
  }
];

export default routes;
