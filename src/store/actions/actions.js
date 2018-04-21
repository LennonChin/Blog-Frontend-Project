import API from 'API';

const handleError = (error) => {
  // handle error
  console.log(error);
};

export default {
  getSiteInfo(store, params) {
    console.log('vuex actions getSiteInfo invoked');
    return API.getSiteInfo({
      params: params
    }).then((response) => {
      store.commit('updateSiteInfo', response.data[0]);
    }).catch((error) => {
      handleError(error);
    });
  },
  // 获取所有的分类
  getAllCategorys(store, params) {
    console.log('vuex actions getAllCategorys invoked');
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
};
