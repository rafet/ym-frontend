import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Customers from "../views/Customers.vue";
import Customer from "../views/Customer.vue";
import MediaOrgans from "../views/MediaOrgans.vue";
import MediaOrganTypes from "../views/MediaOrganTypes.vue";
import Pollsters from "../views/Pollsters.vue";
import Reports from "../views/Reports.vue";
import UserDashboard from "../views/UserDashboard.vue";
import UserMediaOrgans from "../views/UserMediaOrgans.vue";
import UserMedias from "../views/UserMedias.vue";
import UserReports from "../views/UserReports.vue";
import UserSurveys from "../views/UserSurveys.vue";
import PollsterSurveys from "../views/PollsterSurveys.vue";
import PollsterSurvey from "../views/PollsterSurvey.vue";
import PollsterLogin from "../views/PollsterLogin.vue";

Vue.use(VueRouter);

import VueJwtDecode from "vue-jwt-decode";

const ifAuthenticated = (to, from, next) => {
  const token = Vue.ls.get("token");

  const authUser = Vue.ls.get("token");

  if (to.meta.requiresAuth) {
    if (authUser) {
      const { role } = VueJwtDecode.decode(token);

      if (to.meta.roles && to.meta.roles.length > 0) {
        if (to.meta.roles.includes(role)) {
          next();
        } else {
          next("/");
        }
      } else {
        next();
      }
    } else {
      Vue.ls.clear();
      next({ name: "Login" });
    }
  } else {
    next();
  }
};

const ifNotAuthenticated = (to, from, next) => {
  const authUser = Vue.ls.get("token");
  if (!authUser) {
    next();
  } else {
    next("/");
  }
};

const routes = [
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: ifNotAuthenticated,
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: ifNotAuthenticated,
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/admin",
    name: "Customers",
    component: Customers,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "admin",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/customers",
    name: "Customers",
    component: Customers,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "admin",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/customers/:id",
    name: "Customer",
    component: Customer,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "admin",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/media-organs",
    name: "MediaOrgans",
    component: MediaOrgans,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "admin",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/media-organ-types",
    name: "MediaOrganTypes",
    component: MediaOrganTypes,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "admin",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/pollsters",
    name: "Pollsters",
    component: Pollsters,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "admin",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/reports",
    name: "Reports",
    component: Reports,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "admin",
      requiresAuth: true,
    },
  },

  {
    path: "/dashboard",
    name: "UserDashboard",
    component: UserDashboard,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "user",
      requiresAuth: true,
    },
  },

  {
    path: "/media-organs",
    name: "UserMediaOrgans",
    component: UserMediaOrgans,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "user",
      requiresAuth: true,
    },
  },
  {
    path: "/medias",
    name: "UserMedias",
    component: UserMedias,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "user",
      requiresAuth: true,
    },
  },
  {
    path: "/reports",
    name: "UserReports",
    component: UserReports,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "user",
      requiresAuth: true,
    },
  },
  {
    path: "/surveys",
    name: "UserSurveys",
    component: UserSurveys,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "user",
      requiresAuth: true,
    },
  },
  {
    path: "/pollster/surveys",
    name: "PollsterSurveys",
    component: PollsterSurveys,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "pollster",
      requiresAuth: true,
    },
  },
  {
    path: "/pollster/surveys/:id",
    name: "PollsterSurvey",
    component: PollsterSurvey,
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "pollster",
      requiresAuth: true,
    },
  },
  {
    path: "/pollster/login",
    name: "PollsterLogin",
    component: PollsterLogin,
    beforeEnter: ifNotAuthenticated,
    meta: {
      layout: "admin",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
