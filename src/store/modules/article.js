import API from 'API';

import { handleError } from '../utils/handles';

export default {
  namespaced: true,
  state: {
    article: {},
    browse_auth: undefined,
    need_auth: false
  },
  mutations: {
    UPDATE_ARTICLE_DETAIL_INFO(state, article) {
      state.article = article;
    },
    UPDATE_ARTICLE_AUTH(state, isAuth) {
      state.need_auth = isAuth;
    },
    CLAER_ARICLE_DETAIL_INFO(state) {
      state.article = {};
      state.browse_auth = undefined;
      state.need_auth = false;
    }
  },
  actions: {
    // 获取文章详细信息
    GET_ARTICLE_DETAIL_INFO({state, commit}, params) {
      return new Promise((resolve, reject) => {
        API.getArticleDetailInfo(params).then((response) => {
          commit('UPDATE_ARTICLE_DETAIL_INFO', response.data);
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
