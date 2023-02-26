import { defineStore } from 'pinia';
import { accountLoginRequest } from '@/api/login';
import type { IAccount } from '@/types/index';
import { localCache } from '@/utils/cache';

const LOGIN_TOKEN = 'login/token';

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    name: ''
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 帐号登录，获取token等信息
      const loginResult = await accountLoginRequest(account);
      console.log(loginResult);
      this.id = loginResult.data.id;
      this.token = loginResult.data.token;
      this.name = loginResult.data.name;

      // 本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);
    }
  }
});

export default useLoginStore;
