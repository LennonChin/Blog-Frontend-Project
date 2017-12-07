import axios from 'axios';

// let host = 'http://shop.projectsedu.com';
let localHost = 'http://127.0.0.1:8000';

// 获取类别信息
export const getCategory = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/categorys/` + params.id + '/');
  } else {
    return axios.get(`${localHost}/categorys/`, params);
  }
};
