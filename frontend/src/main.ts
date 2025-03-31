import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // ✅ 추가 (라우터 연결)
import { createPinia } from 'pinia'

import "~/styles/index.scss";
import "uno.css";

const app = createApp(App);

app.use(router); // ✅ Vue Router 등록
app.use(createPinia()) // ✅ Pinia 등록
app.mount("#app");
