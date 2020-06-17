// initial state
const state = {
  title: "ЛИДЕРЫ УПРАВЛЕНИЯ",
  aboutProject: "О проэкте",
  informationAboutProject:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  contact: {
    title: "Подпишитесь на наши новости",
    buttonName: "ПОДПИСАТЬСЯ",
    numberPhone: "+7 495 777-777",
    email: "100days@mail.ru",
    location: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do"
  },
  subscription: {
    title: "Подпишитесь на наши новости",
    placeholder: "Введите свой Email",
    buttonName: "ПОДПИСАТЬСЯ"
  },
  lang: {
    title: "@ Все права зашишены",
    russia: "RU",
    english: "EN"
  },
  menu: [
    { title: "Главная", path: "/" },
    { title: "Новости", path: "/" },
    { title: "Тренеры", path: "/GroupPeoplePage/trainers" },
    { title: "Наставники", path: "/GroupPeoplePage/mentors" },
    { title: "Команды", path: "/GroupPeoplePage/competitors" },
    { title: "Проэкты", path: "projects" },
    { title: "Рабочие группы", path: "workingGroups" },
    { title: "Обратная связь", path: "feedback" }
  ]
};

// getters
const getters = {};

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
