import ApiService from "../../model/ApiService";
import AllDate from "../../model/AllDate";
import ClientInformationManagement from "../../model/ClientInformationManagement";

const IMAGE_MEN = "/avatar-male.svg";
const IMAGE_WOMEN = "/avatar-female.svg";

/**
 * Объект хранящий в себе всю информацию о пользователе, если пользователь идентифицирован
 *
 * @class state
 */
const state = {
  admission: {
    isLogin: true, // залогинен ли пользователь
    isMentor: true, // наставник ли пользователь
    isTrainer: false, // тренер ли пользователь
    isCompetitor: false, // участник ли пользователь
    isDefaultPhoto: false, // есть ли у пользователя фото
    isMen: false, // мужчина ли пользователь (для определения дефолтного фото)
    isAccessEmail: false, //подтвержденна ли почта у пользователя
    isAdmin: true // доступ к админ панели
  },
  image: "", //фото
  id: 0, //id пользователя
  name: {
    //объект имени
    firstName: "", //имя
    lastName: "", // фамилия
    middleName: "" //отчество
  },
  email: "", //email
  dateBirth: {
    //дата рождения
    year: 0, //год
    month: 0, //месяц
    day: 0 //день
  },
  gender: "", //пол
  location: {
    //местоположение
    country: "", //страна
    region: "", //регион
    city: "" //город
  },
  role: "", //роль на сайте
  aboutUser: "", //информация о ользователе
  achievements: "" //достижения
};

// getters
const getters = {
  /**
   * Возращает имя в формате: фамилия + имя
   *
   * @param state
   * @return {string}
   */
  getName: state => {
    return state.name.lastName + " " + state.name.firstName;
  },

  /**
   * Аутентификация админа
   *
   * @param state
   * @return { Boolean }
   */
  getIsAdmin: state => {
    return state.admission.isAdmin;
  },

  /**
   * Возращает идентифицирован ли пользователь
   *
   * @param state
   * @return {Boolean|boolean}
   */
  getIsLogin: state => {
    return state.admission.isLogin;
  },

  /**
   * Возращает роль пользователя (участник, наставник, тренер)
   *
   * @param state
   * @return {String}
   */
  getRole: state => {
    return state.role;
  },

  /**
   * Возращает имя в формате: фамилия + имя + отчество
   *
   * @param state
   * @return {string}
   */
  getFullName: ({ name }) => {
    let { firstName, lastName, middleName } = name;
    return `${lastName} ${firstName} ${middleName}`;
  },

  /**
   * Возращает строку с полной датой
   *
   * @param dateBirth
   * @return {string}
   */
  getFullDate: ({ dateBirth }) => {
    let { day, month, year } = dateBirth;
    return `${day} ${AllDate.getMonthNumber(month)} ${year}`;
  },

  /**
   * Возращает строку полного место положения
   *
   * @param state
   * @return {string}
   */
  getFullLocation: state => {
    let { country, region, city } = state.location;
    return `${country}, ${region}, ${city}`;
  },

  getBriefInformation: (state, getters) => {
    return {
      name: getters.getFullName,
      email: state.email,
      dateBirth: getters.getFullDate,
      gender: state.gender,
      location: getters.getFullLocation,
      role: state.role
    };
  },
  getDetailedInformation: state => {
    return {
      aboutUser: state.aboutUser,
      achievements: state.achievements
    };
  },
  getIsMentor: ({ admission }) => {
    return admission.isMentor;
  },
  getIsTrainer: ({ admission }) => {
    return admission.isTrainer;
  },
  getAccountInfo: state => {
    return {
      image: state.image,
      email: state.email,
      firstName: state.name.firstName,
      lastName: state.name.lastName,
      middleName: state.name.middleName,
      gender: state.gender,
      birthDay: state.dateBirth.day,
      birthMonth: state.dateBirth.month,
      birthYear: state.dateBirth.year,
      country: state.location.country,
      region: state.location.region,
      city: state.location.city
    };
  },
  getId: ({ id }) => {
    return id;
  },
  getCountry({ location }) {
    return location.country;
  }
};

// mutations
const mutations = {
  /**
   * Логин админа
   * @param solution
   */
  adminLogIn(state, solution) {
    state.admission.isAdmin = solution;
  },
  /**
   * Обновление всего состояния
   *
   * @param state
   * @param obj
   */
  setAllInformation(state, obj) {
    for (let key in obj)
      if (key in state) {
        state[key] = obj[key];
      }
  },
  /**
   * Данная функция парст пришедшую информацию
   *
   * @param state
   * @param obj
   */
  parseAllInformation(state, obj) {
    let { admission } = state;
    admission.isLogin = true;
    admission.isMentor = obj.admission.isMentor;
    admission.isTrainer = obj.admission.isTrainer;
    admission.isDefaultPhoto = obj.data.image === "";
    admission.isMen = obj.admission.isMen;
    admission.isAccessEmail = obj.admission.isAccessEmail;
    if (!admission.isDefaultPhoto) {
      state.image = obj.data.image;
    } else {
      state.image = obj.admission.isMen ? IMAGE_MEN : IMAGE_WOMEN;
    }
  },

  setAllDefaultInformation(state) {
    const fun = obj => {
      for (let key in obj) {
        switch (typeof obj[key]) {
          case "string":
            obj[key] = "";
            break;
          case "boolean":
            obj[key] = false;
            break;
          case "number":
            obj[key] = 0;
            break;
          case "object":
            fun(obj[key]);
            break;
        }
      }
    };
    fun(state);
  }
};

// actions
const actions = {
  /**
   * Логин админа, пока так)
   */
  adminLogIn({ commit }) {
    commit("adminLogIn", true);
  },
  /**
   * Выход из админки
   */
  adminLogOut({ commit }) {
    commit("adminLogIn", false);
  },
  /**
   * Отправка и получение данных от формы
   * @param commit
   * @param dispatch
   * @param form
   * @return {Promise<string>}
   */
  async logIn({ commit, state }, form) {
    return ApiService.logIn(form)
      .then(obj => {
        if (obj.admission.isAccessEmail) {
          commit("setAllInformation", obj.data);
          commit("parseAllInformation", obj);
          ClientInformationManagement.saveUserInformation(state);
          return "";
        } else {
          state.email = obj.data.email;
          ClientInformationManagement.saveEmail(obj.email);
          return ApiService.ERROR.NOT_ACCESS_EMAIL;
        }
      })
      .catch(err => {
        //if (err === ApiService.ERROR.SERVE || ApiService.ERROR.CONNECTION) {
        //return dispatch("logIn", form); //TODO: сделать интервал и счесчик (лучше вынести в отдельную функцию)
        //} else {
        return err.message;
        //}
      });
  },
  /**
   * Отправка и получение данных при регистрации
   *
   * @param state
   * @param dispatch
   * @param form
   * @return {Promise<string>}
   */
  async signUp({ state }, form) {
    return ApiService.signUp(form)
      .then(({ email }) => {
        state.email = email;
        ClientInformationManagement.saveEmail(email);
        return "";
      })
      .catch(err => {
        //if (err === ApiService.ERROR.SERVE || ApiService.ERROR.CONNECTION) {
        //return dispatch("signUp", form); //TODO: сделать интервал и счесчик (лучше вынести в отдельную функцию)
        //} else {
        return err.message;
        //}
      });
  },

  /**
   * Подтверждение почты
   *
   * @param commit
   * @param state
   * @param dispatch
   * @return {Promise<String>}
   */
  async accessEmail({ commit, state, dispatch }) {
    return ApiService.accessEmail(state.email)
      .then(obj => {
        if (obj.admission.isAccessEmail) {
          commit("setAllInformation", obj.data);
          commit("parseAllInformation", obj);
          ClientInformationManagement.saveUserInformation(state);
          return "";
        } else {
          state.email = obj.data.email;
          ClientInformationManagement.saveEmail(obj.email);
          return dispatch("accessEmail"); //TODO: сделать интервал и счесчик (лучше вынести в отдельную функцию)
        }
      })
      .catch(err => {
        //if (err === ApiService.ERROR.SERVE || ApiService.ERROR.CONNECTION) {
        //return dispatch("accessEmail"); //TODO: сделать интервал и счесчик (лучше вынести в отдельную функцию)
        //} else {
        return err.message;
        //}
      });
  },
  /**
   * Отправка письма заново
   *
   * @param state
   * @param dispatch
   * @return {Promise<String>}
   */
  async sendingConfirmAgain({ state }) {
    return ApiService.sendingConfirmAgain(state.email)
      .then(() => "")
      .catch(err => {
        //if (err === ApiService.ERROR.SERVE || ApiService.ERROR.CONNECTION) {
        //return dispatch("sendingConfirmAgain"); //TODO: сделать интервал и счесчик (лучше вынести в отдельную функцию)
        //} else {
        return err.message;
        //}
      });
  },

  /**
   * Отправка формы с email для восстановление пароля
   *
   * @param form
   * @return {Promise<string>}
   */
  async passwordRecovery({ state }, form) {
    const email = form["email"].value;
    return ApiService.passwordRecovery(form)
      .then(() => {
        state.email = email;
        console.log("email", email);
        ClientInformationManagement.saveEmail(email);
        return "";
      })
      .catch(err => {
        return err.message;
      });
  },

  /**
   * Отправка кода подтверждения
   *
   * @param form
   * @return {Promise<string>}
   */
  async sendingCodeFromLetter(data, form) {
    const email = ClientInformationManagement.getEmail();
    return ApiService.sendingCodeFromLetter(form, email)
      .then(() => {
        return "";
      })
      .catch(err => {
        return err.message;
      });
  },

  /**
   * Обновление пароля
   *
   * @param form
   * @return {Promise<string>}
   */
  async passwordUpdate(data, form) {
    const email = ClientInformationManagement.getEmail();
    return ApiService.passwordUpdate(form, email)
      .then(() => {
        ClientInformationManagement.deleteEmail();
        return "";
      })
      .catch(err => {
        return err.message;
      });
  },

  /**
   * Подпска на рассылку
   *
   * @param form
   * @return {Promise<string>}
   */
  async newsLetterSubscription(data, form) {
    return ApiService.newsLetterSubscription(form)
      .then(() => "")
      .catch(err => {
        return err.message;
      });
  },

  /**
   * Настройка аккаунта
   *
   * @param commit
   * @param form
   * @return {Promise<String>}
   */
  async settingAccount({ commit }, form) {
    return ApiService.settingAccount(form)
      .then(obj => {
        commit("setAllInformation", obj.data);
        commit("parseAllInformation", obj);
        ClientInformationManagement.saveUserInformation(state);
        return "";
      })
      .catch(err => {
        return err.message;
      });
  },

  /**
   * Получение подробной информации
   *
   * @return {Promise<string>}
   */
  async getDetailedInformation({ state, commit }) {
    return ApiService.getDetailedInformation(state.email)
      .then(obj => {
        commit("parseAllInformation", obj);
        return "";
      })
      .catch(err => {
        return err.message;
      });
  },
  /**
   * Выход из аккаунта
   *
   * @param commit
   */
  logOut({ commit }) {
    commit("setAllDefaultInformation");
    ClientInformationManagement.deleteUserInformation();
  },
  async loadPhoto({ state }) {
    if (!state.admission.isDefaultPhoto) {
      ApiService.loadPhoto(state.image)
        .then(img => (state.image = URL.createObjectURL(img)))
        .catch(e => console.log(e));
      return "photoIsLoading";
    } else {
      return "defaultPhoto";
    }
  },

  /**
   * Получение старой сессии
   *
   * @param commit
   */
  getOldSession({ commit }) {
    let obj = ClientInformationManagement.getUserInformation();
    if (obj) {
      commit("setAllInformation", obj);
    }
  },

  /**
   * Получение почты из хранилища (при подтверждении)
   *
   * @param state
   */
  getOldEmail({ state }) {
    let str = ClientInformationManagement.getEmail();
    if (str) {
      state.email = str;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
