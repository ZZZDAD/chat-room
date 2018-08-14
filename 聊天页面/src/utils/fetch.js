import axios from 'axios'
import qs from 'qs'
import store from '@/store/store'

// CORS Cross-Origin Macro
const ALLOW_ORIGIN = 'Access-Control-Allow-Origin'
const ALLOW_HEADERS = 'Access-Control-Allow-Headers'
const ALLOW_METHODS = 'Access-Control-Allow-Methods'

// cors 跨域设置
axios.defaults.headers[ALLOW_ORIGIN] = 'http://127.0.0.1:8080'
axios.defaults.headers[ALLOW_HEADERS] = '*'
axios.defaults.headers[ALLOW_METHODS] = 'GET, POST'

const CONTENT_TYPE = 'Content-Type'
const X_AUTH_TOKEN = 'x-auth-token'

// axios 配置
axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = 'http://127.0.0.1:3000'

axios.defaults.headers.post[CONTENT_TYPE] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCreadentials = true

// 创建 axios
const service = axios.create()

// request拦截器(带token)
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['x-access-token'] = store.getters.token
  }
  return config
}, error => {
  console.error(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => response,
	/**
	* 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
	* 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
	*/
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     },
  error => {
    console.log('err' + error)// for debug
    // Message({
    // 	message: error.message,
    // 	type: 'error',
    // 	duration: 5 * 1000
    // })
    return Promise.reject(error)
  })

// POST 传参序列化 (拦截器)
service.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  console.log("传参发生错误");
  return Promise.reject(error)
})

export default service
