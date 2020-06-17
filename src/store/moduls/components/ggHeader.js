import ggMain from "./ggMain";
// initial state
const state = {
  brand: {
    topSiteName: "ЛИДЕРЫ УПРАВЛЕНИЯ",
    bottomSiteName: "ГЛОБАЛЬНАЯ ИГРА"
  },
  transitionMenuAuthorization: {
    signIn: "Вход",
    signUp: "Регистрация"
  },
  urlPersonalArea: "Личный кабинет",
  contactInformation: {
    telephoneNumber: {
      text: "+7 495 777-777"
    },
    email: {
      text: "100days@mail.ru"
    }
  },
  arrayNavigationButtons: [
    {
      name: "главная",
      href: "/"
    },
    {
      name: "новости",
      href: "/News"
    },
    {
      name: "видео",
      href: "/Videos"
    },
    {
      name: "команды",
      href: "/GroupPeoplePage/participants"
    },
    {
      name: "рейтинги",
      href: "/News"
    },
    {
      name: "проекты",
      href: "/LeaderWay"
    }
  ],
  leavingMenuBlocks: [
    {
      title: "О нас",
      arrayNavigationButtons: [
        {
          title: "Видео презентации",
          href: "/teams"
        },
        {
          title: "Команды",
          href: "/GroupPeoplePage/participants"
        },
        {
          title: "Экспертный состав",
          href: "/mentors"
        },
        {
          title: "Рабочие группы",
          href: "/workingGroups"
        },
        {
          title: "Положения глобальной игры",
          href: "/workingGroups"
        },
        {
          title: "Правила глобальной игры",
          href: "/workingGroups"
        },
        {
          title: "Партнёрские соглашения",
          href: "/workingGroups"
        },
        {
          title: "Продюсерский центр",
          href: "/workingGroups"
        },
        {
          title: "Пресс центр глобальной игры",
          href: "/workingGroups"
        },
        {
          title: "Контакты",
          href: "/FeedBack"
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
          href: "/GroupPeoplePage/participants"
        },
        {
          title: "Бизнес-советники глобальной игры",
          href: "/trainers"
        },
        {
          title: "Эксперты глобальной игры",
          href: "/mentors"
        },
        {
          title: "Инвесторы глобальной игры",
          href: "/workingGroups"
        },
        {
          title: "Большевики глобальной игры",
          href: "/workingGroups"
        }
      ]
    },
    {
      title: "Лица",
      arrayNavigationButtons: [
        {
          title: "Президент",
          href: "/"
        },
        {
          title: "Вице-президент",
          href: "/teams"
        },
        {
          title: "Научный руководитель проэкты",
          href: "/trainers"
        },
        {
          title: "Пресс-секретарь",
          href: "/mentors"
        },
        {
          title: "Эксперны состав",
          href: "/workingGroups"
        }
      ]
    },
    {
      title: "КОМАНДЫ",
      arrayNavigationButtons: [
        {
          title: "Команды глобальной игры",
          href: "/"
        },
        {
          title: "Рейтинги",
          href: "/teams"
        },
        {
          title: "Видео",
          href: "/trainers"
        }
      ]
    }
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
  mutations,
  modules: {
    ggMain
  }
};
