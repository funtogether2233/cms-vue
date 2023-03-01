import request from './request';

export function postUsersListData() {
  return request.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10
    }
  });
}
