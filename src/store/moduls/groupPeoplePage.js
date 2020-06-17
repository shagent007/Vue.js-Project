// initial state
import ApiService from "../../model/ApiService";

const IMAGE_MEN = "/avatar-male.svg";
const IMAGE_WOMEN = "/avatar-female.svg";

const state = {
  publicPath: process.env.BASE_URL + "groupPeoplesPage/",
  mentors: {
    buttonName: "Попроситься в команду",
    image: "groupPeoplesPage/mentors.jpg",
    searchPlaceholder: "Поиск наставника",
    peoples: []
  },
  trainers: {
    buttonName: "Попроситься в команду",
    image: "groupPeoplesPage/trainers.jpg",
    searchPlaceholder: "Поиск тренера",
    peoples: []
  },
  competitors: {
    buttonName: "Пригласить в команду",
    image: "groupPeoplesPage/participants.jpg",
    searchPlaceholder: "Поиск участника",
    peoples: []
  },
  teams: {
    buttonName: "Попроситься в команду",
    image: "groupPeoplesPage/comands.jpg",
    searchPlaceholder: "Поиск команды",
    peoples: [
      {
        id: "1",
        image: "",
        name: "москва",
        participantCount: "100",
        trainer: "мишустин",
        mentor: "медведев",
        recruitmentOpen: true
      },
      {
        id: "2",
        image: "flags/flag.png",
        name: "москва",
        participantCount: "200",
        trainer: "мишустин",
        mentor: "медведев",
        recruitmentOpen: false
      },
      {
        id: "3",
        image: "flags/flag.png",
        name: "москва",
        participantCount: "228",
        trainer: "мишустин",
        mentor: "медведев",
        recruitmentOpen: true
      }
    ]
  },
  sortMethod: null,
  cardPage: null
};

// getters
const getters = {
  LOGO_IMAGE: state => group => state.publicPath + state[group].image,
  PEOPLE_LIST: state => group => state[group],
  BUTTON_NAME: state => group => state[group].buttonName,
  CARD_PAGE: state => state.cardPage,
  SORTED_METHOD: state => state.sortMethod
};

// actions
const actions = {
  sortBy({ commit, state }, { value, group }) {
    const sorted = state[group].peoples.sort((a, b) => {
      switch (value) {
        case "age":
          a = a.age;
          b = b.age;
          return a < b ? 1 : a > b ? -1 : 0;

        case "alphabet":
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? 1 : a < b ? -1 : 0;

        case "rating":
          a = a.rating;
          b = b.rating;
          return a > b ? 1 : a < b ? -1 : 0;
      }
    });
    commit("sortBy", { sorted, group });
  },
  loadsAllPhoto({ state }, group) {
    state[group].peoples.forEach(({ image, isMen }, index) => {
      if (image !== "") {
        ApiService.loadPhoto(image)
          .then(img => {
            state[group].peoples[index].image = img;
          })
          .catch(() => console.log("Photo undif"));
      } else {
        state[group].peoples[index].image = isMen ? IMAGE_MEN : IMAGE_WOMEN;
      }
    });
  },
  setCardPage({ commit, state }, { group, id, info = false }) {
    if (info) {
      commit("setCardPage", info);
      return;
    }

    const candidate = state[group].peoples.find(man => man.id == id);
    if (candidate) {
      commit("setCardPage", {
        buttonName: state[group].buttonName,
        ...candidate
      });
    } else {
      // some fetch request
      console.log();
    }
  },
  deleteCardPage({ commit }) {
    commit("deleteCardPage");
  },
  setSortedMethod({ commit }, method) {
    commit("setSortedMethod", method);
  },
  getPeoples({ commit, dispatch }, group) {
    return ApiService.getPeoples(group)
      .then(response => {
        let peoples = response[group].data;
        commit("setPeoples", { peoples, group });
        dispatch("loadsAllPhoto", group);
        return "";
      })
      .catch(err => {
        return err.message;
      });
  }
};

// mutations
const mutations = {
  setPeoples(state, { peoples, group }) {
    let getName = ({ lastName, firstName, middleName }) => {
      return `${lastName} ${firstName} ${middleName}`;
    };
    let getInformation = ({ yearBirth, monthBirth, dayBirth }, { city }) => {
      const date = new Date();
      const month = date.getMonth();
      const day = date.getDay();
      const difference =
        monthBirth < month || (monthBirth === month && dayBirth < day) ? -1 : 0;
      const age = date.getFullYear() - yearBirth + difference;
      //TODO: поработать над префиксами
      return `${age} года, ${city}`;
    };
    //let statePeople = state[group].peoples;
    for (let i = 0; i < peoples.length; i++) {
      let { avatar, _id, name, dateBirth, location, team, isMen } = peoples[i];
      //TODO: доработка
      if (!team) team = "";
      let statePeople = {
        image: avatar,
        id: _id,
        name: getName(name),
        information: getInformation(dateBirth, location),
        team,
        isMen,
        buttonName: "пригласить в команду",
        dateBirth
      };
      console.log(statePeople);
      state[group].peoples = [...state[group].peoples, statePeople];
    }
  },
  sortBy(state, { sorted, group }) {
    state[group].peoples = sorted;
  },
  setCardPage(state, info) {
    state.cardPage = info;
  },
  deleteCardPage(state) {
    state.cardPage = null;
  },
  setSortedMethod(state, method) {
    state.sortMethod = method;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
