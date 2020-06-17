// initial state
const state = {
  article: null
};

// getters
const getters = {
  article(state) {
    return state.article;
  }
};

// actions
const actions = {
  fetchArticle() {}
};

// mutations
const mutations = {
  setArticle(state, data) {
    state.article = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
