import API from '../../api/client-api';

const handleError = (error) => {
  // handle error
  console.log(error);
};

export default {
  getSiteInfo(store, params) {
    API.getSiteInfo({
      params: params
    }).then((response) => {
      store.commit('updateSiteInfo', response.data[0]);
    }).catch((error) => {
      handleError(error);
    });
  }
};
