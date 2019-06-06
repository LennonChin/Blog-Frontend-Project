import API from 'API';

import { handleError } from '../utils/handles';

const formatContent = (content) => {
  return content.replace(/\n/g, '<br />');
};

const formatBookInfo = (book) => {
  let bookInfo = {};
  bookInfo.title = book.title;
  bookInfo.images = book.images;
  bookInfo.author = book.author;
  bookInfo.author_intro = formatContent(book.author_intro);
  bookInfo.publisher = book.publisher;
  bookInfo.publish_date = book.pubdate;
  bookInfo.pages = book.pages;
  bookInfo.summary = formatContent(book.summary);
  bookInfo.catalog = formatContent(book.catalog);
  bookInfo.tags = book.tags;
  bookInfo.rating = book.rating;
  return bookInfo;
};

export default () => {
  return {
    namespaced: true,
    state: {
      book: {},
      bookDoubanInfo: {},
      needAuth: false
    },
    mutations: {
      UPDATE_BOOK_DETAIL_INFO(state, book) {
        state.book = book;
      },
      UPDATE_BOOK_DOUBAN_INFO(state, bookDoubanInfo) {
        state.bookDoubanInfo = bookDoubanInfo;
      },
      UPDATE_BOOK_AUTH(state, isAuth) {
        state.needAuth = isAuth;
      },
      CLAER_BOOK_DETAIL_INFO(state) {
        state.book = {};
        state.bookDoubanInfo = {};
        state.needAuth = false;
      }
    },
    actions: {
      // 获取文章详细信息
      GET_BOOK_DETAIL_INFO({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          API.getBookDetailInfo(params).then((response) => {
            // 更新图书信息和权限信息
            commit('UPDATE_BOOK_DETAIL_INFO', response.data);
            commit('UPDATE_BOOK_AUTH', false);
            // 更新图书的豆瓣信息
            if (response.data.douban_infos) {
              commit('UPDATE_BOOK_DOUBAN_INFO', formatBookInfo(JSON.parse(response.data.douban_infos)));
            } else {
              // dispatch('GET_BOOK_DOUBAN_INFO', {
              //   id: response.data.douban_id,
              //   type: response.data.douban_type
              // });
              // 豆瓣API无法使用了
              commit('UPDATE_BOOK_DOUBAN_INFO', {});
            }
            // 更新图书页的meta信息
            commit('UPDATE_DOCUMENT_TITLE', response.data.title, { root: true });
            commit('UPDATE_DOCUMENT_DESCRIPTION', response.data.desc, { root: true });
            commit('UPDATE_DOCUMENT_KEYWORDS', response.data.tags.map((tags) => {
              return tags.name;
            }).join(','), { root: true });
            resolve(response);
          }).catch((error) => {
            if (error.code === 401) {
              commit('UPDATE_BOOK_AUTH', true);
            }
            handleError(error);
            reject(error);
          });
        });
      },
      // 获取图书豆瓣详细信息
      GET_BOOK_DOUBAN_INFO({state, commit}, params) {
        return new Promise((resolve, reject) => {
          API.getDoubanInfo(params).then((response) => {
            // 更新图书豆瓣信息
            commit('UPDATE_BOOK_DOUBAN_INFO', formatBookInfo(response.data));
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
