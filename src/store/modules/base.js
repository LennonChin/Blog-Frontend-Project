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
    updateSiteInfo(state, siteInfo) {
      state.siteInfo = siteInfo;
    },
    updateBloggerInfo(state, bloggerInfo) {
      state.bloggerInfo = bloggerInfo;
    },
    updateAllCategorys(state, categorysInfo) {
      state.allCategorysInfo = categorysInfo;
    }
  },
  actions: {
    // 获取站点信息
    getSiteInfo({state, commit}, params) {
      return API.getSiteInfo({params}).then((response) => {
        commit('updateSiteInfo', response.data[0]);
      }).catch((error) => {
        handleError(error);
      });
    },
    // 获取博主信息
    getBloggerInfo({state, commit}, params) {
      return API.getBloggerInfo({
        params: {}
      }).then((response) => {
        commit('updateBloggerInfo', response.data[0]);
      }).catch((error) => {
        handleError(error);
      });
    },
    // 获取所有的分类
    getAllCategorys({state, commit}, params) {
      return API.getCategorys({
        params: {
          level_min: 1,
          level_max: 1,
          is_tab: true
        }
      }).then((response) => {
        commit('updateAllCategorys', response.data.results);
      }).catch((error) => {
        handleError(error);
      });
    }
  }
};
