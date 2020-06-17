// initial state
const state = {
  contactInformation: {
    telephoneNumber: "+7 495 777-777",
    email: "100days@mail.ru"
  },
  inputPlaceHolder: "Поиск...",
  languages: {
    first: "RU",
    second: "EN"
  }
};

// getters
const getters = {
  telephoneNumber: state => {
    return state.contactInformation.telephoneNumber;
  },
  email: state => {
    return state.contactInformation.email;
  }
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
