import { defineStore } from 'pinia';
import { accountLoginRequest } from '@/api/login';
import { LOGIN_TOKEN } from '@/global/constants';
import router from '@/router';
import type { IAccount } from '@/types/index';
import { localCache } from '@/utils/cache';

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    name: ''
  }),
  actions: {
    // 帐号登录
    async accountLoginAction(account: IAccount) {
      // 帐号登录，获取token等信息
      const loginResult = await accountLoginRequest(account);
      this.id = loginResult.data.id;
      this.token = loginResult.data.token;
      this.name = loginResult.data.name;

      // 本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);

      // 页面跳转
      router.push('/home');
    }
  }
});

export default useLoginStore;
