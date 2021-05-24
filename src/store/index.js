import Vue from "vue";
import Vuex from "vuex";
import API from "../axios";
import router from "../router";
import VueJwtDecode from "vue-jwt-decode";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    customer: {},
    mediaOrgans: null,
    mediaOrganTypes: [],
    followingMediaOrgans: [],
    customers: null,
    medias: null,
    reports: null,
    feed: null,
    feedCount: null,
    report: null,
    pollsters: [],
    surveys: [],
    pollsterSurveys: [],
    singleSurvey: null
  },
  getters: {
    customer() {
      return Vue.ls.get("customer");
    },
    token() {
      return Vue.ls.get("token");
    },
    customerId(getters) {
      return getters.customer._id;
    },
    userType() {
      return VueJwtDecode.decode(Vue.ls.get("token")).type;
    },
    pollsterId() {
      return VueJwtDecode.decode(Vue.ls.get("token")).pollsterId;
    },
  },
  mutations: {
    SET_CUSTOMER(state, customer) {
      state.customer = customer;
      Vue.ls.set("customer", customer);
      state.followingMediaOrgans = customer.mediaOrgans;
    },
    SET_MEDIA_ORGANS(state, mediaOrgans) {
      state.mediaOrgans = mediaOrgans;
    },

    FOLLOW(state, mediaOrganId) {
      state.followingMediaOrgans.push(mediaOrganId);
    },
    UNFOLLOW(state, mediaOrganId) {
      state.followingMediaOrgans.splice(
        state.followingMediaOrgans.indexOf(mediaOrganId),
        1
      );
    },
    SET_CUSTOMERS(state, customers) {
      state.customers = customers;
    },
    ADD_MEDIA_ORGAN(state, mediaOrgan) {
      state.mediaOrgans.push(mediaOrgan);
    },
    SET_MEDIAS(state, medias) {
      state.medias = medias;
    },
    SET_REPORTS(state, reports) {
      state.reports = reports.map((x) => {
        return { ...x, downloading: false };
      });
    },
    SET_FEED(state, feed) {
      state.feed = feed.feed;
      state.feedCount = feed.count;
    },
    SET_REPORT(state, report) {
      state.report = report;
    },
    CHANGE_PERIOD(_, reportPeriod) {
      const customer = Vue.ls.get("customer");
      customer.reportPeriod = reportPeriod;
      Vue.ls.set("customer", customer);
    },
    ADD_POLLSTER(state, pollster) {
      state.pollsters.push(pollster);
    },
    SET_POLLSTERS(state, pollsters) {
      state.pollsters = pollsters;
    },
    DELETE_POLLSTER(state, pollsterId) {
      state.pollsters = state.pollsters.filter((x) => x._id !== pollsterId);
    },
    UPDATE_POLLSTER(state, payload) {
      state.pollsters.forEach((x, index) => {
        if (x._id.toString() === payload._id.toString()) {
          state.pollsters[index] = { ...payload };
        }
      });
    },
    ADD_SURVEY(state, survey) {
      state.surveys.push(survey);
    },
    SET_SURVEYS(state, surveys) {
      state.surveys = surveys;
    },
    DELETE_SURVEY(state, surveyId) {
      state.surveys = state.surveys.filter((x) => x._id !== surveyId);
    },
    UPDATE_SURVEY(state, payload) {
      state.surveys.forEach((x, index) => {
        if (x._id.toString() === payload._id.toString()) {
          state.surveys[index] = { ...payload };
        }
      });
    },

    ADD_MEDIA_ORGAN_TYPE(state, mediaOrganType) {
      state.mediaOrganTypes.push(mediaOrganType);
    },
    SET_MEDIA_ORGAN_TYPES(state, mediaOrganTypes) {
      state.mediaOrganTypes = mediaOrganTypes;
    },
    DELETE_MEDIA_ORGAN_TYPE(state, mediaOrganTypeId) {
      state.mediaOrganTypes = state.mediaOrganTypes.filter(
        (x) => x._id !== mediaOrganTypeId
      );
    },
    UPDATE_MEDIA_ORGAN_TYPE(state, payload) {
      state.mediaOrganTypes.forEach((x, index) => {
        if (x._id.toString() === payload._id.toString()) {
          state.mediaOrganTypes[index] = { ...payload };
        }
      });
    },

    UPDATE_MEDIA_ORGAN(state, payload) {
      state.mediaOrgans.forEach((x, index) => {
        if (x._id.toString() === payload._id.toString()) {
          state.mediaOrgans[index] = { ...payload };
          state.mediaOrgans[index].mediaOrganType =
            payload.mediaOrganTypeId.title;
        }
      });
    },

    SET_POLLSTER(state, pollster) {
      state.pollster = pollster;
    },

    SET_POLLSTER_SURVEYS(state, surveys) {
      state.pollsterSurveys = surveys;
    },
    SET_SINGLE_POLLSTER_SURVEYS(state, survey) {
      state.singleSurvey = {
        ...survey,
        startDate: new Date(survey.startDate),
        endDate: new Date(survey.endDate)
      }
    },
    SET_SURVEY_ANSWERS(state, answers) {
      Vue.set(state.singleSurvey, 'answers', answers)
      // state.singleSurvey.answers = answers
    }
  },
  actions: {
    getMe: async ({ commit }) => {
      const res = await API.get("/v1.0/customers/me");

      commit("SET_CUSTOMER", res.data.customer);
    },
    getMeFeed: async ({ commit }, payload) => {
      const page = payload.page || 0;
      const perPage = payload.perPage || 9;
      const res = await API.get(
        `/v1.0/customers/me/feed/?page=${page}&perPage=${perPage}`
      );

      commit("SET_FEED", res.data);
    },

    login: async ({ commit }, payload) => {
      try {
        const res = await API.post("/v1.0/auth/login/", {
          email: payload.email,
          password: payload.password,
        });

        Vue.ls.set("token", res.data.token);
        Vue.ls.set("customerId", res.data.customerId);
        Vue.ls.set("customer", res.data.customer);

        commit("SET_CUSTOMER", res.data.customer);
        return res.data;
      } catch (error) {
        return Promise.reject(error.response);
      }
    },

    pollsterLogin: async ({ commit }, payload) => {
      try {
        const res = await API.post("/v1.0/pollsters/login", {
          email: payload.email,
          password: payload.password,
        });

        Vue.ls.set("token", res.data.token);
        Vue.ls.set("pollsterId", res.data.customerId);

        commit("SET_POLLSTER", res.data.pollster);
        return res.data;
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    register: async (_, payload) => {
      try {
        console.log(payload);
        await API.post("/v1.0/auth/register/", {
          username: payload.username,
          customerType: payload.customerType,
          reportingTypeId: payload.reportingTypeId,
          email: payload.email,
          password: payload.password,
        });
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    logout: async () => {
      Vue.ls.clear();
      router.push("/login");
    },
    getMediaOrgans: async ({ commit, getters }) => {
      const res = await API.get("/v1.0/media-organs");
      const mediaOrgans = res.data.mediaOrgan.map((x) => {
        return {
          ...x,
          followed: getters.customer.mediaOrgans.includes(x._id),
          mediaOrganType: x.mediaOrganTypeId.title,
        };
      });
      commit("SET_MEDIA_ORGANS", mediaOrgans);
    },
    updateMediaOrgan: async ({ commit }, payload) => {
      const res = await API.put("/v1.0/media-organs/" + payload._id, {
        ...payload,
      });
      commit("UPDATE_MEDIA_ORGAN", res.data.mediaOrgan);
    },
    addMediaOrgan: async ({ commit }, payload) => {
      const res = await API.post("/v1.0/media-organs/", { ...payload });
      commit("ADD_MEDIA_ORGAN", res.data.savedMediaOrgan);
    },

    followMediaOrgan: async ({ commit }, mediaOrganId) => {
      await API.put(`/v1.0/customers/follow-media-organ`, { mediaOrganId });
      commit("FOLLOW", mediaOrganId);
    },
    unfollowMediaOrgan: async ({ commit }, mediaOrganId) => {
      await API.put(`/v1.0/customers/unfollow-media-organ`, { mediaOrganId });
      commit("UNFOLLOW", mediaOrganId);
    },

    getCustomers: async ({ commit }) => {
      const res = await API.get("/v1.0/customers/");
      commit("SET_CUSTOMERS", res.data.listedCustomer);
    },

    getMedias: async ({ commit }) => {
      const res = await API.get("/v1.0/medias/");
      commit("SET_MEDIAS", res.data.media);
    },

    getReport: async ({ commit }, reportId) => {
      const res = await API.get("/v1.0/reports/" + reportId);
      commit("SET_REPORT", res.data.report);
      return res.data.report;
    },

    getReportsByUserId: async ({ commit }, customerId) => {
      const res = await API.get("/v1.0/customers/" + customerId + "/reports/");
      commit("SET_REPORTS", res.data.reports);
    },

    changePeriod: async ({ commit }, payload) => {
      const res = await API.put(
        `/v1.0/customers/${payload.customerId}/change-period/?reportPeriod=${payload.reportPeriod}`
      );
      commit("CHANGE_PERIOD", res.data.reportPeriod);
    },

    addPollster: async ({ commit }, payload) => {
      const res = await API.post("/v1.0/pollsters/", { ...payload });
      commit("ADD_POLLSTER", res.data.savedPollster);
    },
    getPollsters: async ({ commit }) => {
      const res = await API.get("/v1.0/pollsters/");
      commit("SET_POLLSTERS", res.data.listedPollster);
    },
    deletePollster: async ({ commit }, pollsterId) => {
      await API.delete("/v1.0/pollsters/" + pollsterId);
      commit("DELETE_POLLSTER", pollsterId);
    },
    updatePollster: async ({ commit }, payload) => {
      const res = await API.put("/v1.0/pollsters/" + payload._id, {
        ...payload,
      });
      commit("UPDATE_POLLSTER", res.data.pollster);
    },
    getPollsterSurveys: async ({ commit, getters }) => {
      const res = await API.get(
        "/v1.0/pollsters/" + getters.pollsterId + "/surveys"
      );
      commit("SET_POLLSTER_SURVEYS", res.data.surveys);
    },
    getSinglePollsterSurveys: async ({ commit }, surveyId) => {
      const res = await API.get(
        "/v1.0/surveys/" + surveyId
      );
      commit("SET_SINGLE_POLLSTER_SURVEYS", res.data.survey);
    },
    addAnswer: async ({ commit, dispatch }, payload) => {
      const res = await API.post(
        "/v1.0/survey-answers/", { ...payload }
      );
      dispatch('getAnswer', payload.surveyId)
      commit("ADD_ANSWER", res.data.answer);
    },
    getAnswer: async ({ commit }, surveyId) => {
      const res = await API.get(
        "/v1.0/surveys/" + surveyId + '/answers'
      );
      commit("SET_SURVEY_ANSWERS", res.data.answers);

    },
    deleteAnswer: async ({ dispatch }, surveyId) => {
      const res = await API.delete(
        "/v1.0/survey-answers/" + surveyId
      );
      dispatch('getAnswer', res.data.surveyId)


    },
    addSurvey: async ({ commit }, payload) => {
      try {
        const res = await API.post("/v1.0/surveys/", { ...payload });
        commit("ADD_SURVEY", res.data.savedSurvey);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    getSurveys: async ({ commit }) => {
      const res = await API.get("/v1.0/surveys/");
      commit("SET_SURVEYS", res.data.surveys);
    },
    getMeSurveys: async ({ commit }) => {
      const res = await API.get("/v1.0/customers/me/surveys");
      commit("SET_SURVEYS", res.data.surveys);
    },
    deleteSurvey: async ({ commit }, surveyId) => {
      await API.delete("/v1.0/surveys/" + surveyId);
      commit("DELETE_SURVEY", surveyId);
    },
    updateSurvey: async ({ commit }, payload) => {
      const res = await API.put("/v1.0/surveys/" + payload._id, { ...payload });
      commit("UPDATE_SURVEY", res.data.survey);
    },

    addMediaOrganType: async ({ commit }, payload) => {
      const res = await API.post("/v1.0/media-organ-types/", { ...payload });
      commit("ADD_MEDIA_ORGAN_TYPE", res.data.savedMediaOrganType);
    },
    getMediaOrganTypes: async ({ commit }) => {
      const res = await API.get("/v1.0/media-organ-types/");
      commit("SET_MEDIA_ORGAN_TYPES", res.data.mediaOrganType);
    },
    deleteMediaOrganType: async ({ commit }, pollsterId) => {
      await API.delete("/v1.0/media-organ-types/" + pollsterId);
      commit("DELETE_MEDIA_ORGAN_TYPE", pollsterId);
    },
    updateMediaOrganType: async ({ commit }, payload) => {
      const res = await API.put("/v1.0/media-organ-types/" + payload._id, {
        ...payload,
      });
      commit("UPDATE_MEDIA_ORGAN_TYPE", res.data.pollster);
    },
  },
  modules: {},
});
