import axios from '../utils/axios'

export function getHome(params: any) {
  return axios.get('/index-infos');
}