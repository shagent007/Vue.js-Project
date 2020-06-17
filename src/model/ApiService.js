/**
 * класс для отправки и приема данны с сервера
 */
export default class ApiService {
  static KEY_CLASS = "ApiService";

  static PATH = "http://localhost:3000";

  //отправка за данными для аккаунта url-ы
  static URLS_ACCOUNT = {
    LOG_IN: `${this.PATH}/api/auth/login`, //для входа
    SIGN_UP: `${this.PATH}/api/auth/register`, //регистрация
    ACCESS_EMAIL: `${this.PATH}/api/auth/access`, //подтверждение почты
    RE_ACCESS_EMAIL: `${this.PATH}/api/auth/repeatEmail`, //TODO: переотправка
    SETTING_ACCOUNT: `${this.PATH}/api/form/setting`, //настройка аккаунта
    PASSWORD_RECOVERY: `${this.PATH}/api/auth/resetPassword`, //отправка email при востановлении пароля
    SENDING_CODE_FROM_LETTER: `${this.PATH}/api/auth/comparisonToken`, //отправка кода при востановлении пароля
    PASSWORD_UPDATE: `${this.PATH}/api/auth/newPassword`, //отправка пароля при востановлении пароля
    NEWS_LETTER_SUBSCRIPTION: `${this.PATH}/api/form/subscribeToUs`, //подписка на рассылку
    GET_DETAILED_INFORMATION: `${this.PATH}/api/info/infoUser`, //получение детальной информации
    FEEDBACK: `${this.PATH}/api/form/feedback` //фидбэк
  };

  //отправка за данными url-ы
  static URLS_INFORMATION = {
    URL_GET_ALL_MENTORS: `${this.PATH}/api/users/getAllMentors`, //получение всех наставников
    URL_GET_ALL_TRAINERS: `${this.PATH}/api/users/getAllCoachs`, //получение всех тренеров
    URL_GET_ALL_COMPETITORS: `${this.PATH}/api/users/getAllUsers`, //получение всех участников
    URL_GET_NEWS_JSON: `${this.PATH}/api/news/getAllNews`, //получение новостей
    URL_GET_NEWS_BY_ID: `${this.PATH}/api/news/getNewsById`, //получение новости по id
    ADD_NEWS: `${this.PATH}/api/news/createNews`, //добавление новости
    ADD_VIDEO: `${this.PATH}/api/video/createVideo`, //добавление видео
    ADD_TEST: `${this.PATH}/api/video/createVideo`, //добавление теста
    URL_GET_VIDEOS_JSON: `${this.PATH}/api/video/getAllVideo` //получение всех видео
  };

  static ERROR = {
    CONNECTION: "Connection Error", //ошибка отправки или подключения
    USER_IS_NOT_FOUND: "User is not found", //пользователь не найден
    PASSWORD_IS_NOT_MATCH: "Password is not match", //невеный пароль
    EMAIL_ALREADY_EXIST: "This email already exist!", //email уже используется
    NO_PEOPLES_AVAILABLE: "No peoples available", //нет сохраненых пользователей
    ERROR_NEWS_NOT_FOUND: "News is not found", //на сервере новости не найдены
    SERVE: "Serve Error", //ошибка отправки данных на сервере
    NOT_ACCESS_EMAIL: "Not access email", //почта не подтвержденна
    RE_ACCESS_EMAIL: "re-access email", //на почту отправленно переподтверждение
    EMAIL_NOT_FOUND: "Email not found", //почта не найдена
    INCORRECT_CODE: "Incorrect email", //неправильный код
    ERROR_NO_PEOPLES_AVAILABLE: "No peoples available", //люди не найдены
    NEWS_NOT_FOUND: "News not found", //новости не найдены json
    NEWS_BY_ID_NOT_FOUND: "News by id not found" //новость по id не найдена
  };

  /**
   * Вывод ошибки для данного класса
   *
   * @param nameMethod
   * @param error
   */
  static printError(nameMethod, error) {
    console.group(ApiService.KEY_CLASS);
    console.info(nameMethod);
    console.log(error);
    console.groupEnd();
  }

  /**
   * Отправка формы и обработка ошибке при фатальных сбоях
   *
   * @param url
   * @param form
   * @param nameMethod
   * @param headers
   * @return {Promise<Response>}
   */
  static sendForm(url, form, nameMethod, headers = {}) {
    return fetch(url, {
      method: "post",
      body: new FormData(form),
      headers: {
        ...headers
      }
    }).catch(error => {
      this.printError(nameMethod, error);
      throw new Error(this.ERROR.CONNECTION);
    });
  }

  /**
   * Отправка get запроса
   *
   * @param url
   * @param headers
   * @param nameMethod
   * @return {Promise<Response>}
   */
  static sendGetFetch(url, nameMethod, headers = {}) {
    return fetch(url, {
      headers: {
        ...headers
      }
    }).catch(error => {
      this.printError(nameMethod, error);
      throw new Error(this.ERROR.CONNECTION);
    });
  }

  /**
   * Функция для отправки и получения данных при авторизации
   *
   * @param form
   * @return {Promise}
   */
  static async logIn(form) {
    const nameMethod = "LogIn";
    return this.sendForm(this.URLS_ACCOUNT.LOG_IN, form, nameMethod).then(
      response => {
        if (response.ok) {
          //пользователь авторезирован
          return response.json();
        } else if (response.status === 402) {
          //пользователь не найден
          throw new Error(this.ERROR.USER_IS_NOT_FOUND);
        } else if (response.status === 401) {
          //пароль введен неправильно
          throw new Error(this.ERROR.PASSWORD_IS_NOT_MATCH);
        } else {
          //остальные ошибки
          this.printError(nameMethod, response.status);
          throw new Error(this.ERROR.SERVE);
        }
      }
    );
  }

  /**
   * Создание новости
   *
   * @param form
   * @param creatorId
   */
  static async addNews(form, creatorId) {
    const nameMethod = "addNews";
    return this.sendForm(this.URLS_INFORMATION.ADD_NEWS, form, nameMethod, {
      creatorId
    }).then(response => {
      if (response.ok) {
        //новость добавлена
        return response.json();
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }

  /**
   * Добовление видео
   *
   * @param form
   * @param country
   * @param creatorId
   */
  static async addVideo(form, country, creatorId) {
    const nameMethod = "addVideo";
    return this.sendForm(this.URLS_INFORMATION.ADD_VIDEO, form, nameMethod, {
      creatorId,
      location: country
    }).then(response => {
      if (response.ok) {
        //новость добавлена
        return response.json();
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }
  /**
   * Функция для получения и отправки данных при регистрации
   *
   * @param form
   * @return {Promise}
   */
  static async signUp(form) {
    const nameMethod = "signUp";
    return this.sendForm(this.URLS_ACCOUNT.SIGN_UP, form, nameMethod).then(
      response => {
        if (response.ok) {
          //все прошло успешно
          return response.json();
        } else if (response.status === 409) {
          //email уже существует
          throw new Error(this.ERROR.EMAIL_ALREADY_EXIST);
        } else {
          //остальные ошибки
          this.printError(nameMethod, response.status);
          throw new Error(this.ERROR.SERVE);
        }
      }
    );
  }

  /**
   * Отправка запроса на почту
   *
   * @param email
   * @return {Promise}
   */
  static async accessEmail(email) {
    const nameMethod = "accessEmail";
    const headers = { email };
    return this.sendGetFetch(
      this.URLS_ACCOUNT.ACCESS_EMAIL,
      nameMethod,
      headers
    ).then(response => {
      if (response.ok) {
        //все прошло успешно
        return response.json();
      } else if (response.status === 502) {
        //если время превышенно отправляем заново
        return ApiService.accessEmail(email);
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }

  /**
   * повторная отправка запроса на почту
   *
   * @param email
   * @return {Promise<void>}
   */
  static async sendingConfirmAgain(email) {
    const methodName = "sendingConfirmAgain";
    const headers = { email };
    this.sendGetFetch(
      this.URLS_ACCOUNT.RE_ACCESS_EMAIL,
      methodName,
      headers
    ).then(response => {
      if (response.ok) {
        //все прошло успешно
        return response.json();
      } else {
        //остальные ошибки
        this.printError(methodName, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }

  /**
   * Отправка формы с email для восстановление пароля
   *
   * @param form
   * @return {Promise<Response>}
   */
  static async passwordRecovery(form) {
    const nameMethod = "passwordRecovery";
    return this.sendForm(
      this.URLS_ACCOUNT.PASSWORD_RECOVERY,
      form,
      nameMethod
    ).then(response => {
      if (response.ok) {
        //все прошло успешно
        return response.json();
      } else if (response.status === 400) {
        //email не существует
        return this.ERROR.EMAIL_NOT_FOUND;
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }

  /**
   * Отправка кода подтверждения
   *
   * @param form
   * @param email
   * @return {Promise<Response>}
   */
  static async sendingCodeFromLetter(form, email) {
    const nameMethod = "sendingCodeFromLetter";
    return this.sendForm(
      this.URLS_ACCOUNT.SENDING_CODE_FROM_LETTER,
      form,
      nameMethod,
      { email }
    ).then(response => {
      if (response.ok) {
        //все прошло успешно
        return response.json();
      } else if (response.status === 400) {
        //код не верен
        return this.ERROR.INCORRECT_CODE;
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }

  /**
   * Обновление пароля
   *
   * @param form
   * @param email
   * @return {Promise<Response>}
   */
  static async passwordUpdate(form, email) {
    const nameMethod = "passwordUpdate";
    return this.sendForm(this.URLS_ACCOUNT.PASSWORD_UPDATE, form, nameMethod, {
      email
    }).then(response => {
      if (response.ok) {
        //все прошло успешно
        return response.json();
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }

  /**
   * Подпска на рассылку
   *
   * @param form
   * @return {Promise<Response>}
   */
  static async newsLetterSubscription(form) {
    const nameMethod = "newsLetterSubscription";
    return this.sendForm(
      this.URLS_ACCOUNT.NEWS_LETTER_SUBSCRIPTION,
      form,
      nameMethod,
      {}
    ).then(response => {
      if (response.ok) {
        //все прошло успешно
        return response.json();
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }

  /**
   * отправка формы на изменение аккаунта
   *
   * @param form
   * @return {Promise<Response>}
   */
  static async settingAccount(form) {
    const nameMethod = "settingAccount";
    return this.sendForm(
      this.URLS_ACCOUNT.NEWS_LETTER_SUBSCRIPTION,
      form,
      nameMethod
    ).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }

  /**
   * Получение полной информации
   *
   * @param email
   * @return {Promise<Response>}
   */
  static async getDetailedInformation(email) {
    const nameMethod = "getDetailedInformation";
    const headers = { email };
    return this.sendGetFetch(
      this.URLS_ACCOUNT.GET_DETAILED_INFORMATION,
      nameMethod,
      headers
    ).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }

  /**
   * feedback
   *
   * @param form
   * @return {Promise<Response>}
   */
  static async feedback(form) {
    const nameMethod = "feedback";
    return this.sendForm(this.URLS_ACCOUNT.FEEDBACK, form, nameMethod).then(
      response => {
        if (response.ok) {
          return response.json();
        } else {
          //остальные ошибки
          this.printError(nameMethod, response.status);
          throw new Error(this.ERROR.SERVE);
        }
      }
    );
  }

  /**
   * Получение всех новостей
   *
   * @return {Promise<Response>}
   */
  static async getNewsJSON() {
    const nameMethod = "getNewsJSON";
    return this.sendGetFetch(
      this.URLS_INFORMATION.URL_GET_NEWS_JSON,
      nameMethod
    ).then(response => {
      if (response.ok) {
        return response.json;
      } else if (response.status === 400) {
        //новость не найдена
        throw new Error(this.ERROR.NEWS_NOT_FOUND);
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }

  /**
   * Получение новости по id
   *
   * @param id
   * @return {Promise<Response>}
   */
  static async getNewsById(id) {
    const nameMethod = "getNewsById";
    return this.sendGetFetch(
      this.URLS_INFORMATION.URL_GET_NEWS_BY_ID,
      nameMethod,
      { id }
    ).then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status == 400) {
        //новость не найдена
        throw new Error(this.ERROR.NEWS_BY_ID_NOT_FOUND);
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }
  static async getVideosJSON() {
    const nameMethod = "getVideosJSON";

    return this.sendGetFetch(
      this.URLS_INFORMATION.URL_GET_VIDEOS_JSON,
      nameMethod
    ).then(response => {
      if (response.ok) {
        return response.json;
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }

  static async loadPhoto(url) {
    return fetch(url).then(response => {
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error("Error");
      }
    });
  }

  /**
   * Получение всех людей
   *
   * @param group
   * @return {Promise<Response>}
   */
  static async getPeoples(group) {
    const nameMethod = "getPeoples";
    let url;
    switch (group) {
      case "competitors":
        url = this.URLS_INFORMATION.URL_GET_ALL_COMPETITORS;
        break;
      case "trainers":
        url = this.URLS_INFORMATION.URL_GET_ALL_TRAINERS;
        break;
      case "mentors":
        url = this.URLS_INFORMATION.URL_GET_ALL_MENTORS;
        break;
    }
    console.log(url);
    return this.sendGetFetch(url, nameMethod).then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error(this.ERROR.NO_PEOPLES_AVAILABLE);
      } else {
        //остальные ошибки
        this.printError(nameMethod, response.status);
        throw new Error(this.ERROR.SERVE);
      }
    });
  }
}
