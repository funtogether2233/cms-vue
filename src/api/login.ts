import request from './request';
import type { IAccount } from '@/types/index';

// 帐号登录请求
export function accountLoginRequest(account: IAccount) {
  return request.post({ url: '/login', data: account });
}

// 通过id获取user信息
export function getUserInfoById(id: number) {
  return request.get({ url: `/users/${id}` });
}

// 通过id获取用户菜单权限
export function getUserMenusByRoleId(id: number) {
  return request.get({ url: `/role/${id}/menu` });
}
