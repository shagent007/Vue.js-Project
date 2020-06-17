import city from "../citi.json";
import country from "../country.json";
import region from "../region.json";

// initial state
const state = {
  country,
  city,
  region
};

// getters
const getters = {
  countryList: state =>
    new Promise(res => {
      setTimeout(() => res(state.country), 0);
    }),
  citiList: state =>
    new Promise(res => {
      setTimeout(() => res(state.city), 0);
    }),
  regionList: state =>
    new Promise(res => {
      setTimeout(() => res(state.region), 0);
    })
};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
