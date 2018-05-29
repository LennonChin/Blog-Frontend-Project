import API from 'API';

import { handleError } from '../utils/handles';

export default () => {
  return {
    namespaced: true,
    state: {
      books: [],
      bookNotes: [],
      readingBooks: []
    },
    mutations: {
      UPDATE_BOOKS_INFO(state, datas) {
        datas.results.forEach((book) => {
          if (book.is_reading) {
            state.readingBooks.push(book);
          } else {
            state.books.push(book);
          }
        });
      },
      UPDATE_BOOKNOTES_INFO(state, datas) {
        state.bookNotes = datas.results;
      },
      CLAER_BOOKS_BASE_INFO(state) {
        console.log('clear books');
        state.books = [];
        state.readingBooks = [];
      },
      CLAER_BOOKNOTES_BASE_INFO(state) {
        console.log('clear bookNotes');
        state.bookNotes = [];
      }
    },
    actions: {
      // 获取图书列表信息
      GET_BOOKS_BASE_INFO({state, commit}, {params, reset}) {
        return new Promise((resolve, reject) => {
          API.getBookBaseInfo(params).then((response) => {
            // 更新图书
            if (reset) {
              // 如果是重置，则先删除原有数据
              commit('CLAER_BOOKS_BASE_INFO');
            }
            commit('UPDATE_BOOKS_INFO', response.data);
            commit('UPDATE_DOCUMENT_TITLE', '阅读列表', { root: true });
            commit('UPDATE_DOCUMENT_DESCRIPTION', '阅读列表', { root: true });
            commit('UPDATE_DOCUMENT_KEYWORDS', '阅读列表', { root: true });
            resolve(response);
          }).catch((error) => {
            handleError(error);
            reject(error);
          });
        });
      },
      // 获取阅读笔记列表信息
      GET_BOOKNOTES_BASE_INFO({state, commit}, {params, reset}) {
        return new Promise((resolve, reject) => {
          API.getBookNoteBaseInfo(params).then((response) => {
            // 更新阅读笔记
            if (reset) {
              // 如果是重置，则先删除原有数据
              commit('CLAER_BOOKNOTES_BASE_INFO');
            }
            commit('UPDATE_BOOKNOTES_INFO', response.data);
            commit('UPDATE_DOCUMENT_TITLE', '阅读列表', { root: true });
            commit('UPDATE_DOCUMENT_DESCRIPTION', '阅读列表', { root: true });
            commit('UPDATE_DOCUMENT_KEYWORDS', '阅读列表', { root: true });
            resolve(response);
          }).catch((error) => {
            handleError(error);
            reject(error);
          });
        });
      }
    }
  };
};
