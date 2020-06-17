// initial state
const state = {
  TableAttr: {
    title: "РЕЙТИНГИ КОМАНД",
    subtitle: "Рейтинг",
    tableValues: [3000, 2000, 1000, 0],
    tableTitle: "ЛУЧШИЕ КОМАНДЫ",
    tableTopNames: ["Номер", "Название", "Проект", "Тренер", "Город", "Рейтинг"]
  },
  rating: [
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 4781
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 1200
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 1000
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 1300
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 900
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 600
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 400
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 3000
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 2000
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 6000
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 2300
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 320
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 1450
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 1600
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 1660
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 2070
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 2800
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 900
    },
    {
      name: "Москва",
      project: "Название",
      trainer: "В.В. Путин",
      town: "Москва",
      value: 1000
    }
  ],
  ratingValue: []
};

// getters
const getters = {
  SORT_RATING(state) {
    return state.rating;
  },
  RATING_VALUE(state) {
    return state.ratingValue;
  },
  TABLE_ATTR(state) {
    return state.TableAttr;
  },
  GRAPHIC_VALUES(state) {
    const data = state.rating.map(item => item.value);

    return [
      {
        name: "Рейтинг",
        data
      }
    ];
  }
};

// actions
const actions = {
  sortingPosts(ctx) {
    ctx.commit("CreateRaiting");
  }
};

// mutations
const mutations = {
  CreateRaiting(state) {
    let max = 0;

    state.rating.forEach(element => {
      if (element.value > max) max = element.value;
    });

    if (max < 1000) max = 1000;
    else max += 1000;

    if (max % 300 != 0) while (max % 300 != 0) max++;
    let tableValues = max;

    for (let index = 0; index < state.TableAttr.tableValues.length; index++) {
      state.TableAttr.tableValues[index] = tableValues;
      tableValues -= max / 3;
    }

    state.rating.forEach(element =>
      state.ratingValue.push((element.value * 100) / max + "%")
    );
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
