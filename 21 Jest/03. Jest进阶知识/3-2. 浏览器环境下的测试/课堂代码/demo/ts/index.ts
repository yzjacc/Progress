import storage from "./storage.js";

// 获取 DOM 元素
const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
const getBtn = document.getElementById("getBtn") as HTMLButtonElement;
const content = document.getElementById("content") as HTMLInputElement;
const username = document.getElementById("username") as HTMLSpanElement;

saveBtn.addEventListener("click", function () {
  storage.set("user", content.value);
  content.value = "";
  window.alert("存储成功");
});

getBtn.addEventListener("click", function () {
  const value = storage.get("user");
  if (value !== null) {
    username.innerHTML = value;
  } else {
    username.innerHTML = "";
  }
});
