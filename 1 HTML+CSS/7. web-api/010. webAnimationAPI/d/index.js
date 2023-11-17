function randomText() {
  return parseInt(Math.random() * 36).toString(36);
}

function getRandom(max, min) {
  return Math.random() * (max - min) + min;
}

const cloudEle = document.querySelector(".cloud");

function run() {
  const textEle = document.createElement("div");
  textEle.innerText = randomText();
  textEle.classList.add("text");
  const x = Math.random() * 310;
  const time = getRandom(3000, 1600);
  // 时间越快，弹得越高

  const textAnimate = textEle.animate(
    [
      { transform: `translate(${x}px)` },
      { transform: `translate(${x}px, 290px)`, offset: 0.7 },
      { transform: `translate(${x}px, 290px)`, offset: 1 },
    ],
    {
      fill: "forwards",
      duration: time,
      easing: "linear",
    }
  );
  textAnimate.play();
  textAnimate.onfinish = function () {
    textEle.remove();
  };
  cloudEle.appendChild(textEle);

  requestAnimationFrame(run);
}

requestAnimationFrame(run);


