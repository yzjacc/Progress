import { startTimer, stopTimer, startTimeout, stopTimeout } from "./tools.js";
// 获取 DOM 元素
const startTimerBtn = document.getElementById("startTimerBtn");
const stopTimerBtn = document.getElementById("stopTimerBtn");
const startTimeoutBtn = document.getElementById("startTimeoutBtn");
const stopTimeoutBtn = document.getElementById("stopTimeoutBtn");
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
let counter1 = 0;
let counter2 = 0;
let timerId;
let timeroutId;
startTimerBtn.addEventListener("click", () => {
    timerId = startTimer(() => {
        counter1++;
        num1.innerHTML = counter1.toString();
    }, 1000);
});
stopTimerBtn === null || stopTimerBtn === void 0 ? void 0 : stopTimerBtn.addEventListener("click", () => {
    stopTimer(timerId);
});
startTimeoutBtn.addEventListener("click", () => {
    timeroutId = startTimeout(() => {
        counter2 += 100;
        num2.innerHTML = counter2.toString();
    }, 3000);
});
stopTimeoutBtn.addEventListener("click", () => {
    stopTimeout(timeroutId);
});
