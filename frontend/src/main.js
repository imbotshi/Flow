import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./assets/main.css";

import { useSignupStore } from './stores/user.js';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

const signup = useSignupStore();
signup.reset();

app.use(router);

app.mount("#app");
