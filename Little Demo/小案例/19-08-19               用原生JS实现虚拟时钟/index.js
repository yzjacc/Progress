const $ = selector => document.querySelector(selector);
const config = {
    width: 500,
    height: 500
}
/**
 * 生成表盘
 */
function createBoard() {
    const board = $(".board");
    board.innerHTML = "";
    for (let i = 0; i < 60; i++) {
        const div = document.createElement("div");
        if (i % 5 === 0) {
            div.className = "bold";
        }
        div.style.transform = ` translateY(250px) rotate(${i * 6}deg) `;
        board.appendChild(div);
    }
}

function createNumber() {
    const number = $(".number");
    number.innerHTML = "";
    const R = 220;
    for (let i = 3; i <= 14; i++) {
        const div = document.createElement("div");
        div.innerHTML = i === 12 ? 12 : i % 12;
        const pos = getPos((i - 3) * 30);
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        number.appendChild(div);
    }

    /**
     * 求坐标
     * @param {*} degree 顺时针旋转的角度
     */
    function getPos(degree) {
        const rad = degree * Math.PI / 180;
        return {
            x: Math.cos(rad) * R,
            y: Math.sin(rad) * R
        }
    }
}

function tick() {
    const h = $(".h"), m = $(".m"), s = $(".s");
    setInterval(setPointers, 10);

    function setPointers() {
        const t = new Date();
        const zero = new Date(t.getFullYear(), t.getMonth(), t.getDate());
        const span = t - zero;
        const sdeg = span / 1000 % 60 * 6 - 90;
        const mdeg = span / (1000 * 60) % 60 * 6 - 90;
        const hdeg = span / (1000 * 60 * 60) % 12 * 30 - 90;
        s.style.transform = `rotate(${sdeg}deg)`;
        m.style.transform = `rotate(${mdeg}deg)`;
        h.style.transform = `rotate(${hdeg}deg)`;
        // h.style.transform = `rotate(${t.getHours() * 30 + - 90}deg)`;
    }
}


createBoard();
createNumber();
tick();