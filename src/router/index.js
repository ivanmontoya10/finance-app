import { createRouter, createWebHistory } from "vue-router";
import MainMenu from "../views/MainMenu.vue";
import MonthsView from "../views/MonthsView.vue";

const routes = [
  {
    path: "/",
    component: MainMenu,
  },
  {
    path: "/meses",
    component: MonthsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
