import API from 'API';

import { handleError } from '../utils/handles';

export default () => {
  return {
    namespaced: true,
    state: {
      article: {},
      needAuth: false,
      languages: []
    },
    mutations: {
      UPDATE_ARTICLE_DETAIL_INFO(state, article) {
        state.article = article;
        state.languages = Array.from(new Set(article.details.map(detail => detail.language)));
      },
      UPDATE_ARTICLE_AUTH(state, isAuth) {
        state.needAuth = isAuth;
      },
      CLAER_ARTICLE_DETAIL_INFO(state) {
        state.article = {};
        state.needAuth = false;
      }
    },
    actions: {
      // 获取文章详细信息
      GET_ARTICLE_DETAIL_INFO({state, commit}, params) {
        return new Promise((resolve, reject) => {
          API.getArticleDetailInfo(params).then((response) => {
            // 更新文章信息和权限信息
            commit('UPDATE_ARTICLE_DETAIL_INFO', response.data);
            commit('UPDATE_ARTICLE_AUTH', false);
            // 更新文章页的meta信息
            commit('UPDATE_DOCUMENT_TITLE', response.data.title, { root: true });
            commit('UPDATE_DOCUMENT_DESCRIPTION', response.data.desc, { root: true });
            commit('UPDATE_DOCUMENT_KEYWORDS', response.data.tags.map((tags) => {
              return tags.name;
            }).join(','), { root: true });
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
};
