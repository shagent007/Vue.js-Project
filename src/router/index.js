import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Pages/Home";

import store from "../store";

import admin from "./middleware/admin";
import guestAdminPanel from "./middleware/guestAdminPanel";
import middlewarePipeline from "./middlewarePipeline";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/admin",
    name: "AdminPanel",
    component: () => import("@/AdminPanel"),
    children: [
      {
        path: "gg/activity",
        name: "AdminPanelGGActivity",
        meta: {
          middleware: [admin]
        },
        component: () => import("@/AdminPanel/views/gg/Activity")
      },
      {
        path: "gg/visits",
        name: "AdminPanelGGVisits",
        meta: {
          middleware: [admin]
        },
        component: () => import("@/AdminPanel/views/gg/Visits")
      },
      {
        path: "gg/finance",
        name: "AdminPanelGGFinance",
        meta: {
          middleware: [admin]
        },
        component: () => import("@/AdminPanel/views/gg/Finance")
      },
      {
        path: "gg/teams",
        name: "AdminPanelGGTeams",
        meta: {
          middleware: [admin]
        },
        component: () => import("@/AdminPanel/views/gg/Teams")
      },
      {
        path: "gg/news",
        name: "AdminPanelGGNews",
        meta: {
          middleware: [admin]
        },
        component: () => import("@/AdminPanel/views/gg/News"),
        children: [
          {
            path: "edit",
            name: "AdminPanelGGNewsEdit",
            meta: {
              middleware: [admin]
            },
            component: () => import("@/AdminPanel/views/gg/News/Edit.vue")
          }
        ]
      },
      {
        path: "gg/videos",
        name: "AdminPanelGGVideos",
        meta: {
          middleware: [admin]
        },
        component: () => import("@/AdminPanel/views/gg/Videos"),
        children: [
          {
            path: "edit",
            name: "AdminPanelGGVideosEdit",
            meta: {
              middleware: [admin]
            },
            component: () => import("@/AdminPanel/views/gg/Videos/Edit")
          }
        ]
      },
      {
        path: "gg/tests",
        name: "AdminPanelGGTests",
        meta: {
          middleware: [admin]
        },
        component: () => import("@/AdminPanel/views/gg/Tests"),
        children: [
          {
            path: "edit",
            name: "AdminPanelGGTestsEdit",
            meta: {
              middleware: [admin]
            },
            component: () => import("@/AdminPanel/views/gg/Tests/Edit")
          }
        ]
      }
    ]
  },
  {
    path: "/LogIn",
    name: "LogIn",
    component: () => import("../views/Forms/LogIn")
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: () => import("../views/Forms/SignUp")
  },
  {
    path: "/e-mail/:page",
    name: "Email",
    component: () => import("../views/Email")
  },
  {
    path: "/ForgotPassword1",
    name: "ForgotPassword1",
    component: () => import("../views/Forms/ForgotPassword1")
  },
  {
    path: "/ForgotPassword2",
    name: "ForgotPassword2",
    component: () => import("../views/Forms/ForgotPassword2")
  },
  {
    path: "/ForgotPassword3",
    name: "ForgotPassword3",
    component: () => import("../views/Forms/ForgotPassword3")
  },
  {
    path: "/Policy",
    name: "Policy",
    component: () => import("../views/StaticPages/Policy")
  },
  {
    path: "/how-to-order",
    name: "Order",
    component: () => import("../views/StaticPages/Order.vue")
  },
  {
    path: "/payment/:page",
    name: "Payment",
    component: () => import("../views/StaticPages/Payment")
  },
  {
    path: "/contacts",
    name: "contacts",
    component: () => import("../views/StaticPages/Contacts.vue")
  },
  {
    path: "/News",
    name: "News",
    component: () => import("../views/News/News")
  },
  {
    path: "/NewsCategory/:category",
    name: "NewsCategory",
    component: () => import("../views/News/NewsCategory")
  },
  {
    path: "/NewsArticle/:id",
    name: "NewsArticle",
    component: () => import("../views/News/NewsArticle")
  },
  {
    path: "/account/setting",
    name: "AccountSetting",
    component: () => import("../views/Forms/AccountSetting")
  },
  {
    path: "/LeaderWay",
    name: "LeaderWay",
    component: () => import("../views/StaticPages/LeaderWay")
  },
  {
    path: "/videos",
    name: "Videos",
    component: () => import("../views/Videos/Videos")
  },
  {
    path: "/VideosCategory/:category",
    name: "VideosCategory",
    component: () => import("../views/Videos/VideosCategory")
  },
  {
    path: "/VideoPage/:id",
    name: "VideoPage",
    component: () => import("../views/Videos/VideoPage")
  },
  {
    path: "/GroupPeoplePage/:group",
    name: "GroupPeoplePage",
    component: () => import("../views/Pages/GroupPeoplePage")
  },
  {
    path: "/GroupPeoplePage/:group/:id",
    name: "PeopleInformationCard",
    component: () => import("../views/Pages/PeopleInformationCard")
  },
  {
    path: "/account/files",
    component: () => import("../views/Account"),
    children: [
      {
        path: "/",
        name: "AccountFiles",
        component: () => import("../views/Account/Files/Index")
      },
      {
        path: "video",
        name: "AccountEditVideo",
        props: true,
        component: () => import("../views/Account/Files/Edit/Video")
      },
      {
        path: "news",
        name: "AccountEditNews",
        props: true,
        component: () => import("../views/Account/Files/Edit/News")
      }
    ]
  },
  {
    path: "/account/team",
    name: "AccountTeam",
    component: () => import("../views/Account"),
    children: [
      {
        path: "",
        props: true,
        name: "AccountTeamInfo",
        component: () => import("../views/Account/Team/Info")
      },
      {
        path: "test/:type",
        name: "AccountCreateTest",
        component: () => import("../views/Account/Team/CreateTest")
      }
    ]
  },
  {
    path: "/account/:page",
    name: "Account",
    component: () => import("../views/Account")
  },
  {
    path: "/account/",
    redirect: "/account/profile"
  },
  {
    path: "/GroupPeoplePage/teams/:id/:test",
    name: "Test",
    component: () => import("../views/Pages/Test")
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: () => import("../views/Forms/Feedback")
  },
  {
    path: "/team/:id",
    name: "Team",
    component: () => import("../views/Pages/Team")
  },
  // обработка некорректных ссылок
  {
    path: "*",
    name: "Page404",
    component: () => import("../views/StaticPages/Page404")
  }
];

const router = new VueRouter({
  routes
});

// работа с middleware`ми
router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware;

  // есть ли middleware
  if (!middleware) {
    return next();
  }

  const context = {
    to,
    from,
    next,
    store
  };

  return middleware[0]({
    ...context,
    // начинает следующий middleware
    next: middlewarePipeline(context, middleware, 1)
  });
});

export default router;
