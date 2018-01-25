import axios from '@/axios';

// 自由API
let localHost = 'http://169.254.120.94:8000/api';

// 豆瓣Api
// let doubanHost = 'https://api.douban.com/v2';

// 获取站点信息
export const getSiteInfo = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/siteInfo/` + params.id + '/', params);
  } else {
    return axios.get(`${localHost}/siteInfo/`, params);
  }
};

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
    return axios.get(`${localHost}/articleDetailInfos/` + params.id + '/', params);
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
    return axios.get(`${localHost}/albumDetailInfos/` + params.id + '/', params);
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
    return axios.get(`${localHost}/movieDetailInfos/` + params.id + '/', params);
  } else {
    return axios.get(`${localHost}/movieDetailInfos/`, params);
  }
};

// 获取时间轴信息
export const getPostBaseInfo = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/postBaseInfos/` + params.id + '/');
  } else {
    return axios.get(`${localHost}/postBaseInfos/`, params);
  }
};

// 获取评论信息
export const getCommentInfo = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/comments/` + params.id + '/');
  } else {
    return axios.get(`${localHost}/comments/`, params);
  }
};

// 创建评论
export const addCommentInfo = params => {
  return axios.post(`${localHost}/comments/`, params);
};

// 获取上传Token
export const getUploadToken = params => {
  return axios.post(`${localHost}/qiniuToken/`, params);
};

// 上传评论图片
export const uploadImage = params => {
  return axios.post(`http://upload.qiniup.com`, params, {headers: {'Content-Type': 'multipart/form-data'}});
};

// 点赞文章
export const addPostLike = params => {
  return axios.post(`${localHost}/likePost/`, params);
};

// 点赞文章
export const likeOrUnlikeComment = params => {
  return axios.post(`${localHost}/likeOrUnlikeComment/`, params);
};

// 获取邮箱验证码
export const getEmailCode = params => {
  return axios.post(`${localHost}/emailCode/`, params);
};

// 验证邮箱验证码
export const verifyEmailCode = params => {
  if ('id' in params) {
    return axios.get(`${localHost}/emailCode/` + params.id + '/');
  } else {
    return axios.get(`${localHost}/emailCode/`, params);
  }
};

// 豆瓣API
export const getDoubanBookInfo = params => {
  if ('type' in params && 'id' in params) {
    return axios.get(`/api/` + params.type + '/' + params.id);
  }
};
