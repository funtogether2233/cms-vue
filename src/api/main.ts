import request from './request';

export function getEntireRoles() {
  return request.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return request.post({
    url: '/department/list'
  })
}
