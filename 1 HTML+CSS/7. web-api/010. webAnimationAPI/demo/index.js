function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomAlpha() {
  // 0-9, a-z;
  // 传统：0-9,a-z 加入数组，随机位置返回
  // 取巧：36 0~35 转换成36进制
  return parseInt(getRandom(0, 36)).toString(36);
}

function getRandomChinese() {
  return String.fromCharCode(parseInt(getRandom(0x4e00, 0x9fff)));
}
const cloud = document.querySelector(".cloud");

function run() {
  // 生成元素
  const textEle = document.createElement("div");
  cloud.appendChild(textEle);
  textEle.className = "text";

  // 元素内部随机数字
  // textEle.innerText = getRandomAlpha();
  // 生成随机的文字呢（汉语）
  textEle.innerText = getRandomChinese();
  // 元素初始水平偏移位置
  const dx = getRandom(0, 310);
  // 完成动画
  const animate = textEle.animate(
    [
      { transform: `translateX(${dx}px)`, offset: 0 },
      { transform: `translate(${dx}px, 290px)`, offset: 0.7 },
      { transform: `translate(${dx}px, 290px)`, offset: 1 },
    ],
    {
      duration: getRandom(1600, 3000),
      easing: "linear",
      fill: "forwards",
    }
  );

  animate.onfinish = function () {
    textEle.remove();
  };
  requestAnimationFrame(run);
}

requestAnimationFrame(run);
