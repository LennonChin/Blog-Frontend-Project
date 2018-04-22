import axios from 'axios';
import {createError} from './utils';

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/' : 'http://localhost:8000/api/'
});

// http request 拦截器
axios.interceptors.request.use(
  config => {
    console.log(`request url is ${config.url}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(response => {
      if (!response.data) {
        return reject(createError(400, 'no data'));
      }
      resolve(response);
    }).catch(error => {
      const response = error.response;
      if (response.status === 401) {
        reject(createError(401, 'need auth'));
      }
    });
  });
};

export default {
  // 获取站点信息
  getSiteInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/siteInfo/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/siteInfo/`, params));
    }
  },

  // 获取博主信息
  getBloggerInfo(params) {
    return handleRequest(request.get(`/blogger/`));
  },

  // 获取友情链接
  getFriendLinks(params) {
    return handleRequest(request.get(`/friendlinks/`));
  },

  // 获取多级类别信息
  getCategorys(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/categorys/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/categorys/`, params));
    }
  },

  // 获得单级类别信息
  getCategory(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/category/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/category/`, params));
    }
  },

  // 获取标签
  getTags(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/tags/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/tags/`, params));
    }
  },

  // 获取轮播图
  getIndexBanners(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/banners/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/banners/`, params));
    }
  },

  // 获取文章基本信息
  getArticleBaseInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/articleBaseInfos/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/articleBaseInfos/`, params));
    }
  },

  // 获取文章详细信息
  getArticleDetailInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/articleDetailInfos/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/articleDetailInfos/`, params));
    }
  },

  // 获取图集基本信息
  getAlbumBaseInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/albumBaseInfos/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/albumBaseInfos/`, params));
    }
  },

  // 获取图集详细信息
  getAlbumDetailInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/albumDetailInfos/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/albumDetailInfos/`, params));
    }
  },

  // 获取电影基本信息
  getMovieBaseInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/movieBaseInfos/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/movieBaseInfos/`, params));
    }
  },

  // 获取电影详细信息
  getMovieDetailInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/movieDetailInfos/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/movieDetailInfos/`, params));
    }
  },

  // 获取图书基本信息
  getBookBaseInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/bookBaseInfos/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/bookBaseInfos/`, params));
    }
  },

  // 获取图书详细信息
  getBookDetailInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/bookDetailInfos/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/bookDetailInfos/`, params));
    }
  },

  // 获取图书笔记基本信息
  getBookNoteBaseInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/bookNoteBaseInfos/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/bookNoteBaseInfos/`, params));
    }
  },

  // 获取图书笔记详细信息
  getBookNoteDetailInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/bookNoteDetailInfos/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/bookNoteDetailInfos/`, params));
    }
  },

  // 获取时间轴信息
  getPostBaseInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/postBaseInfos/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/postBaseInfos/`, params));
    }
  },

  // 获取评论信息
  getCommentInfo(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/comments/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/comments/`, params));
    }
  },

  // 创建评论
  addCommentInfo(params) {
    return axios.post(`/comments/`, params);
  },

  // 获取上传Token
  getUploadToken(params) {
    return axios.post(`/qiniuToken/`, params);
  },

  // 上传评论图片
  uploadImage(params) {
    return axios.post(`http://upload.qiniup.com`, params, {headers: {'Content-Type': 'multipart/form-data'}});
  },

  // 点赞文章
  addPostLike(params) {
    return axios.post(`/likePost/`, params);
  },

  // 点赞文章
  likeOrUnlikeComment(params) {
    return axios.post(`/likeOrUnlikeComment/`, params);
  },

  // 获取邮箱验证码
  getEmailCode(params) {
    return axios.post(`/emailCode/`, params);
  },

  // 验证邮箱验证码
  verifyEmailCode(params) {
    if ('id' in params) {
      return handleRequest(request.get(`/emailCode/${params.id}/`, params));
    } else {
      return handleRequest(request.get(`/emailCode/`, params));
    }
  },

  // 搜索
  search(params) {
    return handleRequest(request.get(`/search/`, params));
  },

  // 豆瓣API
  getDoubanInfo(params) {
    if ('type' in params && 'id' in params) {
      return handleRequest(request.get(`/api/${params.type}/${params.id}/`, params));
    }
  }
};
