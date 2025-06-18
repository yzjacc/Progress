const online = require("./online.js");
const off = require("./new.js");
// const pdd = require("./pdd.js");
const time = [80, 200];
let timerId = null;
const cateCodeList = [
  { name: "空调1", value: "A0401" },
  { name: "空调2", value: "A0402" },
  { name: "空调3", value: "A0403" },
  // { name: "热水器", value: "A06" },
];

function scheduleNext(time0, time1) {
  if (timerId) clearTimeout(timerId);
  const nextDelay = Math.floor(Math.random() * (time1 - time0)) + time0;
  timerId = setTimeout(() => {
    off.sendRequest(cateCodeList);
    online.sendRequest(cateCodeList);
    // pdd.sendRequest();
    scheduleNext(time[0], time[1]);
  }, nextDelay);
}

scheduleNext(time[0], time[1]);
