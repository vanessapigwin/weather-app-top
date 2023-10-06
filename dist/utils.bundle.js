"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkweather_app"] = self["webpackChunkweather_app"] || []).push([["utils"],{

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Status: () => (/* binding */ Status),\n/* harmony export */   UnitMap: () => (/* binding */ UnitMap),\n/* harmony export */   customElement: () => (/* binding */ customElement)\n/* harmony export */ });\nconst UnitMap = {\n  english: {\n    Temp: \"ºF\",\n    max_temp: \"ºF\",\n    min_temp: \"ºF\",\n    Feels: \"ºF\",\n    Precipitation: \"in\",\n    Humidity: \"%\",\n    \"UV Index\": \"\",\n    \"Wind Speed\": \"mph\",\n    rain_chance: \"%\",\n    snow_chance: \"%\",\n  },\n  metric: {\n    Temp: \"ºC\",\n    Feels: \"ºC\",\n    max_temp: \"ºC\",\n    min_temp: \"ºC\",\n    Precipitation: \"mm\",\n    Humidity: \"%\",\n    \"UV Index\": \"\",\n    \"Wind Speed\": \"kph\",\n    rain_chance: \"%\",\n    snow_chance: \"%\",\n  },\n};\n\nconst Status = {\n  location: \"Pasig, Metro Manila\",\n  parser: undefined,\n  selected_day: undefined,\n  fetch_time: undefined,\n};\n\nconst customElement = (tag, att = undefined, textContent = undefined) => {\n  const element = document.createElement(tag);\n  if (att !== undefined)\n    Object.entries(att).forEach((item) => {\n      const [key, value] = item;\n      const attribute = document.createAttribute(key);\n      attribute.value = value;\n      element.setAttributeNode(attribute);\n    });\n  if (textContent !== undefined) element.textContent = textContent;\n  return element;\n};\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/utils.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/utils.js"));
/******/ }
]);