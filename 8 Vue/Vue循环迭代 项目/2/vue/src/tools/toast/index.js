import Vue from "vue";
import toast from "./index.vue";

const Toast = Vue.extend(toast);

export default function showToast({msg, status, duration = 2000}) {
  const app = new  Toast({
    el: document.createElement("div"),
    data: {
      flag: true,
      show: true,
      msg,
      status
    }
  });
  document.body.appendChild(app.$el);
  setTimeout(_ => {
    app.flag = false;
  }, duration+300);
  setTimeout(_ => {
    app.show = false;
  }, duration);
}
