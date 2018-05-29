import Vuex from 'vuex';

import defaultState from './state/state';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import actions from './actions/actions';

import base from './modules/base';
import common from './modules/common';
import home from './modules/home';
import article from './modules/article';
import book from './modules/book';
import bookNote from './modules/bookNote';
import movie from './modules/movie';
import timeline from './modules/timeline';
import articleHome from './modules/articleHome';
import articleList from './modules/articleList';
import movieHome from './modules/movieHome';
import movieList from './modules/movieList';
import readHome from './modules/readHome';
import readList from './modules/readList';
import bookList from './modules/bookList';
import bookNoteList from './modules/bookNoteList';

const isDev = process.env.NODE_ENV === 'development';

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState(),
    mutations: mutations(),
    getters: getters(),
    actions: actions(),
    modules: {
      base: base(),
      common: common(),
      home: home(),
      article: article(),
      book: book(),
      bookNote: bookNote(),
      movie: movie(),
      timeline: timeline(),
      articleHome: articleHome(),
      articleList: articleList(),
      movieHome: movieHome(),
      movieList: movieList(),
      readHome: readHome(),
      readList: readList(),
      bookList: bookList(),
      bookNoteList: bookNoteList()
    }
  });

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters',
      './modules/base',
      './modules/common',
      './modules/home',
      './modules/article',
      './modules/book',
      './modules/bookNote',
      './modules/movie',
      './modules/timeline',
      './modules/articleHome',
      './modules/articleList',
      './modules/movieHome',
      './modules/movieList',
      './modules/readHome',
      './modules/readList',
      './modules/bookList',
      './modules/bookNoteList'
    ], () => {
      const newState = require('./state/state').default;
      const newMutations = require('./mutations/mutations').default;
      const newActions = require('./actions/actions').default;
      const newGetters = require('./getters/getters').default;
      const base = require('./modules/base').default;
      const common = require('./modules/common').default;
      const home = require('./modules/home').default;
      const article = require('./modules/article').default;
      const book = require('./modules/book').default;
      const bookNote = require('./modules/bookNote').default;
      const movie = require('./modules/movie').default;
      const timeline = require('./modules/timeline').default;
      const articleHome = require('./modules/articleHome').default;
      const articleList = require('./modules/articleList').default;
      const movieHome = require('./modules/movieHome').default;
      const movieList = require('./modules/movieList').default;
      const readHome = require('./modules/readHome').default;
      const readList = require('./modules/readList').default;
      const bookList = require('./modules/bookList').default;
      const bookNoteList = require('./modules/bookNoteList').default;

      store.hotUpdate({
        state: newState(),
        mutations: newMutations(),
        getters: newGetters(),
        actions: newActions(),
        modules: {
          base: base(),
          common: common(),
          home: home(),
          article: article(),
          book: book(),
          bookNote: bookNote(),
          movie: movie(),
          timeline: timeline(),
          articleHome: articleHome(),
          articleList: articleList(),
          movieHome: movieHome(),
          movieList: movieList(),
          readHome: readHome(),
          readList: readList(),
          bookList: bookList(),
          bookNoteList: bookNoteList()
        }
      });
    });
  }

  return store;
};
