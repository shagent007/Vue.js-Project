import Vue from "vue";
import Vuex from "vuex";

import accountSetting from "./moduls/accountSetting";
import home from "./moduls/home";
import videos from "./moduls/videos";
import news from "./moduls/news";
import userInformation from "./global/userInformation";
import mainLayout from "./moduls/components/mainLayout";
import groupPeoplePage from "./moduls/groupPeoplePage";
import rating from "./moduls/components/rating";
import test from "./moduls/test";
import account from "./moduls/account";
import forgotPasswordAssociation from "./moduls/forgotPasswordAssociation";
import logIn from "./moduls/logIn";
import signUp from "./moduls/signUp";
import accountProfile from "./moduls/accountProfile";
import staticData from "./moduls/staticData";
import accountFiles from "./moduls/accountFiles";
import feedback from "./moduls/feedback";
import chat from "./moduls/chat";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: !Vue.config.productionTip,
  modules: {
    accountFiles,
    accountSetting,
    accountProfile,
    forgotPasswordAssociation,
    logIn,
    home,
    videos,
    news,
    userInformation,
    mainLayout,
    groupPeoplePage,
    rating,
    account,
    test,
    staticData,
    feedback,
    chat,
    signUp
  }
});
