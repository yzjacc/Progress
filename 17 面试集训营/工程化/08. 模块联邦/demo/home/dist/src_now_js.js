"use strict";
(self["webpackChunkhome"] = self["webpackChunkhome"] || []).push([["src_now_js"],{

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
//# sourceMappingURL=src_now_js.js.map