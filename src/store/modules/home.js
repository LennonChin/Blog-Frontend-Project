import API from 'API';

import {handleError} from '../utils/handles';

export default {
  namespaced: true,
  state: {
    topLevelCategoriesInfo: [],
    articles: [],
    books: []
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
    }
  },
  actions: {
    // 获取部分单级分类，不包括子级分类
    getTopLevelCategoriesInfo(store, params) {
      return API.getCategory({ params }).then((response) => {
        store.commit('updateTopLevelCategoiesInfo', response.data.results);
      }).catch((error) => {
        console.log(error);
      });
    },
    // 获取文章基本信息
    getArticlesBaseInfo(store, params) {
      return API.getArticleBaseInfo({params}).then((response) => {
        store.commit('updateArticlesBaseInfo', response.data.results);
      }).catch((error) => {
        handleError(error);
      });
    },
    // 获取图书基本信息
    getBooksBaseInfo(store, params) {
      return API.getBookBaseInfo({ params }).then((response) => {
        store.commit('updateBooksBaseInfo', response.data.results);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
};
