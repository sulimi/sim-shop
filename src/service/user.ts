import axios from '../utils/axios'; // 二次封装的 axios

// 获取用户信息
export function getUserInfo() {
  return axios.get('/user/info');
}

// 登录
export function login(params: object) {
  return axios.post('/user/login', params);
}

// 登出
export function logout() {
  return axios.post('/user/logout');
}

// 注册
export function register(params: object) {
  return axios.post('/user/register', params);
}