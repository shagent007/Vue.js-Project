const staticData = {
  menuButtons: {
    profile: "профиль",
    finance: "финансы",
    team: "команда",
    functional: "функционал",
    partipicant: "участники",
    files: "файлы",
    rating: "рейтинг"
  },
  personal_area: "личный кабинет",
  stages: "этапы"
};

// initial state
const state = {
  teamMentor: false,
  teamApplications: [],
  testResultats: [],
  teamCommands: {
    name: "Moscov",
    data: []
  },
  staticData
};

// getters
const getters = {
  COMMAND_LIST: state => state.teamCommands.data,
  COMMAND_NAME: state => state.teamCommands.name,
  TEAM_APPLICATIONS: state => state.teamApplications,
  MENTOR: state => state.teamMentor,
  TEST_RESULTATS: state => state.testResultats,
  STATIC: state => state.staticData
};

// actions
const actions = {
  async fetchTeamCommands({ commit }) {
    const data = new Array(9).fill({
      number: 1,
      structure: "V.V. Putin",
      position: "Trainer",
      city: "Moscov",
      rating: 9000
    });

    commit("setTeamCommands", data);
  },

  async fetchTeamApplications({ commit }) {
    const data = new Array(9).fill({
      number: 1,
      structure: "V.V. Putin",
      position: "Trainer",
      city: "Moscov",
      rating: 9000
    });

    commit("setTeamApplications", data);
  },

  async fetchTestResultats({ commit }, id) {
    const data = new Array(9).fill({
      question: "Question",
      answer: "Answer"
    });

    commit("setTestResultats", data);
  }
};

// mutations
const mutations = {
  setTeamCommands(state, data) {
    state.teamCommands.data = data;
  },
  setTeamApplications(state, data) {
    state.teamApplications = data;
  },
  setTestResultats(state, data) {
    state.testResultats = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
