import request from './request';
import type { IAccount } from '@/types/index';

export function accountLoginRequest(account: IAccount) {
  return request.post({ url: '/login', data: account });
}

export function getUserInfoById(id: number) {
  return request.get({ url: `/users/${id}` });
}

export function getUserMenusByRoleId(id: number) {
  return request.get({ url: `/role/${id}/menu` });
}
