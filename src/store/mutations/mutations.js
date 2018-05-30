export default () => {
  let titleIdiom = [
    '蜂采百花酿甜蜜，人读群书明真理',
    '己所不欲，勿施于人',
    '理想是人生的太阳',
    '人生贵知心，定交无暮早',
    '真实是人生的命脉，是一切价值的根基',
    '人生中最困难者，莫过于选择',
    '有所作为是生活的最高境界',
    '爱情不过是一种疯'
  ];
  return {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    UPDATE_DOCUMENT_TITLE(state, documentTitle) {
      state.documentTitle = `${documentTitle} | CodeRap - ${titleIdiom[Math.floor(Math.random() * titleIdiom.length)]}`;
      try {
        // 修改页面title
        document.title = state.documentTitle;
      } catch (exception) {
      }
    },
    UPDATE_DOCUMENT_DESCRIPTION(state, documentDescription) {
      state.documentDescription = documentDescription;
    },
    UPDATE_DOCUMENT_KEYWORDS(state, documentKeywords) {
      state.documentKeywords = documentKeywords;
    }
  };
};
