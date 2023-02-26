import request from './request';
import type { IAccount } from '@/types/index';

export function accountLoginRequest(account: IAccount) {
  return request.post({ url: '/login', data: account });
}
