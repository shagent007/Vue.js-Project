const state = {
  editing: false,
  editLoaded: true,
  editNews: {},
  editVideo: {},
  editTest: {},
  news: [],
  videos: [],
  tests: [],
  editItem: ""
};

const actions = {
  setEditing({ commit }, { editItem, editContent }) {
    commit("setEditing");
    console.log(editItem);
    switch (editItem) {
      case "news":
        commit("editNews", editContent);
        break;
      case "video":
        commit("editVideo", editContent);
        break;
      case "test":
        commit("editTest", editContent);
        break;
    }
  },
  cancelEditing({ commit }) {
    commit("cancelEditing");
  }
};

const mutations = {
  setEditing(state) {
    state.editing = true;
  },
  cancelEditing(state) {
    state.editing = false;
    state.editItem = "";
    state.editNews = {};
    state.editTest = {};
    state.editVideo = {};
  },
  // устанавливаем редактируемую штуку на новости
  editNews(state, editItem) {
    state.editItem = "news";
    state.editNews = editItem;
  },
  // устанавливаем редактируемую штуку на видео
  editVideo(state, editItem) {
    state.editItem = "video";
    state.editVideo = editItem;
  },
  // устанавливаем редактируемую штуку на тесты
  editTest(state, editItem) {
    state.editItem = "test";
    state.editTest = editItem;
  }
};

const getters = {
  IS_EDITING: state => state.editing,
  EDIT_LOADED: state => state.editLoaded,

  NEWS: state => state.news,
  VIDEOS: state => state.videos,
  TESTS: state => state.tests,

  EIDT_NEWS: state => state.editNews,
  EIDT_VIDEO: state => state.editVideo,
  EIDT_TEST: state => state.editTest,

  EDIT_ITEM: state => state.editItem
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
