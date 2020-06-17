import ApiService from "../../model/ApiService";
import { CATEGORY_NEWS, ID_NEWS } from "../consts";

// initial state
const state = {
  newsCategory: {
    lastNews: {
      title: "",
      news: []
    },
    actualNews: {
      title: "",
      news: []
    },
    topNews: {
      title: "",
      news: []
    }
  },
  news: {
    id: "",
    image: "",
    title: "",
    shortInformation: "",
    fullInformation: "",
    dateBirth: {},
    rating: {}
  },
  idNews: "",
  categoryNews: "",
  category: "",
  newsId: 0,
  loaded: false,
  article: null
};

// getters
const getters = {
  getLastNews: state => {
    return state.newsCategory.lastNews;
  },
  getActualNews: state => {
    return state.newsCategory.actualNews;
  },
  getTopNews: state => {
    return state.newsCategory.topNews;
  },
  getNews: state => {
    return state.news;
  },
  getNewsCategory: state => {
    return state.newsCategory[state.category];
  }
};

// actions
const actions = {
  async getNewsByCategory({ state, commit }) {
    state.category = state.categoryNews;
    console.log("Ты получаешь категорию", state.category);
    return fetch("http://localhost:8080/test/additionalNews.json")
      .then(response => {
        return response.json();
      })
      .then(({ data }) => {
        commit("setNews", {
          category: state.category,
          news: data.news,
          title: data.title
        });
        return "";
      })
      .catch(err => {
        return err.message;
      });
  },
  async getNewsByCategoryMore({ state, commit }, category) {
    console.log(
      "Ты получаешь категорию и количество новостей",
      category,
      state.newsCategory[category].length
    );
    return fetch("http://localhost:8080/test/additionalNews.json")
      .then(response => {
        return response.json();
      })
      .then(({ data }) => {
        commit("setNews", { category, news: data.news, title: data.title });
        return "";
      })
      .catch(err => {
        return err.message;
      });
  },
  async getNewsById({ state, commit }) {
    const newsId = state.newsId;
    console.log("Ты получаешь id новости", newsId);
    return fetch("http://localhost:8080/test/newsById.json")
      .then(response => {
        return response.json();
      })
      .then(({ data }) => {
        commit("setNewsById", data);
        return "";
      })
      .catch(err => {
        return err.message;
      });
  },
  async addNews(state, { form, creatorId }) {
    return ApiService.addNews(form, creatorId)
      .then(obj => {
        return "";
      })
      .catch(error => {
        return error.message;
      });
  },
  async getInformationNews({ commit, state }) {
    return fetch("http://localhost:8080/test/news.json")
      .then(response => {
        return response.json();
      })
      .then(({ data }) => {
        data.forEach(({ category, news, title }) => {
          commit("setNews", { category, news, title });
        });
        return "";
      })
      .catch(err => {
        return err.message;
      });
  }
};

// mutations
const mutations = {
  setNewsCategory(state, category) {
    state.categoryNews = category;
  },
  setNewsId(state, id) {
    state.news.id = id;
  },
  setNewsById(
    state,
    { id, image, title, shortInformation, fullInformation, dateBirth, rating }
  ) {
    state.news = {
      id: id,
      image: image,
      title: title,
      shortInformation: shortInformation,
      fullInformation: fullInformation,
      dateBirth: dateBirth,
      date: `${dateBirth.day}.${
        dateBirth.month < 9 ? "0" + dateBirth.month : dateBirth.month
      }.${dateBirth.year}`,
      rating: rating
    };
  },
  setNews(state, { category, news, title }) {
    let newsCategory = state.newsCategory;
    //парс инфы
    const parseInformation = ({
      id,
      image,
      title,
      shortInformation,
      fullInformation,
      dateBirth,
      rating
    }) => {
      return {
        id: id,
        image: image,
        title: title,
        shortInformation: shortInformation,
        fullInformation: fullInformation,
        dateBirth: dateBirth,
        date: `${dateBirth.day}.${
          dateBirth.month < 9 ? "0" + dateBirth.month : dateBirth.month
        }.${dateBirth.year}`,
        rating: rating
      };
    };

    const newNews = news.map(elem => parseInformation(elem));

    newsCategory[category] = {
      title: title,
      news: newNews,
      category: category
    };

    state.newsCategory = newsCategory;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
