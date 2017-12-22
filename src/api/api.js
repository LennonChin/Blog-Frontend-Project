import axios from 'axios';

let localHost = 'http://169.254.178.54:8000';

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

export const getTags = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/tags/` + params.id + '/');
  } else {
    return axios.get(`${localHost}/tags/`, params);
  }
};

// 获取轮播图
export const getIndexBanners = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/banners/` + params.id + '/');
  } else {
    return axios.get(`${localHost}/banners/`, params);
  }
};

// 获取文章基本信息
export const getArticleBaseInfo = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/articleBaseInfos/${params.id}/`);
  } else {
    return axios.get(`${localHost}/articleBaseInfos/`, params);
  }
};

// 获取文章详细信息
export const getArticleDetailInfo = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/articleDetailInfos/` + params.id + '/');
  } else {
    return axios.get(`${localHost}/articleDetailInfos/`, params);
  }
};

// 获取图集基本信息
export const getAlbumBaseInfo = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/albumBaseInfos/${params.id}/`);
  } else {
    return axios.get(`${localHost}/albumBaseInfos/`, params);
  }
};

// 获取图集详细信息
export const getAlbumDetailInfo = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/albumDetailInfos/` + params.id + '/');
  } else {
    return axios.get(`${localHost}/albumDetailInfos/`, params);
  }
};

// 获取电影基本信息
export const getMovieBaseInfo = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/movieBaseInfos/${params.id}/`);
  } else {
    return axios.get(`${localHost}/movieBaseInfos/`, params);
  }
};

// 获取电影详细信息
export const getMovieDetailInfo = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/movieDetailInfos/` + params.id + '/');
  } else {
    return axios.get(`${localHost}/movieDetailInfos/`, params);
  }
};
