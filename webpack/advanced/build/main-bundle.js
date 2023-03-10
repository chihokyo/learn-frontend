"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkadvanced"] = self["webpackChunkadvanced"] || []).push([[179],{

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"./node_modules/react-dom/client.js\");\n/* harmony import */ var _react_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./react/App */ \"./src/react/App.jsx\");\n/* harmony import */ var _ts_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ts/math */ \"./src/ts/math.ts\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n\n\n\n\n\n\nconsole.log('hello');\nvar obj = {\n  name: 'chin',\n  age: 1888\n};\nvar name = obj.name,\n  age = obj.age;\nconsole.log(name);\nvar msg = 'hello';\nconsole.log(msg.includes('he'));\n\n// 这里开始写react代码\nvar root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(document.querySelector('#root'));\nroot.render( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_react_App__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}));\n\n// 使用ts代码\nconsole.log((0,_ts_math__WEBPACK_IMPORTED_MODULE_3__.sum)(2, 18));\nconsole.log((0,_ts_math__WEBPACK_IMPORTED_MODULE_3__.sum)(2, 128));\nconsole.log((0,_ts_math__WEBPACK_IMPORTED_MODULE_3__.sum)(3, 128));\nconsole.log(axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\nif (true) {\n  // 这个就相当于你自己命名了name，这个叫魔法注释\n  __webpack_require__.e(/*! import() | aboutChin */ 813).then(__webpack_require__.t.bind(__webpack_require__, /*! ./about.js */ \"./src/about.js\", 23));\n}\n\n//# sourceURL=webpack://advanced/./src/main.js?");

/***/ }),

/***/ "./src/react/App.jsx":
/*!***************************!*\
  !*** ./src/react/App.jsx ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : \"undefined\" != typeof Symbol && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\nvar App = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function (props) {\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),\n    _useState2 = _slicedToArray(_useState, 2),\n    c = _useState2[0],\n    setC = _useState2[1];\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(\"div\", {\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"h2\", {\n      children: c\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"button\", {\n      onClick: function onClick(e) {\n        return setC(c + 1);\n      },\n      children: \"+1\"\n    })]\n  });\n});\nApp.propTypes = {};\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack://advanced/./src/react/App.jsx?");

/***/ }),

/***/ "./src/ts/math.ts":
/*!************************!*\
  !*** ./src/ts/math.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sum\": function() { return /* binding */ sum; }\n/* harmony export */ });\nfunction sum(x, y) {\n  return x + y;\n}\n\n//# sourceURL=webpack://advanced/./src/ts/math.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [84,753], function() { return __webpack_exec__("./src/main.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);