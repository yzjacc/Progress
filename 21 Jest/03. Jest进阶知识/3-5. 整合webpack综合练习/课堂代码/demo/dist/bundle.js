/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://demo/./src/css/index.css?");

/***/ }),

/***/ "./src/ts/index.ts":
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Game_1 = __importDefault(__webpack_require__(/*! ./modules/Game */ \"./src/ts/modules/Game.ts\"));\nconst Sky_1 = __importDefault(__webpack_require__(/*! ./modules/Sky */ \"./src/ts/modules/Sky.ts\"));\nconst Land_1 = __importDefault(__webpack_require__(/*! ./modules/Land */ \"./src/ts/modules/Land.ts\"));\nconst Pipes_1 = __importDefault(__webpack_require__(/*! ./modules/Pipes */ \"./src/ts/modules/Pipes.ts\"));\nconst Bird_1 = __importDefault(__webpack_require__(/*! ./modules/Bird */ \"./src/ts/modules/Bird.ts\"));\n__webpack_require__(/*! ../css/index.css */ \"./src/css/index.css\");\n// 游戏初始化函数\nfunction init() {\n    // 实例化各个对象\n    const sky = new Sky_1.default();\n    const land = new Land_1.default();\n    const game = new Game_1.default();\n    const bird = new Bird_1.default(game);\n    const pipes = new Pipes_1.default(game, bird, sky, land);\n    // 绑定键盘事件\n    document.documentElement.onkeydown = function (e) {\n        if (e.key === \" \") {\n            bird.jump(); // 如果用户按的是空格，就往上移动一段距离\n        }\n        else if (e.key === \"Enter\") {\n            // 如果用户按的是回车，分为两种情况（1）游戏结束，需要重新加载此页面开始游戏 （2）游戏没有结束，用户只是想要暂停\n            if (game.isGameOver) {\n                location.reload();\n            }\n            else {\n                if (game.paused) {\n                    game.start(sky, land, pipes, bird);\n                }\n                else {\n                    game.stop(sky, land, pipes, bird);\n                }\n            }\n        }\n    };\n}\ninit();\n\n\n//# sourceURL=webpack://demo/./src/ts/index.ts?");

/***/ }),

/***/ "./src/ts/modules/Bird.ts":
/*!********************************!*\
  !*** ./src/ts/modules/Bird.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst util_1 = __importDefault(__webpack_require__(/*! ./util */ \"./src/ts/modules/util.ts\"));\nclass Bird {\n    constructor(game) {\n        this.width = 33; // 小鸟图片的宽度\n        this.height = 26; // 小鸟图片的高度\n        this.top = 150; // 默认游戏开始时 top 值\n        this.left = 200; // 默认游戏开始时 left 值\n        this.dom = document.querySelector(\"#game .bird\"); // 获取小鸟图片的 div dom 元素\n        this.wingIndex = 0; // 记录当前小鸟的图片索引，翅膀是处于哪个位置\n        this.speed = 0; // 初始速度，向下的速度，每毫秒移动的像素值\n        this.a = 0.002; // 加速度\n        // 小鸟的第一个计时器，不停的变换小鸟的背景图，呈现出小鸟在飞行的视觉效果\n        this.wingTimer = (0, util_1.default)(100, this, () => {\n            this.wingIndex = (this.wingIndex + 1) % 3; // 重新计算当前应该显示小鸟图片的索引\n            this.show(); // 调用 show 方法来重新显示当前的小鸟图片\n        });\n        // 小鸟的第二个计时器，控制这个小鸟不停的下落，实际上就是在不停的修改 top 值\n        // 涉及到一个物理里面的匀加速运动  S = vt + 1/2 * a * t * t\n        // 获取匀加速一段时间后的末速度  假设初始速度为 v0，加速度为 a 的情况下，物体运行了 t 时间后，末速度为 v = v0 + a * t\n        this.dropTimer = (0, util_1.default)(16, this, () => {\n            // 每过 16 毫秒，就需要去计算小鸟现在的向下位移情况\n            let s = this.speed * 16 + 0.5 * this.a * 16 * 16;\n            this.setTop(this.top + s); // 重新设置小鸟的 top 值\n            this.speed = this.speed + this.a * 16; // 更新当前向下的速度\n            this.show();\n        });\n        this.game = game;\n    }\n    // 显示小鸟的方法\n    show() {\n        // 设置新的 top 值\n        this.dom.style.top = this.top + \"px\";\n        // 根据图片的索引值，来决定背景图的位置\n        if (this.wingIndex === 0) {\n            this.dom.style.backgroundPosition = \"-8px -10px\";\n        }\n        else if (this.wingIndex === 1) {\n            this.dom.style.backgroundPosition = \"-60px -10px\";\n        }\n        else {\n            this.dom.style.backgroundPosition = \"-113px -10px\";\n        }\n    }\n    // 设置小鸟 top 值的方法\n    setTop(newTop) {\n        if (newTop < 0) {\n            newTop = 0;\n        }\n        else if (newTop > this.game.maxHeight - this.height) {\n            newTop = this.game.maxHeight - this.height;\n        }\n        this.top = newTop;\n    }\n    // 小鸟的跳跃方法，其实就是将下落的速度修改为负值，这样的话就可以反方向的移动一段距离\n    // 但是因为加速度是正值，所以向上移动一段距离后，就会重新开始下落\n    jump() {\n        this.speed = -0.5;\n    }\n}\nexports[\"default\"] = Bird;\n\n\n//# sourceURL=webpack://demo/./src/ts/modules/Bird.ts?");

/***/ }),

/***/ "./src/ts/modules/Game.ts":
/*!********************************!*\
  !*** ./src/ts/modules/Game.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Game {\n    constructor() {\n        this.width = 800; // 游戏舞台的宽度\n        this.height = 600; // 游戏舞台的高度\n        this.dom = document.getElementById('game'); // 获取 dom 元素\n        this.maxHeight = 600 - 112; // 能活动的最大高度，游戏高度减去大地的高度\n        this.paused = true; // 当前游戏是否暂停\n        this.score = 0; // 游戏的得分\n        this.isGameOver = false; // 判断游戏是否结束，后面我们会根据这个属性来判断用户按的回车是重新开始还是暂停\n    }\n    // 游戏开始，回头只要一调用 game.start 方法，游戏就开始了\n    // 游戏开始其实就是调用所有对象的 start 方法\n    start(sky, land, pipes, bird) {\n        sky.timer.start();\n        land.timer.start();\n        pipes.produceTimer.start();\n        pipes.moveTimer.start();\n        bird.wingTimer.start();\n        bird.dropTimer.start();\n        this.paused = false;\n    }\n    // 游戏结束方法，其实就是调用其他对象的 stop 方法\n    stop(sky, land, pipes, bird) {\n        sky.timer.stop();\n        land.timer.stop();\n        pipes.produceTimer.stop();\n        pipes.moveTimer.stop();\n        bird.wingTimer.stop();\n        bird.dropTimer.stop();\n        this.paused = true;\n    }\n    // 检测是否能够获取到分数\n    getScore(pipes, bird) {\n        // 遍历所有的柱子\n        for (let i = 0; i < pipes.all.length; i++) {\n            let p = pipes.all[i]; // 获取当前的柱子\n            if ((bird.left > (p.left + p.width)) && !p.pass) {\n                p.pass = true; // 说明当前的这根柱子已经计过分\n                this.score += 0.5; // 因为有上下两根柱子，而遍历的是所有的柱子，所以一次只增加 0.5 分\n                document.querySelector('#game .score').innerHTML = this.score.toString();\n            }\n        }\n    }\n    // 检测是否发生碰撞，如果碰撞，则游戏结束\n    gameOver(sky, land, pipes, bird) {\n        // 游戏结束一共分为两种情况（1）小鸟撞到了地面 （2）小鸟和柱子相撞\n        // 小鸟撞到了地面\n        if (bird.top === this.maxHeight - bird.height) {\n            this.stop(sky, land, pipes, bird); // 停止游戏\n            document.querySelector('#game .score').style.display = 'none';\n            document.querySelector('#game .over').innerHTML += this.score;\n            document.querySelector('#game .over').style.display = 'block';\n            this.isGameOver = true;\n            return;\n        }\n        // 小鸟是否碰撞到柱子\n        let bx = bird.left + bird.width / 2; // 获取小鸟 x 轴方向的中心点\n        let by = bird.top + bird.height / 2; // 获取小鸟 y 轴方向的中心点\n        // 接下来我们需要去遍历所有的柱子，判断小鸟是否和柱子碰撞\n        for (let i = 0; i < pipes.all.length; i++) {\n            let p = pipes.all[i]; // 获取当前的柱子\n            // 接下来来检测两个矩形是否碰撞\n            // 横向 ： |矩形1x中心点到矩形2x中心点距离| < 两个矩形宽度之和/2\n            // 纵向 ： |矩形1y中心点到矩形2y中心点距离| < 两个矩形高度之和/2\n            let px = p.left + p.width / 2; //  柱子 x轴方向的中心点\n            let py = p.top + p.height / 2; //  柱子 y轴方向的中心点\n            if (Math.abs(bx - px) < (p.width + bird.width) / 2 && Math.abs(by - py) < (p.height + bird.height) / 2) {\n                this.stop(sky, land, pipes, bird); // 停止游戏\n                document.querySelector('#game .score').style.display = 'none';\n                document.querySelector('#game .over').innerHTML += this.score;\n                document.querySelector('#game .over').style.display = 'block';\n                this.isGameOver = true;\n                return;\n            }\n        }\n    }\n}\nexports[\"default\"] = Game;\n\n\n//# sourceURL=webpack://demo/./src/ts/modules/Game.ts?");

/***/ }),

/***/ "./src/ts/modules/Land.ts":
/*!********************************!*\
  !*** ./src/ts/modules/Land.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst util_1 = __importDefault(__webpack_require__(/*! ./util */ \"./src/ts/modules/util.ts\"));\nclass Land {\n    constructor() {\n        this.left = 0;\n        this.dom = document.querySelector('#game .land');\n        this.timer = (0, util_1.default)(30, this, () => {\n            // 不停的修改 left 值\n            this.left -= 2;\n            if (this.left === -800) {\n                this.left = 0;\n            }\n            this.show();\n        });\n    }\n    // 重新展示大地这张背景图\n    show() {\n        this.dom.style.left = this.left + 'px';\n    }\n}\nexports[\"default\"] = Land;\n\n\n//# sourceURL=webpack://demo/./src/ts/modules/Land.ts?");

/***/ }),

/***/ "./src/ts/modules/Pipes.ts":
/*!*********************************!*\
  !*** ./src/ts/modules/Pipes.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst util_1 = __importDefault(__webpack_require__(/*! ./util */ \"./src/ts/modules/util.ts\"));\nclass Pipes {\n    // 获取随机数的方法\n    getRandom(min, max) {\n        return Math.floor(Math.random() * (max - min + 1) + min);\n    }\n    constructor(game, bird, sky, land) {\n        this.width = 52; // 柱子的宽度\n        this.all = []; // 保存所有的柱子\n        // 生产柱子的计时器\n        this.produceTimer = (0, util_1.default)(2500, this, () => {\n            this.createPair(this.game);\n        });\n        // 柱子移动的计时器\n        // 主要逻辑：（1）遍历所有的柱子，left 减 2 来进行移动 （2）每次移动完之后，需要判断一下柱子是否跑出了舞台之外，如果抛出，将该柱子移除\n        this.moveTimer = (0, util_1.default)(30, this, () => {\n            for (let i = 0; i < this.all.length; i++) {\n                const p = this.all[i]; // 得到当前的柱子\n                p.left -= 2; // 通过修改 left 的值来让柱子进行移动\n                if (p.left < -p.width) {\n                    // 如果进入到此 if，说明柱子已经移动到了舞台之外\n                    p.dom.remove(); // 从屏幕上面移除\n                    this.all.splice(i, 1); // 从数组中删除该柱子\n                    i--;\n                }\n                else {\n                    // 如果进入 else，说明柱子没有抛出舞台\n                    p.dom.style.left = p.left + 'px';\n                }\n            }\n            this.game.getScore(this, this.bird); // 每次柱子移动一次，就需要判断一下玩家是否得分\n            this.game.gameOver(this.sky, this.land, this, this.bird); // 每次柱子移动一次，也同样需要判断一下游戏是否结束\n        });\n        this.game = game;\n        this.bird = bird;\n        this.sky = sky;\n        this.land = land;\n    }\n    // 创建柱子方法\n    createPair(game) {\n        const minHeight = 60, // 柱子的最小高度\n        gap = 150, // 柱子中间的缝隙\n        maxHeight = game.maxHeight - gap - minHeight; // 柱子的最高高度\n        // 接下来来确定一组柱子\n        const h1 = this.getRandom(minHeight, maxHeight);\n        const h2 = game.maxHeight - h1 - gap;\n        // 创建上方的柱子\n        const div1 = document.createElement('div');\n        div1.className = 'pipeup';\n        div1.style.height = h1 + 'px';\n        div1.style.left = game.width + 'px';\n        // 将上方柱子添加到页面上面\n        game.dom.appendChild(div1);\n        // 还需要将这个柱子添加数组里面，方便后面判断操作\n        this.all.push({\n            dom: div1,\n            height: h1,\n            width: this.width,\n            top: 0,\n            left: game.width,\n            pass: false\n        });\n        // 创建下方的柱子\n        const div2 = document.createElement('div');\n        div2.className = 'pipedown';\n        div2.style.height = h2 + 'px';\n        div2.style.left = game.width + 'px';\n        // 将下方柱子添加到页面上面\n        game.dom.appendChild(div2);\n        // 还需要将这个柱子添加数组里面，方便后面判断操作\n        this.all.push({\n            dom: div2,\n            height: h2,\n            width: this.width,\n            top: h1 + gap,\n            left: game.width,\n            pass: false\n        });\n    }\n}\nexports[\"default\"] = Pipes;\n\n\n//# sourceURL=webpack://demo/./src/ts/modules/Pipes.ts?");

/***/ }),

/***/ "./src/ts/modules/Sky.ts":
/*!*******************************!*\
  !*** ./src/ts/modules/Sky.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst util_1 = __importDefault(__webpack_require__(/*! ./util */ \"./src/ts/modules/util.ts\"));\nclass Sky {\n    constructor() {\n        this.left = 0;\n        this.dom = document.querySelector(\"#game .sky\");\n        this.timer = (0, util_1.default)(30, this, () => {\n            // 不停修改 left 值\n            this.left -= 1;\n            if (this.left === -800) {\n                this.left = 0;\n            }\n            this.show();\n        });\n    }\n    show() {\n        // 重新展示天空这张背景图\n        this.dom.style.left = this.left + \"px\";\n    }\n}\nexports[\"default\"] = Sky;\n\n\n//# sourceURL=webpack://demo/./src/ts/modules/Sky.ts?");

/***/ }),

/***/ "./src/ts/modules/util.ts":
/*!********************************!*\
  !*** ./src/ts/modules/util.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n// 由于考虑到除了“游戏”以外的对象，都需要绑定 setInterval 函数，所以，这里我们考虑封装一个函数\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n/*\n    通过此函数，可以统一的为各个对象绑定一个计时器\n    该函数会返回一个计时器对象，该对象会提供两个方法 1. start 创建计时器  2. stop 停止计时器\n    该函数接收三个参数\n    （1） duration：setInterval 方法的第二个参数\n    （2） thisObj 要绑定在哪一个对象上面\n    （3） callback：要做什么事儿，setInterval 方法的第一个参数\n*/\nfunction getTimer(duration, thisObj, callback) {\n    let timer = null; // 存储 setInterval 的返回值，用于停止计时器\n    return {\n        start: function () {\n            // 如果计时器不存在时才会进行计时器的生成\n            if (!timer) {\n                timer = setInterval(function () {\n                    callback.bind(thisObj)();\n                }, duration);\n            }\n        },\n        stop: function () {\n            if (timer) {\n                clearInterval(timer); // 停止计时器\n                timer = null;\n            }\n        },\n    };\n}\nexports[\"default\"] = getTimer;\n\n\n//# sourceURL=webpack://demo/./src/ts/modules/util.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/index.ts");
/******/ 	
/******/ })()
;