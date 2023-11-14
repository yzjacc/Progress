import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import i18n from './i18n'
// import Trans from "./i18n/translation";

// Trans.switchLanguage(Trans.guessDefaultLocale());


const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount('#app')
