export default {
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  UPDATE_DOCUMENT_TITLE(state, documentTitle) {
    state.documentTitle = documentTitle;
  },
  UPDATE_DOCUMENT_DESCRIPTION(state, documentDescription) {
    state.documentDescription = documentDescription;
  },
  UPDATE_DOCUMENT_KEYWORDS(state, documentKeywords) {
    state.documentKeywords = documentKeywords;
  }
};
