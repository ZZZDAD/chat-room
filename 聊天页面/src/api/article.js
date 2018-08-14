import fetch from '@/utils/fetch'

// 登录
export function login (params) {
  return fetch.post('/user/login', params)  // username password
}

// 注册
export function register (params) {
  return fetch.post('/user/register', params)  // username password
}

// 用户列表
export function all_user () {
  return fetch.get('/user/all_user')
}

// 查看信息
export function find_message (params) {
  return fetch.post('/chat/find_message', params)  // to
}

// 查看信息
export function message_from_one (params) {
  return fetch.post('/chat/message_from_one', params)  // to from
}
