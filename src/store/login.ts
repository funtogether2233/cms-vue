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

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {},
    userMenus: {}
  }),
  actions: {
    // 帐号登录
    async accountLoginAction(account: IAccount) {
      // 帐号登录，获取token等信息
      const loginResult = await accountLoginRequest(account);
      const id = loginResult.data.id;
      const name = loginResult.data.name;
      this.token = loginResult.data.token;

      // 本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);

      // 获取登录用户的详细信息
      const userInfoResult = await getUserInfoById(id);
      this.userInfo = userInfoResult.data;

      // 获取用户权限
      const userMenuResult = await getUserMenusByRoleId(id);
      console.log(userMenuResult.data);

      // 页面跳转
      router.push('/home');
    }
  }
});

export default useLoginStore;
