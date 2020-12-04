import axios from '../utils/axios'

export function addCart(params: any) {
  return axios.post('/shop-cart', params);
}