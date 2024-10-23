import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/index.less";
import register from "./router/index";
import "./assets/css/main.css";
import { createPinia } from "pinia";
import { message } from "ant-design-vue";
import "virtual:svg-icons-register";
import SvgIcon from "./components/SvgIcon.vue";
import Faq from './components/common/Faq.vue'
import DateLabel from './components/common/DateLabel.vue'
const pinia = createPinia();
const app = createApp(App);
message.config({
  maxCount: 3,
});
app.component("DateLabel", DateLabel);
app.component("SvgIcon", SvgIcon);
app.component("Faq", Faq);

app.use(pinia);
register(app);
app.mount("#app");
