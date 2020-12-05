import axios from '../utils/axios';

export function addCart(params: any) {
  return axios.post('/shop-cart', params);
}

export function getCart(params: any = null) {
  return axios.get('/shop-cart', {params});
}

export function deleteCartItem(id: number) {
  return axios.delete(`/shop-cart/${id}`);
}