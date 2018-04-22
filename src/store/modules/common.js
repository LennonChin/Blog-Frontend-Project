import API from 'API';

import { handleError } from '../utils/handles';

export default {
  namespaced: true,
  state: {
    recommends: [],
    hots: []
  },
  mutations: {
    updateRecommends(state, recommends) {
      state.recommends = recommends;
    },
    updateHots(state, hots) {
      state.hots = hots;
    }
  },
  actions: {
    // 获取推荐内容
    getRecommends(store, params) {
      return API.getPostBaseInfo({
        params: {
          is_recommend: true,
          limit: 5,
          offset: 0
        }
      }).then((response) => {
        store.commit('updateRecommends', response.data.results);
      }).catch((error) => {
        handleError(error);
      });
    },
    // 获取热门内容
    getHots(store, params) {
      return API.getPostBaseInfo({
        params: {
          is_hot: true,
          limit: 5,
          offset: 0
        }
      }).then((response) => {
        store.commit('updateHots', response.data.results);
      }).catch((error) => {
        handleError(error);
      });
    }
  }
};
