// initial state
const state = {
  tabletWidth: 768,
  active: false
};

// getters
const getters = {
  isActive: state => {
    return state.active;
  },
  isTablet: state => {
    return window.innerWidth <= state.tabletWidth;
  }
};

// actions
const actions = {};

// mutations
const mutations = {
  changeStateMenu: state => {
    state.active = !state.active;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
