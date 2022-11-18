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

/***/ "./src/scenes/sphere/worker.ts":
/*!*************************************!*\
  !*** ./src/scenes/sphere/worker.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nonmessage = ({ data }) => {\n    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment\n    const { camera, world, start, end, canvasSize } = data;\n    const result = camera.renderPartial(world, start, end, canvasSize);\n    const canvas = document.getElementsByTagName('canvas')[0].getContext('2d');\n    postMessage({ result });\n    // const startTime = performance.now()\n    // for (let y = 0; y <= vSize - 1; y++) {\n    //   for (let x = 0; x <= hSize - 1; x++) {\n    //     draw({ color: result[y][x], position: { x, y } }, canvas)\n    //   }\n    // }\n    // console.log(\n    //   `Call to doSomething took ${performance.now() - startTime} milliseconds`\n    // )\n};\n\n\n//# sourceURL=webpack://ray-tracer-challenge/./src/scenes/sphere/worker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scenes/sphere/worker.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;