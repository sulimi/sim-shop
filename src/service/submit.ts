import axios from '../utils/axios'

// 创建订单
export function createOrder(params: any) {
  return axios.post('/saveOrder', params);
}

// 获取订单列表
export function getOrderList(params: any) {
  return axios.get('/order', { params });
}

// 根据 id 获取订单详情
export function getOrderDetail(id: any) {
  return axios.get(`/order/${id}`);
}

// 取消订单
export function cancelOrder(id: any) {
  return axios.put(`/order/${id}/cancel`);
}

// 确认订单
export function confirmOrder(id: any) {
  return axios.put(`/order/${id}/finish`)
}

// 支付接口
export function payOrder(params: any) {
  return axios.get('/paySuccess', { params })
}