const box = document.querySelector(".box");
let left = 0;
let s = 3;
setInterval(function () {
  left += s;
  if (left >= 500) {
    s = -3;
  }
  if (left <= 0) {
    s = 3;
  }
  box.style.left = left + "px";
}, 10);
