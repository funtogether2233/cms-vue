import { defineStore } from 'pinia';
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/api/login';
import { LOGIN_TOKEN, LOGIN_STATE } from '@/global/constants';
import router from '@/router';
import type { IAccount } from '@/types/index';
import { localCache } from '@/utils/cache';
import { mapMenusToRoutes } from '@/utils/mapMenus';

interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any;
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    // 默认刷新加载本地数据
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN);
      const userInfo = localCache.getCache(LOGIN_STATE.userInfo);
      const userMenus = localCache.getCache(LOGIN_STATE.userMenus);
      if (token && userInfo && userMenus) {
        this.token = token;
        this.userInfo = userInfo;
        this.userMenus = userMenus;

        // 动态路由加载
        const routes = mapMenusToRoutes(this.userMenus);
        for (const route of routes) {
          router.addRoute('main', route);
        }
      }
    },

    // 帐号登录
    async accountLoginAction(account: IAccount) {
      // 帐号登录，获取token等信息，并本地缓存
      const loginResult = await accountLoginRequest(account);
      const id = loginResult.data.id;
      this.token = loginResult.data.token;
      localCache.setCache(LOGIN_TOKEN, this.token);

      // 获取登录用户的详细信息，并本地缓存
      const userInfoResult = await getUserInfoById(id);
      this.userInfo = userInfoResult.data;
      localCache.setCache(LOGIN_STATE.userInfo, this.userInfo);

      // 获取用户权限，并本地缓存
      const userMenusResult = await getUserMenusByRoleId(id);
      this.userMenus = userMenusResult.data;
      localCache.setCache(LOGIN_STATE.userMenus, this.userMenus);

      // 动态添加路由
      const routes = mapMenusToRoutes(this.userMenus);
      for (const route of routes) {
        router.addRoute('main', route);
      }

      // 页面跳转
      router.push('/main');
    }
  }
});

export default useLoginStore;
