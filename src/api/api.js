import axios from 'axios';

let localHost = 'http://127.0.0.1:8000';

// 获取博主信息
export const getBloggerInfo = params => {
  return axios.get(`${localHost}/blogger/`);
};

// 获取友情链接
export const getFriendLinks = params => {
  return axios.get(`${localHost}/friendlinks/`);
};

// 获取多级类别信息
export const getCategorys = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/categorys/` + params.id + '/');
  } else {
    return axios.get(`${localHost}/categorys/`, params);
  }
};

// 获得单级类别信息
export const getCategory = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/category/` + params.id + '/');
  } else {
    return axios.get(`${localHost}/category/`, params);
  }
};

// 获取轮播图
export const getIndexBanners = params => {
  return axios.get(`${localHost}/banners/`);
};

// 获取文章
export const getArticles = params => {
  return axios.get(`${localHost}/articles/`);
};
