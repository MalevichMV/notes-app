import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import AppCurrentNote from "./views/AppCurrentNoteView/AppCurrentNote.vue";
import AppStartingView from "./views/AppStartingView/AppStartingView.vue";
import AppErrorPageView from "./views/AppErrorPageView.vue";

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
    {
      name: "NotFound",
      path: "/:pathMatch(.*)*",
      component: AppErrorPageView,
    },
  ],
});

createApp(App).use(router).mount("#app");
