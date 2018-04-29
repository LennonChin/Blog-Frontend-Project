import API from 'API';

import { handleError } from '../utils/handles';

export default {
  namespaced: true,
  state: {
    siteInfo: {},
    bloggerInfo: {},
    allCategorysInfo: []
  },
  mutations: {
    UPDATE_SITE_INFO(state, siteInfo) {
      state.siteInfo = siteInfo;
    },
    UPDATE_BLOGGER_INFO(state, bloggerInfo) {
      state.bloggerInfo = bloggerInfo;
    },
    UPDATE_ALL_CATEGORYS(state, categorysInfo) {
      state.allCategorysInfo = categorysInfo;
    }
  },
  actions: {
    // 获取站点信息
    GET_SITE_INFO: ({state, commit}, params) => {
      return new Promise((resolve, reject) => {
        API.getSiteInfo({params}).then((response) => {
          commit('UPDATE_SITE_INFO', response.data[0]);
          resolve(response);
        }).catch((error) => {
          handleError(error);
          reject(error);
        });
      });
    },
    // 获取博主信息
    GET_BLOGGER_INFO({state, commit}, params) {
      return new Promise((resolve, reject) => {
        API.getBloggerInfo({
          params: {}
        }).then((response) => {
          commit('UPDATE_BLOGGER_INFO', response.data[0]);
          resolve(response);
        }).catch((error) => {
          handleError(error);
          reject(error);
        });
      });
    },
    // 获取所有的分类
    GET_ALL_CATEGORYS({state, commit}, params) {
      return new Promise((resolve, reject) => {
        API.getCategorys({
          params: {
            level_min: 1,
            level_max: 1,
            is_tab: true
          }
        }).then((response) => {
          commit('UPDATE_ALL_CATEGORYS', response.data.results);
          resolve(response);
        }).catch((error) => {
          handleError(error);
          reject(error);
        });
      });
    }
  }
};
