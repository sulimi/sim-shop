import axios from '../utils/axios'

export function getCategory() {
  return axios.get('/categories');
}

export function search(params: any) {
  return axios.get('/search', { params });
}