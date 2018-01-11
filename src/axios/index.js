import axios from 'axios';

// http response 拦截器
axios.interceptors.response.use(
  undefined,
  error => {
    let res = error.response;
    switch (res.status) {
      case 401:
        console.log('授权失败');
        break;
      case 403:
        console.log('您没有该操作权限');
        break;
      case 500:
        console.log('服务器错误');
    }
    return Promise.reject(error.response);
  });

export default axios;
