"use strict";
(self["webpackChunkdisney_tht"] = self["webpackChunkdisney_tht"] || []).push([["components"],{

/***/ "./src/tile-components.js":
/*!********************************!*\
  !*** ./src/tile-components.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "constructTile": () => (/* binding */ constructTile),
/* harmony export */   "constructTileRow": () => (/* binding */ constructTileRow)
/* harmony export */ });

/**
 * create the html for a single tile
 *
 * @param {array} tileRowData
 * @returns HTMLElement
 */
const constructTileRow = (tileRowData) => {
  const tile = tileRowData.set;
  if (!tile.setId) {
    return `<section></section>`;
  }
  const title = tile.text?.title?.full?.set?.default?.content;
  const tilesList = constructTile(tile.items);
  return `
        <section class="tile-section">
            <h3 class="tile-row-title">${title}</h3>
            <ul dataset-setid=${tile.setId} class="tile-row">${tilesList}</ul>
        </section>
    `;
};

/**
 * create the html for a single tile
 *
 * @param {array} tilesListmap
 * @returns HTMLElement
 */
const constructTile = (tilesListmap = []) => {
  try {
    return tilesListmap
      .map((tileItem) => {
        const imageTile = tileItem.image.tile;
        // more hacks because the API isn't normalized and I dont have time to finess
        const tileImageVersion = Object.keys(imageTile)[0];
        const tileImageVersionType = Object.keys(
          imageTile[tileImageVersion]
        )[0];
        const tileImageUrl =
          imageTile[tileImageVersion][tileImageVersionType].default.url;

        let showType = "series";
        if (tileItem.collectionId) {
          showType = "collection";
        } else if (tileItem.programId) {
          showType = "program";
        }
        const tileTitle = tileItem.text.title.full[showType].default.content;

        return `
            <li class="tile-image-li">
                <div data-setid=${tileItem.contentId} class="tile-image-wrapper">
                    <img src=${tileImageUrl} alt=${tileTitle} class="tile-image" />
                </div>
            </li>
        `;
      })
      .join(" ");
  } catch (e) {
    console.log(e);
    errorMsg = e.message;
  }
};

const constructModal = (parms) => {
    
}




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/tile-components.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50cy5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsTUFBTTtBQUMvQyxnQ0FBZ0MsWUFBWSxtQkFBbUIsVUFBVTtBQUN6RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDLG9CQUFvQjtBQUN0RCwrQkFBK0IsY0FBYyxNQUFNLFdBQVc7QUFDOUQ7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFMkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaXNuZXlfdGh0Ly4vc3JjL3RpbGUtY29tcG9uZW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogY3JlYXRlIHRoZSBodG1sIGZvciBhIHNpbmdsZSB0aWxlXG4gKlxuICogQHBhcmFtIHthcnJheX0gdGlsZVJvd0RhdGFcbiAqIEByZXR1cm5zIEhUTUxFbGVtZW50XG4gKi9cbmNvbnN0IGNvbnN0cnVjdFRpbGVSb3cgPSAodGlsZVJvd0RhdGEpID0+IHtcbiAgY29uc3QgdGlsZSA9IHRpbGVSb3dEYXRhLnNldDtcbiAgaWYgKCF0aWxlLnNldElkKSB7XG4gICAgcmV0dXJuIGA8c2VjdGlvbj48L3NlY3Rpb24+YDtcbiAgfVxuICBjb25zdCB0aXRsZSA9IHRpbGUudGV4dD8udGl0bGU/LmZ1bGw/LnNldD8uZGVmYXVsdD8uY29udGVudDtcbiAgY29uc3QgdGlsZXNMaXN0ID0gY29uc3RydWN0VGlsZSh0aWxlLml0ZW1zKTtcbiAgcmV0dXJuIGBcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJ0aWxlLXNlY3Rpb25cIj5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cInRpbGUtcm93LXRpdGxlXCI+JHt0aXRsZX08L2gzPlxuICAgICAgICAgICAgPHVsIGRhdGFzZXQtc2V0aWQ9JHt0aWxlLnNldElkfSBjbGFzcz1cInRpbGUtcm93XCI+JHt0aWxlc0xpc3R9PC91bD5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgIGA7XG59O1xuXG4vKipcbiAqIGNyZWF0ZSB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgdGlsZVxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IHRpbGVzTGlzdG1hcFxuICogQHJldHVybnMgSFRNTEVsZW1lbnRcbiAqL1xuY29uc3QgY29uc3RydWN0VGlsZSA9ICh0aWxlc0xpc3RtYXAgPSBbXSkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiB0aWxlc0xpc3RtYXBcbiAgICAgIC5tYXAoKHRpbGVJdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlVGlsZSA9IHRpbGVJdGVtLmltYWdlLnRpbGU7XG4gICAgICAgIC8vIG1vcmUgaGFja3MgYmVjYXVzZSB0aGUgQVBJIGlzbid0IG5vcm1hbGl6ZWQgYW5kIEkgZG9udCBoYXZlIHRpbWUgdG8gZmluZXNzXG4gICAgICAgIGNvbnN0IHRpbGVJbWFnZVZlcnNpb24gPSBPYmplY3Qua2V5cyhpbWFnZVRpbGUpWzBdO1xuICAgICAgICBjb25zdCB0aWxlSW1hZ2VWZXJzaW9uVHlwZSA9IE9iamVjdC5rZXlzKFxuICAgICAgICAgIGltYWdlVGlsZVt0aWxlSW1hZ2VWZXJzaW9uXVxuICAgICAgICApWzBdO1xuICAgICAgICBjb25zdCB0aWxlSW1hZ2VVcmwgPVxuICAgICAgICAgIGltYWdlVGlsZVt0aWxlSW1hZ2VWZXJzaW9uXVt0aWxlSW1hZ2VWZXJzaW9uVHlwZV0uZGVmYXVsdC51cmw7XG5cbiAgICAgICAgbGV0IHNob3dUeXBlID0gXCJzZXJpZXNcIjtcbiAgICAgICAgaWYgKHRpbGVJdGVtLmNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgIHNob3dUeXBlID0gXCJjb2xsZWN0aW9uXCI7XG4gICAgICAgIH0gZWxzZSBpZiAodGlsZUl0ZW0ucHJvZ3JhbUlkKSB7XG4gICAgICAgICAgc2hvd1R5cGUgPSBcInByb2dyYW1cIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0aWxlVGl0bGUgPSB0aWxlSXRlbS50ZXh0LnRpdGxlLmZ1bGxbc2hvd1R5cGVdLmRlZmF1bHQuY29udGVudDtcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPVwidGlsZS1pbWFnZS1saVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zZXRpZD0ke3RpbGVJdGVtLmNvbnRlbnRJZH0gY2xhc3M9XCJ0aWxlLWltYWdlLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9JHt0aWxlSW1hZ2VVcmx9IGFsdD0ke3RpbGVUaXRsZX0gY2xhc3M9XCJ0aWxlLWltYWdlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgIGA7XG4gICAgICB9KVxuICAgICAgLmpvaW4oXCIgXCIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgZXJyb3JNc2cgPSBlLm1lc3NhZ2U7XG4gIH1cbn07XG5cbmNvbnN0IGNvbnN0cnVjdE1vZGFsID0gKHBhcm1zKSA9PiB7XG4gICAgXG59XG5cbmV4cG9ydCB7IGNvbnN0cnVjdFRpbGVSb3csIGNvbnN0cnVjdFRpbGUgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==