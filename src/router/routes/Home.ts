import Home from "@pages/home/Home.vue";

export const HOME_NAME = "home";
export const LIST_NAME = "list";
export const DETAIL_NAME = "detail";
export const WRITE_NAME = "write";
export const CHARTS_NAME = "charts";
const routes = [
  {
    path: HOME_NAME,
    name: HOME_NAME,
    component: Home,
    meta: {
      label: "主页",
    },
  },
];

export const HOME_PATH = "/main/home";
export const LIST_PATH = "/main/list";
export const DETAIL_PATH = "/main/detail";
export const WRITE_PATH = "/main/write";
export const CHARTS_PATH = "/main/charts";

export default routes;
