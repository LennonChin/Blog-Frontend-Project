import API from 'API';

import { handleError } from '../utils/handles';

export default () => {
  return {
    namespaced: true,
    state: {
      recommends: [],
      hots: [],
      friendLinks: [],
      tags: []
    },
    mutations: {
      UPDATE_RECOMMENDS(state, recommends) {
        state.recommends = recommends;
      },
      UPDATE_HOTS(state, hots) {
        state.hots = hots;
      },
      UPDATE_FRIENDLINKS(state, friendLinks) {
        state.friendLinks = friendLinks;
      },
      UPDATE_TAGS(state, tags) {
        state.tags = tags;
      }
    },
    actions: {
      // 获取推荐内容
      GET_RECOMMENDS(store, params) {
        return new Promise((resolve, reject) => {
          API.getPostBaseInfo({
            params: {
              is_recommend: true,
              ordering: '-add_time',
              limit: 10,
              offset: 0
            }
          }).then((response) => {
            store.commit('UPDATE_RECOMMENDS', response.data.results);
            resolve(response);
          }).catch((error) => {
            handleError(error);
            reject(error);
          });
        });
      },
      // 获取热门内容
      GET_HOTS(store, params) {
        return new Promise((resolve, reject) => {
          API.getPostBaseInfo({
            params: {
              is_hot: true,
              ordering: '-add_time',
              limit: 10,
              offset: 0
            }
          }).then((response) => {
            store.commit('UPDATE_HOTS', response.data.results);
            resolve(response);
          }).catch((error) => {
            handleError(error);
            reject(error);
          });
        });
      },
      // 获取友情链接
      GET_FRIENDLINKS(store, params) {
        return new Promise((resolve, reject) => {
          API.getFriendLinks({
            params: {}
          }).then((response) => {
            store.commit('UPDATE_FRIENDLINKS', response.data);
            resolve(response);
          }).catch((error) => {
            handleError(error);
            reject(error);
          });
        });
      },
      // 获取标签墙
      GET_TAGS(store, params) {
        return new Promise((resolve, reject) => {
          API.getTags({
            params: {}
          }).then((response) => {
            store.commit('UPDATE_TAGS', response.data);
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
