"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkweather_app"] = self["webpackChunkweather_app"] || []).push([["parser"],{

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Parser = (rawData) => {\n  const currentDay = rawData.current;\n  const daySeriesData = rawData.forecast.forecastday;\n  const parseCurrent = () => {\n    const parsed = {\n      location: rawData.location.name,\n      region: rawData.location.region,\n      datetime: currentDay.last_updated,\n      is_day: currentDay.is_day,\n      icon: currentDay.condition.icon,\n      text: currentDay.condition.text,\n      humidity: currentDay.humidity,\n      uv: currentDay.uv,\n      metric: {\n        temp: currentDay.temp_c,\n        wind: currentDay.wind_kph,\n        precipitation: currentDay.precip_mm,\n        feels: currentDay.feelslike_c,\n      },\n      english: {\n        temp: currentDay.temp_f,\n        wind: currentDay.wind_mph,\n        precipitation: currentDay.precip_in,\n        feels: currentDay.feelslike_f,\n      },\n    };\n    return parsed;\n  };\n\n  const parseSummary = () =>\n    daySeriesData.map((dayData) => {\n      const data = {\n        date: dayData.date,\n        rain_chance: dayData.day.daily_chance_of_rain,\n        snow_chance: dayData.day.daily_chance_of_snow,\n        icon: dayData.day.condition.icon,\n        text: dayData.day.condition.text,\n        humidity: dayData.day.humidity,\n        uv: dayData.day.uv,\n        metric: {\n          max_temp: dayData.day.maxtemp_c,\n          min_temp: dayData.day.mintemp_c,\n          precipitation: dayData.day.totalprecip_mm,\n        },\n        english: {\n          max_temp: dayData.day.maxtemp_f,\n          min_temp: dayData.day.mintemp_f,\n          precipitation: dayData.day.totalprecip_in,\n        },\n      };\n      return data;\n    });\n\n  const parseHourly = (date) => {\n    const dateData = daySeriesData.filter((day) => day.date === date);\n    return dateData[0].hour.map((hour) => {\n      const data = {\n        time: hour.time,\n        rain_chance: hour.chance_of_rain,\n        snow_chance: hour.chance_of_snow,\n        metric: {\n          temp_c: hour.temp_c,\n          precipitation: hour.precip_mm,\n        },\n        english: {\n          temp_f: hour.temp_f,\n          precipitation: hour.precip_in,\n        },\n      };\n      return data;\n    });\n  };\n  return { parseCurrent, parseSummary, parseHourly };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Parser);\n\n\n//# sourceURL=webpack://weather-app/./src/parser.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/parser.js"));
/******/ }
]);