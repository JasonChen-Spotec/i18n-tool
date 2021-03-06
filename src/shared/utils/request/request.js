import axios from 'axios';
import localStorage from '@/shared/utils/localStorage';
import { location } from '@/shared/services/location';
import Response from './Response';
import { errorHandler, isNotLogin, isGlobalBusinessError } from './utils';
import errorModal from './errorModal';

const request = config => axios(config);

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.baseURL = __BASE_URL__;
  config.timeout = 100000;
  config.headers.Authorization = localStorage.get('token');
  config.headers.platformType = 'WEB';
  return config;
});

// 添加响应拦截器
axios.interceptors.response.use(res => {
  const { data, config: { responseType, catchException = true } } = res;
  if (responseType === 'blob') {
    return data;
  }

  const response = new Response(data);

  if (response.isSuccess) {
    return data;
  }

  if (response.isSystemError) {
    errorModal({ title: response.message });
  }

  if (isGlobalBusinessError(response.code) && catchException) {
    errorModal({ title: response.message });
  }

  if (isNotLogin(response.code)) {
    location.push(window.__loginPath);
  }

  return Promise.reject(response);
}, resError => {
  const { errorResult } = errorHandler(resError);
  let res = resError;
  if (errorResult) {
    res = errorResult;
  }

  return Promise.reject(res);
});

export default request;
