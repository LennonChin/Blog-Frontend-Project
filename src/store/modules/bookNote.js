import API from 'API';

import { handleError } from '../utils/handles';

export default () => {
  return {
    namespaced: true,
    state: {
      bookNote: {},
      needAuth: false,
      languages: []
    },
    mutations: {
      UPDATE_BOOKNOTE_DETAIL_INFO(state, bookNote) {
        state.bookNote = bookNote;
        state.languages = Array.from(new Set(bookNote.details.map(detail => detail.language)));
      },
      UPDATE_BOOK_DOUBAN_INFO(state, bookDoubanInfo) {
        state.bookDoubanInfo = bookDoubanInfo;
      },
      UPDATE_BOOKNOTE_AUTH(state, isAuth) {
        state.needAuth = isAuth;
      },
      CLAER_BOOKNOTE_DETAIL_INFO(state) {
        state.bookNote = {};
        state.needAuth = false;
      }
    },
    actions: {
      // 获取文章详细信息
      GET_BOOKNOTE_DETAIL_INFO({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          API.getBookNoteDetailInfo(params).then((response) => {
            // 更新图书笔记信息和权限信息
            commit('UPDATE_BOOKNOTE_DETAIL_INFO', response.data);
            commit('UPDATE_BOOKNOTE_AUTH', false);
            // 更新图书页的meta信息
            commit('UPDATE_DOCUMENT_TITLE', response.data.title, { root: true });
            commit('UPDATE_DOCUMENT_DESCRIPTION', response.data.desc, { root: true });
            commit('UPDATE_DOCUMENT_KEYWORDS', response.data.tags.map((tags) => {
              return tags.name;
            }).join(','), { root: true });
            resolve(response);
          }).catch((error) => {
            if (error.code === 401) {
              commit('UPDATE_BOOKNOTE_AUTH', true);
            }
            handleError(error);
            reject(error);
          });
        });
      }
    }
  };
};
