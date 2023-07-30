import { createApp } from "vue";
import App from "./App.vue";
import "virtual:svg-icons-register";
import gloalComponent from "@/components";
import "@/styles/index.scss";
import router from "./router";
import pinia from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(ElementPlus);

// 注册全局组件
app.use(gloalComponent);
// 引入路由
app.use(router);
// 引入 pinia
app.use(pinia);

app.mount("#app");
