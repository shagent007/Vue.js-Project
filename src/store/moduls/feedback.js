import ApiService from "../../model/ApiService";

// initial state
const state = {};

// getters
const getters = {};

// actions
const actions = {
  async feedback(data, form) {
    return ApiService.feedback(form)
      .then(() => "")
      .catch(err => {
        return err.message;
      });
  }
};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
