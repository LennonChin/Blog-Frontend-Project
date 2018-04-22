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
    updateArticleDetailInfo(state, article) {
      state.article = article;
    }
  },
  actions: {
    // 获取文章详细信息
    getArticleDetailInfo({state, commit}, params) {
      return API.getArticleDetailInfo(params).then((response) => {
        commit('updateArticleDetailInfo', response.data);
      }).catch((error) => {
        handleError(error);
      });
    }
  }
};
