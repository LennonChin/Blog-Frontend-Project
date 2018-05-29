import API from 'API';

import {handleError} from '../utils/handles';

export default () => {
  return {
    namespaced: true,
    state: {
      topLevelCategoriesInfo: [],
      articles: [],
      books: [],
      bookNotes: [],
      albums: [],
      movies: []
    },
    mutations: {
      UPDATE_TOP_LEVEL_CATEGORIES_INFO(state, categoryInfos) {
        state.topLevelCategoriesInfo = categoryInfos;
      },
      UPDATE_ARTICLES_BASE_INFO(state, articles) {
        state.articles = articles;
      },
      UPDATE_BOOKS_BASE_INFO(state, books) {
        state.books = books;
      },
      UPDATE_BOOKNOTES_BASE_INFO(state, bookNotes) {
        state.bookNotes = bookNotes;
      },
      UPDATE_ALBUMS_BASE_INFO(state, albums) {
        state.albums = albums;
      },
      UPDATE_MOVIES_BASE_INFO(state, movies) {
        state.movies = movies;
      }
    },
    actions: {
      // 更新首页的meta信息
      UPDATE_HOME_META({state, commit, rootState}) {
        commit('UPDATE_DOCUMENT_TITLE', '首页', {root: true});
        commit('UPDATE_DOCUMENT_DESCRIPTION', rootState.base.siteInfo.desc, {root: true});
        commit('UPDATE_DOCUMENT_KEYWORDS', rootState.base.siteInfo.keywords, {root: true});
      },
      // 获取部分单级分类，不包括子级分类
      GET_TOP_LEVEL_CATEGORIES_INFO({state, commit, rootState}, params) {
        return new Promise((resolve, reject) => {
          API.getCategory(params).then((response) => {
            commit('UPDATE_TOP_LEVEL_CATEGORIES_INFO', response.data.results);
            resolve(response);
          }).catch((error) => {
            handleError(error);
            reject(error);
          });
        });
      },
      // 获取文章基本信息
      GET_ARTICLES_BASE_INFO({state, commit}, params) {
        return new Promise((resolve, reject) => {
          API.getArticleBaseInfo(params).then((response) => {
            commit('UPDATE_ARTICLES_BASE_INFO', response.data.results);
            resolve(response);
          }).catch((error) => {
            handleError(error);
            reject(error);
          });
        });
      },
      // 获取图书基本信息
      GET_BOOKS_BASE_INFO({state, commit}, params) {
        return new Promise((resolve, reject) => {
          API.getBookBaseInfo(params).then((response) => {
            commit('UPDATE_BOOKS_BASE_INFO', response.data.results);
            resolve(response);
          }).catch((error) => {
            handleError(error);
            reject(error);
          });
        });
      },
      // 获取图书笔记基本信息
      GET_BOOKNOTES_BASE_INFO({state, commit}, params) {
        return new Promise((resolve, reject) => {
          API.getBookNoteBaseInfo(params).then((response) => {
            commit('UPDATE_BOOKNOTES_BASE_INFO', response.data.results);
            resolve(response);
          }).catch((error) => {
            handleError(error);
            reject(error);
          });
        });
      },
      // 获取图集基本信息
      GET_ALBUMS_BASE_INFO({state, commit}, params) {
        return new Promise((resolve, reject) => {
          API.getAlbumBaseInfo(params).then((response) => {
            commit('UPDATE_ALBUMS_BASE_INFO', response.data.results);
            resolve(response);
          }).catch((error) => {
            handleError(error);
            reject(error);
          });
        });
      },
      // 获取电影基本信息
      GET_MOVIES_BASE_INFO({state, commit}, params) {
        return new Promise((resolve, reject) => {
          API.getMovieBaseInfo(params).then((response) => {
            commit('UPDATE_MOVIES_BASE_INFO', response.data.results);
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
