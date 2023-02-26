import { defineStore } from 'pinia';
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/api/login';
import { LOGIN_TOKEN } from '@/global/constants';
import router from '@/router';
import type { IAccount } from '@/types/index';
import { localCache } from '@/utils/cache';

interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any;
}

const LOGIN_STATE = {
  userInfo: 'userInfo',
  userMenus: 'userMenus'
};

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(LOGIN_STATE.userInfo) ?? {},
    userMenus: localCache.getCache(LOGIN_STATE.userMenus) ?? []
  }),
  actions: {
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

      // 页面跳转
      router.push('/home');
    }
  }
});

export default useLoginStore;
