"use strict";
(self["webpackChunkhome"] = self["webpackChunkhome"] || []).push([["src_bootstrap_js"],{

/***/ "./src/bootstrap.js":
/*!**************************!*\
  !*** ./src/bootstrap.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _now__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./now */ "./src/now.js");



// 生成首页标题
jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h1>').text('首页').appendTo(document.body);

// 首页中有一个显示当前时间的区域
(0,_now__WEBPACK_IMPORTED_MODULE_1__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div>').appendTo(document.body));


/***/ }),

/***/ "./src/now.js":
/*!********************!*\
  !*** ./src/now.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(container) {
  const p = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p>').appendTo(container).text(new Date().toLocaleString());
  setInterval(function () {
    p.text(new Date().toLocaleString());
  }, 1000);
}


/***/ })

}]);
//# sourceMappingURL=src_bootstrap_js.js.map