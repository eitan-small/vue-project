import { createRouter, createWebHistory } from "vue-router";
import { staticRoute } from "./routes";

// 创建路由器
const router = createRouter({
  // 路由模式 hash
  history: createWebHistory(),
  routes: staticRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
