/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("var hitterData;\nd3.csv('mookie_tatis_trout.csv', function (d) {\n  return {\n    player_name: d['player_name'],\n    hit_type: d['events'],\n    description: d['des'],\n    contact_type: d['bb_type'],\n    season: d['game_year'],\n    hit_distance: d['hit_distance_sc'],\n    exit_velo: d['launch_speed'],\n    launch_angle: d['launch_angle'],\n    pitch_name: d['pitch_name']\n  };\n}).then(function (data) {\n  hitterData = data;\n  console.log(hitterData); //looping through and creating visualizations for everything later\n  //createChart(hitterData[0], 0, true);\n  //for (let i = 1; i < hitterData.length; i++) {\n  //createChart(hitterData[i], i);\n  // }\n});\n\nvar createChart = function createChart(hitterData, idx, createXAxisBool) {\n  var width = 800;\n  var height = 600;\n  var padding = 50;\n  var margin = {\n    left: 50,\n    top: 80,\n    bottom: 30,\n    right: 40\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJuYW1lcyI6WyJoaXR0ZXJEYXRhIiwiZDMiLCJjc3YiLCJkIiwicGxheWVyX25hbWUiLCJoaXRfdHlwZSIsImRlc2NyaXB0aW9uIiwiY29udGFjdF90eXBlIiwic2Vhc29uIiwiaGl0X2Rpc3RhbmNlIiwiZXhpdF92ZWxvIiwibGF1bmNoX2FuZ2xlIiwicGl0Y2hfbmFtZSIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZUNoYXJ0IiwiaWR4IiwiY3JlYXRlWEF4aXNCb29sIiwid2lkdGgiLCJoZWlnaHQiLCJwYWRkaW5nIiwibWFyZ2luIiwibGVmdCIsInRvcCIsImJvdHRvbSIsInJpZ2h0Il0sInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tbGJfaGl0X2RhdGFfdmlzdWFsaXphdGlvbi8uL3NyYy9pbmRleC5qcz9iNjM1Il0sInNvdXJjZXNDb250ZW50IjpbImxldCBoaXR0ZXJEYXRhO1xuXG5kMy5jc3YoJ21vb2tpZV90YXRpc190cm91dC5jc3YnLCBkID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgIHBsYXllcl9uYW1lOiBkWydwbGF5ZXJfbmFtZSddLFxuICAgICAgIGhpdF90eXBlOiBkWydldmVudHMnXSxcbiAgICAgICBkZXNjcmlwdGlvbjogZFsnZGVzJ10sXG4gICAgICAgY29udGFjdF90eXBlOiBkWydiYl90eXBlJ10sXG4gICAgICAgc2Vhc29uOiBkWydnYW1lX3llYXInXSxcbiAgICAgICBoaXRfZGlzdGFuY2U6IGRbJ2hpdF9kaXN0YW5jZV9zYyddLFxuICAgICAgIGV4aXRfdmVsbzogZFsnbGF1bmNoX3NwZWVkJ10sXG4gICAgICAgbGF1bmNoX2FuZ2xlOiBkWydsYXVuY2hfYW5nbGUnXSxcbiAgICAgICBwaXRjaF9uYW1lOiBkWydwaXRjaF9uYW1lJ11cbiAgICB9O1xufSkudGhlbihkYXRhID0+IHtcbiAgICBoaXR0ZXJEYXRhID0gZGF0YTtcblxuICAgIGNvbnNvbGUubG9nKGhpdHRlckRhdGEpO1xuXG4gICAgLy9sb29waW5nIHRocm91Z2ggYW5kIGNyZWF0aW5nIHZpc3VhbGl6YXRpb25zIGZvciBldmVyeXRoaW5nIGxhdGVyXG5cbiAgICAvL2NyZWF0ZUNoYXJ0KGhpdHRlckRhdGFbMF0sIDAsIHRydWUpO1xuXG4gICAgLy9mb3IgKGxldCBpID0gMTsgaSA8IGhpdHRlckRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy9jcmVhdGVDaGFydChoaXR0ZXJEYXRhW2ldLCBpKTtcbiAgICAvLyB9XG59KTtcblxuY29uc3QgY3JlYXRlQ2hhcnQgPSAoaGl0dGVyRGF0YSwgaWR4LCBjcmVhdGVYQXhpc0Jvb2wpID0+IHtcbiAgICBsZXQgd2lkdGggPSA4MDA7XG4gICAgbGV0IGhlaWdodCA9IDYwMDtcbiAgICBsZXQgcGFkZGluZyA9IDUwO1xuICAgIGxldCBtYXJnaW4gPSB7bGVmdDogNTAsIHRvcDogODAsIGJvdHRvbTogMzAsIHJpZ2h0OiA0MH07XG5cblxufSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsVUFBSjtBQUVBQyxFQUFFLENBQUNDLEdBQUgsQ0FBTyx3QkFBUCxFQUFpQyxVQUFBQyxDQUFDLEVBQUk7RUFDbEMsT0FBTztJQUNKQyxXQUFXLEVBQUVELENBQUMsQ0FBQyxhQUFELENBRFY7SUFFSkUsUUFBUSxFQUFFRixDQUFDLENBQUMsUUFBRCxDQUZQO0lBR0pHLFdBQVcsRUFBRUgsQ0FBQyxDQUFDLEtBQUQsQ0FIVjtJQUlKSSxZQUFZLEVBQUVKLENBQUMsQ0FBQyxTQUFELENBSlg7SUFLSkssTUFBTSxFQUFFTCxDQUFDLENBQUMsV0FBRCxDQUxMO0lBTUpNLFlBQVksRUFBRU4sQ0FBQyxDQUFDLGlCQUFELENBTlg7SUFPSk8sU0FBUyxFQUFFUCxDQUFDLENBQUMsY0FBRCxDQVBSO0lBUUpRLFlBQVksRUFBRVIsQ0FBQyxDQUFDLGNBQUQsQ0FSWDtJQVNKUyxVQUFVLEVBQUVULENBQUMsQ0FBQyxZQUFEO0VBVFQsQ0FBUDtBQVdILENBWkQsRUFZR1UsSUFaSCxDQVlRLFVBQUFDLElBQUksRUFBSTtFQUNaZCxVQUFVLEdBQUdjLElBQWI7RUFFQUMsT0FBTyxDQUFDQyxHQUFSLENBQVloQixVQUFaLEVBSFksQ0FLWjtFQUVBO0VBRUE7RUFDSTtFQUNKO0FBQ0gsQ0F4QkQ7O0FBMEJBLElBQU1pQixXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDakIsVUFBRCxFQUFha0IsR0FBYixFQUFrQkMsZUFBbEIsRUFBc0M7RUFDdEQsSUFBSUMsS0FBSyxHQUFHLEdBQVo7RUFDQSxJQUFJQyxNQUFNLEdBQUcsR0FBYjtFQUNBLElBQUlDLE9BQU8sR0FBRyxFQUFkO0VBQ0EsSUFBSUMsTUFBTSxHQUFHO0lBQUNDLElBQUksRUFBRSxFQUFQO0lBQVdDLEdBQUcsRUFBRSxFQUFoQjtJQUFvQkMsTUFBTSxFQUFFLEVBQTVCO0lBQWdDQyxLQUFLLEVBQUU7RUFBdkMsQ0FBYjtBQUdILENBUEQifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tbGJfaGl0X2RhdGFfdmlzdWFsaXphdGlvbi8uL3NyYy9pbmRleC5zY3NzPzk3NDUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;