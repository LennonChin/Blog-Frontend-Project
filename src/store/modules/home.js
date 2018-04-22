import API from 'API';

import {handleError} from '../utils/handles';

export default {
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
    updateTopLevelCategoiesInfo(state, categoryInfos) {
      state.topLevelCategoriesInfo = categoryInfos;
    },
    updateArticlesBaseInfo(state, articles) {
      state.articles = articles;
    },
    updateBooksBaseInfo(state, books) {
      state.books = books;
    },
    updateBookNotesBaseInfo(state, bookNotes) {
      state.bookNotes = bookNotes;
    },
    updateAlbumsBaseInfo(state, albums) {
      state.albums = albums;
    },
    updateMoviesBaseInfo(state, movies) {
      state.movies = movies;
    }
  },
  actions: {
    // 获取部分单级分类，不包括子级分类
    getTopLevelCategoriesInfo({state, commit}, params) {
      return API.getCategory(params).then((response) => {
        commit('updateTopLevelCategoiesInfo', response.data.results);
      }).catch((error) => {
        handleError(error);
      });
    },
    // 获取文章基本信息
    getArticlesBaseInfo({state, commit}, params) {
      return API.getArticleBaseInfo(params).then((response) => {
        commit('updateArticlesBaseInfo', response.data.results);
      }).catch((error) => {
        handleError(error);
      });
    },
    // 获取图书基本信息
    getBooksBaseInfo({state, commit}, params) {
      return API.getBookBaseInfo(params).then((response) => {
        commit('updateBooksBaseInfo', response.data.results);
      }).catch((error) => {
        handleError(error);
      });
    },
    // 获取图书笔记基本信息
    getBookNotesBaseInfo({state, commit}, params) {
      return API.getBookNoteBaseInfo(params).then((response) => {
        commit('updateBookNotesBaseInfo', response.data.results);
      }).catch((error) => {
        handleError(error);
      });
    },
    // 获取图集基本信息
    getAlbumsBaseInfo({state, commit}, params) {
      return API.getAlbumBaseInfo(params).then((response) => {
        commit('updateAlbumsBaseInfo', response.data.results);
      }).catch((error) => {
        handleError(error);
      });
    },
    // 获取电影基本信息
    getMoviesBaseInfo({state, commit}, params) {
      return API.getMovieBaseInfo(params).then((response) => {
        commit('updateMoviesBaseInfo', response.data.results);
      }).catch((error) => {
        handleError(error);
      });
    }
  }
};
