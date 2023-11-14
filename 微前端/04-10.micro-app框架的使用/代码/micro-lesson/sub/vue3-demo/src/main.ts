import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './routes';

createApp(App).use(router).use(ElementPlus).mount('#my-vite-app')
