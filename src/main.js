import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import AdminLayout from "./AdminLayout.vue";
Vue.component("admin-layout", AdminLayout);

import UserLayout from "./UserLayout.vue";
Vue.component("user-layout", UserLayout);

import PollsterLayout from "./PollsterLayout.vue";
Vue.component("pollster-layout", PollsterLayout);

import Storage from "vue-ls";

const options = {
  name: "ls", // name variable Vue.[ls] or this.[$ls],
  storage: "local", // storage name session, local, memory
};

Vue.use(Storage, options);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
