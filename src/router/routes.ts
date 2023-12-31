export const staticRoute = [
  {
    path: "/",
    component: () => import("@/views/network/index.vue"),
    name: "network",
  },
  {
    path: "/comboSetting",
    component: () => import("@/views/comboSetting/index.vue"),
    name: "comboSetting",
  },
  {
    path: "/deviceTypeSetting",
    component: () => import("@/views/deviceTypeSetting/index.vue"),
    name: "deviceTypeSetting",
  },
];
