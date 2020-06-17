import ApiService from "../../model/ApiService";

//константы
const PATH_TO_IMAGE_SLIDE = ""; //путь до папки, где хранятся изображения для слайдера
const PATH_TO_VIDEO_FOLDER = "video/"; //путь до папки, где хранятся видео
const PATH_TO_VIDEO_POSTER_FOLDER = "videoPosters/"; //путь до папки, где хранятся постеры для видео

//urls
//const URL_GET_VIDEOS_JSON = "http://localhost:3000/api/video/getAllVideo";
// initial state
const state = {
  newsId: [],
  news: [],

  videosId: [],
  videos: [],
  ratings: []
};

// getters
const getters = {
  slide: state => {
    return state.infoAboutSlide.map(elem => PATH_TO_IMAGE_SLIDE + elem);
  },
  videos: state => {
    return state.infoAboutVideos.map(elem => {
      return {
        video: PATH_TO_VIDEO_FOLDER + elem.video,
        poster: PATH_TO_VIDEO_POSTER_FOLDER + elem.poster,
        name: elem.name
      };
    });
  }
};

// actions
const actions = {
  getNewsJSON({ commit }) {
    ApiService.getNewsJSON().then(news => commit("setNewsId", news));
  },
  getNews({ state, commit }) {
    state.newsId.forEach(id =>
      ApiService.getNewsById(id).then(news => commit("setNews", news))
    );
  },
  getVideosJSON({ commit }) {
    ApiService.getVideosJSON().then(videos => commit("setVideosId", videos));
  },
  getJSONS({ dispatch }) {
    dispatch("getNewsJSON");
    dispatch("getVideosJSON");
  }
};

// mutations
const mutations = {
  setNewsId(state, newsId) {
    state.news = newsId;
  },
  setVideosId(state, videosId) {
    state.videos = videosId;
  },
  setNews(state, news) {
    state.news.add(news);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
