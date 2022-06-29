"use strict";
(self["webpackChunkdisney_tht"] = self["webpackChunkdisney_tht"] || []).push([["fetch"],{

/***/ "./src/get-collections.js":
/*!********************************!*\
  !*** ./src/get-collections.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCollectionByRef": () => (/* binding */ getCollectionByRef),
/* harmony export */   "getStandardCollection": () => (/* binding */ getStandardCollection)
/* harmony export */ });
const getStandardCollection = async (errorMsg) => {
  try {
    errorMsg = '';
    const res = await fetch(
      "https://cd-static.bamgrid.com/dp-117731241344/home.json"
    );
    return await res.json();
  } catch (err) {
    console.log(err);
    errorMsg = err.message;
  }
};

/**
 * normalize the response data to match generic content result
 * @param {array} refIdCollection
 * @param {string} errorMsg
 * @return {object}
 */
const getCollectionByRef = async (refId, errorMsg) => {
  // promise.all over an array of refIDs
  // only a single fetch request here though
  try {
    errorMsg = '';
    const res = await fetch(
      `https://cd-static.bamgrid.com/dp-117731241344/sets/${refId}.json`
    );
    const formattedJSON = await res.json();
    const setType = Object.keys(formattedJSON.data)[0];
    return Object.assign({}, { set: formattedJSON.data[setType] });
  } catch (err) {
    console.log(err);
    errorMsg = err.message;
  }
};



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/get-collections.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2guYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELE1BQU07QUFDbEU7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLElBQUksa0NBQWtDO0FBQ2pFLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Rpc25leV90aHQvLi9zcmMvZ2V0LWNvbGxlY3Rpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdldFN0YW5kYXJkQ29sbGVjdGlvbiA9IGFzeW5jIChlcnJvck1zZykgPT4ge1xuICB0cnkge1xuICAgIGVycm9yTXNnID0gJyc7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgICBcImh0dHBzOi8vY2Qtc3RhdGljLmJhbWdyaWQuY29tL2RwLTExNzczMTI0MTM0NC9ob21lLmpzb25cIlxuICAgICk7XG4gICAgcmV0dXJuIGF3YWl0IHJlcy5qc29uKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgZXJyb3JNc2cgPSBlcnIubWVzc2FnZTtcbiAgfVxufTtcblxuLyoqXG4gKiBub3JtYWxpemUgdGhlIHJlc3BvbnNlIGRhdGEgdG8gbWF0Y2ggZ2VuZXJpYyBjb250ZW50IHJlc3VsdFxuICogQHBhcmFtIHthcnJheX0gcmVmSWRDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JNc2dcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuY29uc3QgZ2V0Q29sbGVjdGlvbkJ5UmVmID0gYXN5bmMgKHJlZklkLCBlcnJvck1zZykgPT4ge1xuICAvLyBwcm9taXNlLmFsbCBvdmVyIGFuIGFycmF5IG9mIHJlZklEc1xuICAvLyBvbmx5IGEgc2luZ2xlIGZldGNoIHJlcXVlc3QgaGVyZSB0aG91Z2hcbiAgdHJ5IHtcbiAgICBlcnJvck1zZyA9ICcnO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vY2Qtc3RhdGljLmJhbWdyaWQuY29tL2RwLTExNzczMTI0MTM0NC9zZXRzLyR7cmVmSWR9Lmpzb25gXG4gICAgKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRKU09OID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICBjb25zdCBzZXRUeXBlID0gT2JqZWN0LmtleXMoZm9ybWF0dGVkSlNPTi5kYXRhKVswXTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgeyBzZXQ6IGZvcm1hdHRlZEpTT04uZGF0YVtzZXRUeXBlXSB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgICBlcnJvck1zZyA9IGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5leHBvcnQgeyBnZXRDb2xsZWN0aW9uQnlSZWYsIGdldFN0YW5kYXJkQ29sbGVjdGlvbiB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9