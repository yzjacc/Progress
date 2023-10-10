import { startTimer, stopTimer, startTimeout, stopTimeout } from "./tools.js";

// 获取 DOM 元素
const startTimerBtn = document.getElementById("startTimerBtn") as HTMLButtonElement;
const stopTimerBtn = document.getElementById("stopTimerBtn") as HTMLButtonElement;
const startTimeoutBtn = document.getElementById("startTimeoutBtn") as HTMLButtonElement;
const stopTimeoutBtn = document.getElementById("stopTimeoutBtn") as HTMLButtonElement;
const num1 = document.getElementById("num1") as HTMLElement;
const num2 = document.getElementById("num2") as HTMLElement;

let counter1 = 0;
let counter2 = 0;
let timerId: NodeJS.Timeout|undefined;
let timeroutId:NodeJS.Timeout|undefined;
startTimerBtn.addEventListener("click", () => {
  timerId = startTimer(() => {
    counter1++;
    num1.innerHTML = counter1.toString();
  }, 1000);
});

stopTimerBtn?.addEventListener("click", () => {
  stopTimer(timerId);
});


startTimeoutBtn.addEventListener("click",()=>{
    timeroutId = startTimeout(()=>{
        counter2 += 100;
        num2.innerHTML = counter2.toString();
    }, 3000);
});
stopTimeoutBtn.addEventListener("click",()=>{
    stopTimeout(timeroutId);
});