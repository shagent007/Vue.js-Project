//import ApiService from "../../model/ApiService";

const titleNameProfile = "Ф.И.О:";
const titleEmailProfile = "E-mail:";
const titleDateBirthProfile = "Дата рождения:";
const titleLocationProfile = "Город:";
const titleGenderProfile = "Пол:";
const titleRoleProfile = "Должность:";
const titleAboutUser = "О себе:";
const titleAchievements = "Достижения:";
const titleProfessionalRating = "Профессиональный рейтинг:";
const titleNumberProjects = "Проекты:";
const titleProjectRating = "Проектный рейтинг:";
const titleNumberTeams = "Команд:";
const titleTeamRating = "Командный рейтинг:";

const state = {
  professionalRating: 0,
  numberProjects: 0,
  projectRating: 0,
  numberTeams: 0,
  teamRating: 0,
  info: [
    "fullname",
    "email",
    "birthday",
    "city",
    "gender",
    "role",
    "about",
    "achievements",
    "professionalRating",
    "projects",
    "projectRating",
    "teams",
    "teamRating"
  ]
};

// getters
const getters = {
  BRIEF_INFORMATION: state => state.info,
  briefInformation: state => obj => {
    return [
      {
        title: titleNameProfile,
        info: obj.name
      },
      {
        title: titleEmailProfile,
        info: obj.email
      },
      {
        title: titleDateBirthProfile,
        info: obj.dateBirth
      },
      {
        title: titleGenderProfile,
        info: obj.gender
      },
      {
        title: titleLocationProfile,
        info: obj.location
      },
      {
        title: titleRoleProfile,
        info: obj.role
      },
      {
        title: titleProfessionalRating,
        info: state.professionalRating
      }
    ];
  },
  briefMentorInformation: state => {
    return [
      {
        title: titleNumberProjects,
        info: state.numberProjects
      },
      {
        title: titleProjectRating,
        info: state.projectRating
      },
      {
        title: titleNumberTeams,
        info: state.numberTeams
      },
      {
        title: titleTeamRating,
        info: state.teamRating
      }
    ];
  },
  detailedInformation: () => obj => {
    return [
      {
        title: titleAboutUser,
        info: obj.aboutUser
      },
      {
        title: titleAchievements,
        info: obj.achievements
      }
    ];
  }
};

// actions
const actions = {};

// mutations
const mutations = {
  setAllInformation(state, obj) {
    for (let key in obj)
      if (key in state) {
        state[key] = obj[key];
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
