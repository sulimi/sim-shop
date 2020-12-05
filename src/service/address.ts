import axios from '../utils/axios'

export function addAddress(params: any) {
  return axios.post('/address', params);
}

export function EditAddress(params: any) {
  return axios.put('/address', params);
}

export function DeleteAddress(id: number) {
  return axios.delete(`/address/${id}`);
}

export function getDefaultAddress() {
  return axios.get('/address/default');
}

export function getAddressList() {
  return axios.get('/address', { pageNumber: 1, pageSize: 1000 } as any)
}

export function getAddressDetail(id: number) {
  return axios.get(`/address/${id}`)
}