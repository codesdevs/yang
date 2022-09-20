import axios from 'axios'
import { Notify } from 'vant';

const baseURL = 'https://cat-match.easygame2021.com/sheep/v1';
const request = axios.create({
  timeout: 1000 * 1000000,
  withCredentials: true,
  baseURL
});


request.interceptors.response.use(
  response => {
    if (response.data.code) {
      return Promise.reject(response.data);
    }
    return response.data;
  },
  error => {
    if (error.response) {
      Notify({ type: 'danger', message: '请求不成功，请联系后台管理员' });
    }
    return Promise.reject(error);
  }
);


const { get, post, put } = request;

export { get, post, put };