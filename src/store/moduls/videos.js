// initial state
import ApiService from "../../model/ApiService";
import { CATEGORY_VIDEO, HISTORY_VIDEO, ID_VIDEO, VIDEO_ITER } from "../consts";

const state = {
  videosCategory: {
    appeal: {
      title: "",
      videos: []
    },
    friendlyCountryVideos: {
      title: "",
      videos: []
    },
    regionVideos: {
      title: "",
      videos: []
    },
    cisVideos: {
      title: "",
      videos: []
    }
  },
  videoId: "",
  videoCategory: "",
  video: {},
  loaded: false,
  category: "",
  change: false
};

// getters
const getters = {
  getAll: state => {
    const {
      appeal,
      regionVideos,
      cisVideos,
      friendlyCountryVideos
    } = state.videosCategory;
    return [appeal, friendlyCountryVideos, regionVideos, cisVideos];
  },
  getAppeal: state => {
    return state.videosCategory.appeal;
  },
  getFriendlyCountryVideos: state => {
    return state.videosCategory.friendlyCountryVideos;
  },
  getRegionVideos: state => {
    return state.videosCategory.regionVideos;
  },
  getCISVideos: state => {
    return state.videosCategory.cisVideos;
  },
  getVideo: state => {
    return state.video;
  },
  getVideoCategory: state => {
    return state.videosCategory[state.category];
  },
  getChange: state => {
    return state.change;
  }
};

// actions
const actions = {
  async getVideoByCategory({ state, commit }) {
    state.category = state.videoCategory;
    console.log("Ты получаешь категорию", state.category);
    return fetch("http://localhost:8080/test/additionalVideo.json")
      .then(response => {
        return response.json();
      })
      .then(({ data }) => {
        commit("setVideos", {
          category: state.category,
          videos: data.videos,
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
      state.videosCategory[category].length
    );
    return fetch("http://localhost:8080/test/additionalVideo.json")
      .then(response => {
        return response.json();
      })
      .then(({ data }) => {
        commit("setVideos", {
          category: state.category,
          videos: data.videos,
          title: data.title
        });
        return "";
      })
      .catch(err => {
        return err.message;
      });
  },
  async getVideoById({ commit, state }) {
    const videoId = state.videoId;
    console.log("Ты получаешь id новости", videoId);
    return fetch("http://localhost:8080/test/videoById.json")
      .then(response => {
        return response.json();
      })
      .then(({ data }) => {
        commit("setVideoById", data);
        return "";
      })
      .catch(err => {
        return err.message;
      });
  },
  async addVideo(state, { form, country, creatorId }) {
    console.log(country, creatorId);
    return ApiService.addVideo(form, country, creatorId)
      .then(() => "")
      .catch(err => err.message);
  },

  async getInformationVideos({ commit, dispatch }) {
    return fetch("http://localhost:8080/test/videos.json")
      .then(response => {
        return response.json();
      })
      .then(({ data }) => {
        data.forEach(({ category, videos, title }) => {
          commit("setVideos", { category, videos, title });
        });
        return "";
      })
      .catch(err => {
        return err.message;
      });
    //return ApiService.getNewsJSON()
  },

  async loadsAllPreview({ state }) {
    const NAME_METHOD = "loadsAllPreview";

    const videosCategory = { ...state.videosCategory };

    const loadArrayPhoto = category => {
      videosCategory[category].videos.forEach(({ image }, index) => {
        ApiService.loadPhoto(image)
          .then(img => {
            videosCategory[category].videos[index].image = URL.createObjectURL(
              img
            );
          })
          .catch(err => {
            console.group(NAME_METHOD);
            console.log(err.message);
            console.groupEnd();
          });
      });
    };

    for (let key in videosCategory) {
      loadArrayPhoto(key);
    }
    state.newsCategory = videosCategory;
  }
};

// mutations
const mutations = {
  setVideoCategory(state, category) {
    state.videoCategory = category;
  },
  next(state) {
    const str1 = localStorage.getItem(VIDEO_ITER);
    const str2 = localStorage.getItem(HISTORY_VIDEO);
    const isNext = () => {
      if (str1 && str2) {
        const array = JSON.parse(str2);
        const iter = Number.parseInt(str1);
        return array.length !== 0 && array.length - 1 > iter;
      }
      return false;
    };
    if (isNext()) {
      let array = JSON.parse(str2);
      let iter = Number.parseInt(str1);
      iter++;
      console.log(array[iter]);
      state.videoId = array[iter];
      localStorage.setItem(VIDEO_ITER, iter.toString());
      localStorage.setItem(HISTORY_VIDEO, JSON.stringify(array));
      state.change = true;
    } else {
      state.change = false;
    }
  },
  prev(state) {
    const str1 = localStorage.getItem(VIDEO_ITER);
    const str2 = localStorage.getItem(HISTORY_VIDEO);
    if (str1 && Number.parseInt(str1) !== 0) {
      const array = JSON.parse(str2);
      let iter = Number.parseInt(str1);
      console.log(array, iter);
      iter = iter > array.length ? 0 : iter - 1;
      state.videoId = array[iter];
      localStorage.setItem(VIDEO_ITER, iter.toString());
      localStorage.setItem(HISTORY_VIDEO, JSON.stringify(array));
      state.change = true;
    } else {
      state.change = false;
    }
  },
  setVideoId(state, id) {
    state.videoId = id;
    const str1 = localStorage.getItem(VIDEO_ITER);
    const str2 = localStorage.getItem(HISTORY_VIDEO);
    let iter, array;
    if (str1 && str2) {
      iter = Number.parseInt(str1);
      array = JSON.parse(str2);
      if (array[array.length - 1] !== id) {
        array = array.slice(0, iter + 1);
        array.push(id);
        iter++;
        if (array.length === 10) {
          iter--;
          array.shift();
        }
      }
    } else {
      array = [id];
      iter = 0;
    }
    console.log(array, iter);
    localStorage.setItem(VIDEO_ITER, iter.toString());
    localStorage.setItem(HISTORY_VIDEO, JSON.stringify(array));
  },
  setVideoById(
    state,
    {
      id,
      image,
      title,
      information,
      dateBirth,
      rating,
      video,
      videosSameCategory
    }
  ) {
    state.video = {
      id: id,
      image: image,
      title: title,
      information: information,
      dateBirth: dateBirth,
      date: `${dateBirth.day}.${
        dateBirth.month < 9 ? "0" + dateBirth.month : dateBirth.month
      }.${dateBirth.year}`,
      rating: rating,
      video: video,
      videosSameCategory: videosSameCategory
    };
  },
  setVideos(state, { category, videos, title }) {
    const videosCategory = state.videosCategory;
    //парс инфы
    const parseInformation = ({
      id,
      image,
      title,
      information,
      dateBirth,
      rating,
      video
    }) => {
      return {
        id: id,
        image: image,
        title: title,
        information: information,
        dateBirth: dateBirth,
        date: `${dateBirth.day}.${
          dateBirth.month < 9 ? "0" + dateBirth.month : dateBirth.month
        }.${dateBirth.year}`,
        rating: rating,
        video: video
      };
    };

    const newVideos = videos.map(elem => parseInformation(elem));

    videosCategory[category] = {
      title: title,
      videos: newVideos,
      category: category
    };

    state.videosCategory = videosCategory;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
