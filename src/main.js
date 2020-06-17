import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

// global components
import MainLayout from "./layouts/MainLayout";
import FormLayout from "./layouts/FormLayout";
import VueApexCharts from "vue-apexcharts";

Vue.component("apexcharts", VueApexCharts);
Vue.component("main-layout", MainLayout);
Vue.component("form-layout", FormLayout);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
