import API from 'API';

import { handleError } from '../utils/handles';

export default {
  namespaced: true,
  state: {
    siteInfo: {},
    allCategorysInfo: []
  },
  mutations: {
    updateSiteInfo(state, siteInfo) {
      state.siteInfo = siteInfo;
    },
    updateAllCategorys(state, categorysInfo) {
      state.allCategorysInfo = categorysInfo;
    }
  },
  actions: {
    // 获取站点信息
    getSiteInfo(store, params) {
      return API.getSiteInfo({params}).then((response) => {
        store.commit('updateSiteInfo', response.data[0]);
      }).catch((error) => {
        handleError(error);
      });
    },
    // 获取所有的分类
    getAllCategorys(store, params) {
      return API.getCategorys({
        params: {
          level_min: 1,
          level_max: 1,
          is_tab: true
        }
      }).then((response) => {
        store.commit('updateAllCategorys', response.data.results);
      }).catch((error) => {
        handleError(error);
      });
    }
  }
};
