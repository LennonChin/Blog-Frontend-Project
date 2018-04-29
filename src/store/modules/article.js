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
          handleError(error);
          reject(error);
        });
      });
    }
  }
};
