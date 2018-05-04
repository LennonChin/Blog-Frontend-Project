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

const isDev = process.env.NODE_ENV === 'development';

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      base,
      common,
      home,
      article,
      book,
      bookNote,
      movie,
      timeline,
      articleHome
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
      './modules/articleHome'
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

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions,
        modules: {
          base,
          common,
          home,
          article,
          book,
          bookNote,
          movie,
          timeline,
          articleHome
        }
      });
    });
  }

  return store;
};
