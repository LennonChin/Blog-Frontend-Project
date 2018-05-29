import API from 'API';

import { handleError } from '../utils/handles';

export default () => {
  return {
    namespaced: true,
    state: {
      movie: {},
      needAuth: false
    },
    mutations: {
      UPDATE_MOVIE_DETAIL_INFO(state, movie) {
        state.movie = movie;
      },
      UPDATE_MOVIE_AUTH(state, isAuth) {
        state.needAuth = isAuth;
      },
      CLAER_MOVIE_DETAIL_INFO(state) {
        state.movie = {};
        state.needAuth = false;
      }
    },
    actions: {
      // 获取电影详细信息
      GET_MOVIE_DETAIL_INFO({state, commit}, params) {
        return new Promise((resolve, reject) => {
          API.getMovieDetailInfo(params).then((response) => {
            // 更新文章信息和权限信息
            commit('UPDATE_MOVIE_DETAIL_INFO', response.data);
            commit('UPDATE_MOVIE_AUTH', false);
            // 更新文章页的meta信息
            commit('UPDATE_DOCUMENT_TITLE', response.data.title, { root: true });
            commit('UPDATE_DOCUMENT_DESCRIPTION', response.data.desc, { root: true });
            commit('UPDATE_DOCUMENT_KEYWORDS', response.data.tags.map((tags) => {
              return tags.name;
            }).join(','), { root: true });
            resolve(response);
          }).catch((error) => {
            if (error.code === 401) {
              commit('UPDATE_MOVIE_AUTH', true);
            }
            handleError(error);
            reject(error);
          });
        });
      }
    }
  };
};
