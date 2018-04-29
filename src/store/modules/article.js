import API from 'API';

import { handleError } from '../utils/handles';

export default {
  namespaced: true,
  state: {
    article: {},
    browseAuth: undefined,
    needAuth: false
  },
  getters: {
    DOCUMENT_TITLE: state => {
      return Object.keys(state.article).length > 0 ? state.article.title : '文章详情';
    }
  },
  mutations: {
    UPDATE_ARTICLE_DETAIL_INFO(state, article) {
      state.article = article;
    },
    UPDATE_ARTICLE_AUTH(state, isAuth) {
      state.needAuth = isAuth;
    },
    CLAER_ARICLE_DETAIL_INFO(state) {
      state.article = {};
      state.browseAuth = undefined;
      state.needAuth = false;
    }
  },
  actions: {
    // 获取文章详细信息
    GET_ARTICLE_DETAIL_INFO({state, commit}, params) {
      return new Promise((resolve, reject) => {
        API.getArticleDetailInfo(params).then((response) => {
          commit('UPDATE_ARTICLE_DETAIL_INFO', response.data);
          commit('UPDATE_ARTICLE_AUTH', false);
          resolve(response);
        }).catch((error) => {
          if (error.code === 401) {
            commit('UPDATE_ARTICLE_AUTH', true);
          }
          handleError(error);
          reject(error);
        });
      });
    }
  }
};
