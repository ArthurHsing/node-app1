import axios from 'axios';
import { Message, Loading } from 'element-ui';
import router from '../router'
let loading;
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}
// 请求拦截
axios.interceptors.request.use(config => {
  startLoading();
  return config;
}, error => {
  return Promise.reject(error);
});
// 响应拦截
axios.interceptors.response.use(response => {
  endLoading();
  const { code, message } = response.data;
  if (code === 0) {
    Message.error(`${message}`);
    return Promise.reject();
  } else {
    // 结束动画
    return response;
  }
}, error => {
  endLoading();
  const { status, statusText } = error.response;
  Message.error(`${status}：${statusText}`);
  if (status === 401) {
    Message.error('token无效，请重新登录！');
    localStorage.removeItem('eleToken');
    router.push('/login');
  }
  return Promise.reject(error);
});
export default axios;