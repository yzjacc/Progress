import { createApp } from 'vue'
import "./assets/fonts/font.scss";
import App from './App.vue'

const app = createApp(App);

// 引入组件
import Button from "./components/Button.vue";


// 注册组件
// 组件的名字，对应的组件
app.component(Button.name, Button);

app.mount('#app');
