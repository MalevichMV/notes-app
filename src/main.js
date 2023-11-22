import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import AppCurrentNote from "./components/AppCurrentNote.vue";
import AppStartingView from "./components/AppStartingView.vue";

import "./assets/style/global.scss";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "StartingPage",
      path: "/",
      component: AppStartingView,
    },
    {
      name: "CurrnetNote",
      path: "/:id(\\d+)",
      component: AppCurrentNote,
    },
  ],
});

createApp(App).use(router).mount("#app");
