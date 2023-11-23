// 该文件也是一个入口文件
// 该文件是你在打包成一个库的时候的入口文件

import { App, Plugin } from "vue";
import Button from "@/components/Button.vue";

import './assets/fonts/font.scss';

const components = [Button];

// 在 vue 中，如果你要将代码打包成一个库，那么需要提供一个 install 的方法
// 在 install 里面我们要做的事情就是注册组件
const install = (app: App) => {
  components.forEach((com) => {
    app.component(com.name, com);
  });
};

const vuecoms: Plugin = {
  install,
};

export default vuecoms;
