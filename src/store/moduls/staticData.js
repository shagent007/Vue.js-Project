// initial state
const state = {
  accountFinance: {
    title: "мой кошелек",
    balance: "Мой баланс:",
    balls: "Мой баланс:",
    btnGroup: ["пополнить", "перевести", "вывести", "оплатить игру 100 дней"],
    tableTitle: "финансовый отчет"
  },
  accountFunctional: {
    tabButtons: [
      { title: "Добавить Видео", tab: true },
      { title: "Добавить Новости", tab: false }
    ],
    uploadImg: "../assets/upload.svg",
    button: "Опубликовать",
    video: {
      Labels: {
        title: "Название",
        description: "Описание"
      },
      upload: "Загрузить Видео"
    },
    news: {
      Labels: {
        title: "Название",
        description: "Краткое описание",
        text: "Текст новости",
        placeholder: "Просто начните писать"
      },
      upload: "Загрузить картинку"
    },
    test: {
      Labels: {
        questionNum: "Вопрос №",
        answerNum: {
          start: "Введите ",
          end: "-вариант ответа"
        },
        variant: "Введите свой вариант ответа"
      },
      isVariant: "Ввести 4 варианта ответа",
      noVariant: "Открытый вариант ответа"
    }
  },
  accountTeam: {
    teamList: "список команды",
    removeFromTeam: "Исключить из команды",
    teamApp: "Заявки в команду",
    accertToTeam: "Принять в команду",
    exclude: "Исключить",
    remove: "Удалить",
    showResults: "Показать результаты теста",
    result: {
      title: "результаты теста участника",
      questionNum: "Вопрос №",
      answerNum: "Ответ:"
    }
  },
  confirm: {
    title: "Подтверждение E-MAIL",
    text: {
      start: "На",
      end:
        "отправлено письмо Передайте по ссылке в письме для подтверждение своего email"
    },
    blue: "Письмо не пришло? Отправить ещё раз? "
  },
  confirmed: {
    title: "Учётная запись подтверждена",
    button: "Вернуться на главную страницу"
  },
  ggSortButtons: "Сортировка",
  ggValidationError: {
    importantField: "Обязательное поле!",
    passwordMismatch: "Пароли не совпадают!",
    fieldIncorrect: "Поле заполнено некорректно!",
    newPasswordSameOldOne: "Новый пароль совпадает со старым!",
    sameAsOldPassword: "Пароль не совпадает со старым!",
    minSymbol: {
      start: "Поле должно содержать как минимум",
      end: "символов"
    },
    maxSymbol: {
      start: "Поле не должно содержать более",
      end: "символов"
    }
  },
  informationCard: "КОМАНДА",
  NewsItem: "Читать далее",
  topNav: {
    contactInformation: {
      telephoneNumber: "+7 (916) 006-88-82",
      email: "lideryupravlenia@yandex.ru"
    },
    inputPlaceHolder: "Поиск...",
    languages: {
      first: "RU",
      second: "EN"
    }
  },
  ggHeader: {
    brand: {
      bottomSiteName: "ГЛОБАЛЬНАЯ ИГРА"
    },
    searchPlaceHolder: "Поиск...",
    transitionMenuAuthorization: {
      signIn: "Вход",
      signUp: "Регистрация"
    },
    urlPersonalArea: "Личный кабинет",
    contactInformation: {
      telephoneNumber: {
        text: "+7 (916) 006-88-82"
      },
      email: {
        text: "lideryupravlenia@yandex.ru"
      }
    },
    arrayNavigationButtons: [
      {
        name: "главная",
        href: "/"
      },
      {
        name: "новости",
        href: "/news"
      },
      {
        name: "видео",
        href: "/videos"
      },
      {
        name: "команды",
        href: "/groupPeoplePage/teams"
      },
      {
        name: "рейтинги",
        href: "",
        disabled: true
      },
      {
        name: "проекты",
        href: ""
      }
    ],
    leavingMenuBlocks: [
      {
        title: "О нас",
        arrayNavigationButtons: [
          {
            title: "Видео презентации",
            href: ""
          },
          {
            title: "Экспертный состав",
            href: ""
          },
          {
            title: "Рабочие группы",
            href: ""
          },
          {
            title: "Положения глобальной игры",
            href: ""
          },
          {
            title: "Правила глобальной игры",
            href: ""
          },
          {
            title: "Партнёрские соглашения",
            href: ""
          },
          {
            title: "Продюсерский центр",
            href: ""
          },
          {
            title: "Пресс центр глобальной игры",
            href: ""
          },
          {
            title: "Контакты",
            href: "/contact"
          }
        ]
      },
      {
        title: "Участники глобальной игры",
        arrayNavigationButtons: [
          {
            title: "Тренерский состав глобальной игры",
            href: "/GroupPeoplePage/trainers"
          },
          {
            title: "Бизнес-наставники глобальной игры",
            href: "/GroupPeoplePage/mentors"
          },
          {
            title: "Игроки глобальной игры",
            href: "/GroupPeoplePage/competitors"
          },
          {
            title: "Бизнес-советники глобальной игры",
            href: ""
          },
          {
            title: "Эксперты глобальной игры",
            href: ""
          },
          {
            title: "Инвесторы глобальной игры",
            href: ""
          },
          {
            title: "Большевики глобальной игры",
            href: ""
          }
        ]
      },
      {
        title: "Лица",
        arrayNavigationButtons: [
          {
            title: "Президент",
            href: ""
          },
          {
            title: "Вице-президент",
            href: ""
          },
          {
            title: "Научный руководитель проекты",
            href: ""
          },
          {
            title: "Пресс-секретарь",
            href: ""
          },
          {
            title: "Эксперты состав",
            href: ""
          }
        ]
      },
      {
        title: "КОМАНДЫ",
        arrayNavigationButtons: [
          {
            title: "Команды глобальной игры",
            href: ""
          },
          {
            title: "Рейтинги",
            href: ""
          },
          {
            title: "Видео",
            href: ""
          }
        ]
      }
    ]
  },
  ggFooter: {
    title: "ЛИДЕРЫ УПРАВЛЕНИЯ",
    aboutProject: "О проекте",
    emailPlaceHolder: "Введите свой Email",
    informationAboutProject:
      "Коммуникативная интерактивная платформа по формированию и подготовке международных профессиональных управленческих команд.",
    contact: {
      title: "Подпишитесь на наши новости",
      buttonName: "ПОДПИСАТЬСЯ",
      numberPhone: "+7 (916) 006-88-82",
      email: "lideryupravlenia@yandex.ru",
      location: "г. Москва, ул. Большая Филевская, д. 29"
    },
    subscription: {
      title: "Подпишитесь на наши новости",
      placeholder: "Введите свой Email",
      buttonName: "ПОДПИСАТЬСЯ"
    },
    lang: {
      title: "@ Все права защищены",
      russia: "RU",
      english: "EN"
    },
    menu: [
      { title: "Главная", path: "/" },
      { title: "Новости", path: "/news" },
      { title: "Тренеры", path: "/GroupPeoplePage/trainers" },
      { title: "Наставники", path: "/GroupPeoplePage/mentors" },
      { title: "Команды", path: "/groupPeoplePage/teams" },
      { title: "Проекты", path: "" },
      { title: "Рабочие группы", path: "" },
      { title: "Обратная связь", path: "/feedback" }
    ]
  },
  fogotPassword: {
    emailPlaceholder: "Адрес электронной почты",
    confirmEmailPlaceholder: "Введите код из почты",
    confirmEmail: "Проверьте свою почту",
    buttonName1: "Отправить",
    buttonName2: "Ввести код",
    buttonName3: "Подтвердить",
    informationForgotPasswordFirst:
      "Код для смены пароля, а так же ваши регистрационные данные, будут высланы вам по E-mail",
    newPasswordPlaceholder: "Введите новый пароль",
    confirmPasswordPlaceholder: "Подтвердите новый пароль",
    dialogue: {
      theme: "ВОССТАНОВЛЕНИЕ ПАРОЛЯ",
      button: "Войти"
    }
  },
  logIn: {
    questionNewUser: "Новый пользователь?",
    buttonNameSignUp: "Зарегистрироваться",
    emailPlaceholder: "Адрес электронной почты",
    passwordPlaceholder: "Введите пароль",
    buttonNameForgotPassword: "Забыли пароль?",
    buttonNameSignIn: "Войти",
    buttonNamePrivacyPolicy: "Политика конфиденциальности",
    dialogue: {
      theme: "ВОЙТИ",
      button: "Войти"
    }
  },
  accountSetting: {
    bigTitle: "Настройка профиля",
    title: "Сведения об учётной записи",
    textPhotoLoader: "Для загрузки новой фотографии кликните на аватар",
    emailPlaceholder: "Адрес электронной почты",
    firstName: "Имя",
    secondName: "Фамилия",
    patronymic: "Отчество",
    titleChangePassword: "Изменить пароль",
    oldPassword: "Введите старый пароль",
    newPassword: "Введите новый пароль",
    confirmPassword: "Подтвердите новый пароль",
    titlePersonalData: "Личные данные",
    titleSex: "Пол",
    indicateSex: "Укажите пол",
    dateBirth: "Дата рождения",
    day: "День",
    month: "Месяц",
    year: "Год",
    titleLocation: "Местоположение",
    country: "Страна",
    district: "Область, край",
    city: "Город",
    titleRepresentativeRegion: "Представитель региона",
    trainer: "Должность",
    littleBitAboutYourself: "Немного о себе",
    progress: "Достижения",
    buttonName: "Сохранить",
    months: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ],
    genderOptions: ["Мужской", "Женский"]
  },
  feedBack: {
    title: "Обратная связь",
    name: "Имя",
    email: "Адрес электронной почты",
    theme: "Тема сообщения",
    phone: "Телефон",
    message: "Текст сообщения",
    button: "отправить"
  },
  page404: {
    title: "запрашиваемая Вами страница не найдена",
    link: "Вернуться на главную"
  },
  peopleInformationCard: {
    age: "Возраст: ",
    about: "О себе: ",
    location: "Местоположение: ",
    progress: "Достижения:",
    inputPlaceholder: "Написать сообщение участнику",
    button: "Отправить"
  },
  signUp: {
    dialogue: {
      theme: "Регистрация",
      button: "Регистрация"
    },
    isLogIn: "Уже зарегистрированы?",
    logIn: "Войти",
    email: "Адрес электронной почты",
    name: "Имя",
    surName: "Фамилия",
    password: "Введите пароль",
    passwordConfirm: "Подтвердите пароль",
    date: {
      label: "Дата рождения",
      day: "День",
      month: "Месяц",
      year: "Год"
    },
    location: {
      label: "Местоположения",
      country: "Страна",
      town: "Город",
      region: "Регион"
    },
    gender: {
      name: "Пол",
      genderOptions: ["Женский", "Мужской", "Другое..."]
    },
    role: {
      label: "Представитель региона",
      rank: "Должность"
    },
    acceptPolicy: "Я согласен на обработку персональных данных",
    reg: "Регистрация",
    privacyPolicy: "Политика конфиденциальности",
    months: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ]
  },
  testPage: {
    title: "Test",
    questionNum: "Вопрос №",
    variantNum: "Вариант ответа №",
    answer: "Введите свой вариант ответа",
    button: "отправить"
  },
  newsCategoryItem: {
    allNewsCategory: "Все новости"
  }
};

// getters
const getters = {
  ACCOUNT_FINANCE: state => state.accountFinance,
  ACCOUNT_FUNCTIONAL: state => state.accountFunctional,
  ACCOUNT_TEAM: state => state.accountTeam,
  ACCOUNT_SETTING: state => state.accountSetting,
  CONFIRM: state => state.confirm,
  CONFIRMED: state => state.confirmed,
  GG_SORT_BUTTONS: state => state.ggSortButtons,
  GG_VALIDATION_ERROR: state => state.ggValidationError,
  INFORMATION_CARD: state => state.informationCard,
  NEWS_ITEM: state => state.NewsItem,
  NEWS_ITEM_CATEGORY: state => state.newsCategoryItem,
  TOP_NAV: state => state.topNav,
  GG_HEADER: state => state.ggHeader,
  GG_FOOTER: state => state.ggFooter,
  FOGOT_PASSWORD: state => state.fogotPassword,
  LOG_IN: state => state.logIn,
  FEEDBACK: state => state.feedBack,
  PAGE_404: state => state.page404,
  PEOPLE_INFORMATION_CARD: state => state.peopleInformationCard,
  SIGN_UP: state => state.signUp,
  TEST_PAGE: state => state.testPage
};

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
