import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./assets/main.css";

import { useSignupStore, useUserStore } from './stores/user.js';

// Import du script de débogage simplifié
import './scripts/debug-stores-simple.js'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

// Initialiser les stores
const signup = useSignupStore();
const user = useUserStore();

// Réinitialiser le store signup
signup.reset();

// Exposer les stores globalement pour le débogage
window.userStore = user;
window.signupStore = signup;
window.$pinia = pinia;

app.use(router);

app.mount("#app");
