"use strict";
(self["webpackChunkdisney_tht"] = self["webpackChunkdisney_tht"] || []).push([["utils"],{

/***/ "./src/tile-components.js":
/*!********************************!*\
  !*** ./src/tile-components.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "constructModal": () => (/* binding */ constructModal),
/* harmony export */   "constructTile": () => (/* binding */ constructTile),
/* harmony export */   "constructTileRow": () => (/* binding */ constructTileRow)
/* harmony export */ });
/* harmony import */ var _tile_fragments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile-fragments */ "./src/tile-fragments.js");


/**
 * create the html for a single tile
 *
 * @param {array} tileRowData
 * @param {function} handleTileClick
 * @returns DocumentFragment[]
 */
const constructTileRow = (tileRowData, handleTileClick) => {
  const tile = tileRowData.set;
  if (!tile.setId) {
    return `<section></section>`;
  }
  const title = tile.text?.title?.full?.set?.default?.content;
  const tilesListFragment = constructTile(tile.items, handleTileClick);

  return (0,_tile_fragments__WEBPACK_IMPORTED_MODULE_0__.constructTileRowFragment)(tile, title, tilesListFragment);
};

/**
 * create the html for a single tile
 *
 * @param {array} tilesListmap
 * @param {function} handleTileClick
 * @returns DocumentFragment[]
 */
const constructTile = (tilesListmap = [], handleTileClick) => {
  try {
    return tilesListmap.map((tileItem) => {
      const imageTile = tileItem.image.tile;
      // more hacks because the API isn't normalized and I dont have time to finess
      const tileImageVersion = Object.keys(imageTile)[0];
      const tileImageVersionType = Object.keys(imageTile[tileImageVersion])[0];
      const tileImageUrl =
        imageTile[tileImageVersion][tileImageVersionType]?.default?.url;

      let showType = "series";
      if (tileItem.collectionId) {
        showType = "collection";
      } else if (tileItem.programId) {
        showType = "program";
      }
      const tileTitle = tileItem.text.title.full[showType]?.default?.content;

      return (0,_tile_fragments__WEBPACK_IMPORTED_MODULE_0__.constructSingleTileFragment)({
        tileItem,
        tileImageUrl,
        tileTitle,
        showType,
        handleTileClick,
      });
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * @param {tileItem: object, tileTitle: string, showType: string}
 */
const constructModal = ({ tileItem, tileTitle, showType }) => {
  let modal = document.querySelector(".modal-target");
  modal.style.display = "block";
  modal.querySelector(".modal-title").textContent = tileTitle;

  const heroImageType =
    tileItem.image.hero_tile || tileItem.image.hero_collection;
  const heroTitleVersion = Object.keys(heroImageType)[0];
  const usedShowType = showType === "collection" ? "default" : showType;
  const imgUrl =
    heroImageType?.[heroTitleVersion]?.[usedShowType]?.default?.url;
  modal.querySelector(".modal-header-image").src = imgUrl;
  modal.querySelector(".modal-body").innerHTML = `
        ${
          tileItem?.ratings
            ? `<div>TV Rating: ${tileItem?.ratings?.[0]?.system}</div>`
            : ``
        }
        ${
          tileItem?.releases
            ? `<div>Release Date: ${tileItem?.releases?.[0]?.releaseDate}</div>`
            : ``
        }
   `;
};




/***/ }),

/***/ "./src/tile-fragments.js":
/*!*******************************!*\
  !*** ./src/tile-fragments.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "constructModalFragment": () => (/* binding */ constructModalFragment),
/* harmony export */   "constructSingleTileFragment": () => (/* binding */ constructSingleTileFragment),
/* harmony export */   "constructTileRowFragment": () => (/* binding */ constructTileRowFragment),
/* harmony export */   "createElement": () => (/* binding */ createElement)
/* harmony export */ });
const constructTileRowFragment = (tile, title, tilesListFragment) => {
  const fragment = document.createDocumentFragment();
  const tileSection = createElement("section", "tile-section");
  const tileHeader = createElement("h3", "tile-row-title");
  tileHeader.textContent = title;
  const tileUL = createElement("ul", "tile-row");
  tileUL.tabIndex = "0";
  tileUL.append(...tilesListFragment);
  tileSection.appendChild(tileHeader);
  tileSection.appendChild(tileUL);
  fragment.appendChild(tileSection);
  return fragment;
};

const constructSingleTileFragment = ({
  tileItem,
  tileImageUrl,
  tileTitle,
  showType,
  handleTileClick,
}) => {
  const fragment = document.createDocumentFragment();
  const tileImageLi = createElement("li", "tile-image-li");
  tileImageLi.tabIndex = "-1";
  const tileImageWrapper = createElement("div", "tile-image-wrapper");
  tileImageWrapper.onclick = (e) =>
    handleTileClick(e, { tileItem, tileTitle, showType });
  tileImageWrapper.dataset.setId = tileItem.contentId;

  const tileImage = createElement("img", "tile-image");
  tileImage.src = tileImageUrl;
  tileImage.alt = tileTitle;

  tileImageWrapper.appendChild(tileImage);
  tileImageLi.appendChild(tileImageWrapper);
  fragment.appendChild(tileImageLi);

  return fragment;
};

const constructModalFragment = () => {
  const fragment = document.createDocumentFragment();
  const modal = createElement("div", "modal");
  modal.classList.add("modal-target");
  const modalContent = createElement("div", "modal-content");
  const title = createElement("h2", "modal-title");
  const modalBoday = createElement("div", "modal-body");
  const modalHeaderImage = createElement("img", "modal-header-image");
  const close = createElement("span", "modal-close");
  close.onclick = () => {
    modal.style.display = "none";
    modalBoday.textContent = "";
    title.textContent = "";
  };

  modalContent.appendChild(close);
  modalContent.appendChild(modalHeaderImage);
  modalContent.appendChild(title);
  modalContent.appendChild(modalBoday);
  modal.appendChild(modalContent);
  fragment.appendChild(modal);

  return fragment;
};

const createElement = (elementType, className = "") => {
  const element = document.createElement(elementType);
  element.classList.add(className);
  return element;
};




/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleTileClick": () => (/* binding */ handleTileClick),
/* harmony export */   "singleCollectionEndpoint": () => (/* binding */ singleCollectionEndpoint),
/* harmony export */   "standardCollectionEndpoint": () => (/* binding */ standardCollectionEndpoint)
/* harmony export */ });
/* harmony import */ var _tile_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile-components */ "./src/tile-components.js");


const standardCollectionEndpoint = 'https://cd-static.bamgrid.com/dp-117731241344/home';
const singleCollectionEndpoint = 'https://cd-static.bamgrid.com/dp-117731241344/sets';

const handleTileClick = (e, params) => {
  e.preventDefault();

  let target = e.target;
  if (target.className !== "tile-image") {
    return;
  }

  (0,_tile_components__WEBPACK_IMPORTED_MODULE_0__.constructModal)(params);
};




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/utils.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVMseUVBQXdCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBLGFBQWEsNEVBQTJCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7QUFDQSwwQkFBMEIsK0JBQStCO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQywrQkFBK0I7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MscUNBQXFDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBOztBQUUyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUYzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwrQkFBK0I7QUFDeEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFPRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUVpRDs7QUFFbkQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUUsZ0VBQWM7QUFDaEI7O0FBTUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaXNuZXlfdGh0Ly4vc3JjL3RpbGUtY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly9kaXNuZXlfdGh0Ly4vc3JjL3RpbGUtZnJhZ21lbnRzLmpzIiwid2VicGFjazovL2Rpc25leV90aHQvLi9zcmMvdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgY29uc3RydWN0VGlsZVJvd0ZyYWdtZW50LFxuICBjb25zdHJ1Y3RTaW5nbGVUaWxlRnJhZ21lbnQsXG59IGZyb20gXCIuL3RpbGUtZnJhZ21lbnRzXCI7XG5cbi8qKlxuICogY3JlYXRlIHRoZSBodG1sIGZvciBhIHNpbmdsZSB0aWxlXG4gKlxuICogQHBhcmFtIHthcnJheX0gdGlsZVJvd0RhdGFcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZVRpbGVDbGlja1xuICogQHJldHVybnMgRG9jdW1lbnRGcmFnbWVudFtdXG4gKi9cbmNvbnN0IGNvbnN0cnVjdFRpbGVSb3cgPSAodGlsZVJvd0RhdGEsIGhhbmRsZVRpbGVDbGljaykgPT4ge1xuICBjb25zdCB0aWxlID0gdGlsZVJvd0RhdGEuc2V0O1xuICBpZiAoIXRpbGUuc2V0SWQpIHtcbiAgICByZXR1cm4gYDxzZWN0aW9uPjwvc2VjdGlvbj5gO1xuICB9XG4gIGNvbnN0IHRpdGxlID0gdGlsZS50ZXh0Py50aXRsZT8uZnVsbD8uc2V0Py5kZWZhdWx0Py5jb250ZW50O1xuICBjb25zdCB0aWxlc0xpc3RGcmFnbWVudCA9IGNvbnN0cnVjdFRpbGUodGlsZS5pdGVtcywgaGFuZGxlVGlsZUNsaWNrKTtcblxuICByZXR1cm4gY29uc3RydWN0VGlsZVJvd0ZyYWdtZW50KHRpbGUsIHRpdGxlLCB0aWxlc0xpc3RGcmFnbWVudCk7XG59O1xuXG4vKipcbiAqIGNyZWF0ZSB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgdGlsZVxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IHRpbGVzTGlzdG1hcFxuICogQHBhcmFtIHtmdW5jdGlvbn0gaGFuZGxlVGlsZUNsaWNrXG4gKiBAcmV0dXJucyBEb2N1bWVudEZyYWdtZW50W11cbiAqL1xuY29uc3QgY29uc3RydWN0VGlsZSA9ICh0aWxlc0xpc3RtYXAgPSBbXSwgaGFuZGxlVGlsZUNsaWNrKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHRpbGVzTGlzdG1hcC5tYXAoKHRpbGVJdGVtKSA9PiB7XG4gICAgICBjb25zdCBpbWFnZVRpbGUgPSB0aWxlSXRlbS5pbWFnZS50aWxlO1xuICAgICAgLy8gbW9yZSBoYWNrcyBiZWNhdXNlIHRoZSBBUEkgaXNuJ3Qgbm9ybWFsaXplZCBhbmQgSSBkb250IGhhdmUgdGltZSB0byBmaW5lc3NcbiAgICAgIGNvbnN0IHRpbGVJbWFnZVZlcnNpb24gPSBPYmplY3Qua2V5cyhpbWFnZVRpbGUpWzBdO1xuICAgICAgY29uc3QgdGlsZUltYWdlVmVyc2lvblR5cGUgPSBPYmplY3Qua2V5cyhpbWFnZVRpbGVbdGlsZUltYWdlVmVyc2lvbl0pWzBdO1xuICAgICAgY29uc3QgdGlsZUltYWdlVXJsID1cbiAgICAgICAgaW1hZ2VUaWxlW3RpbGVJbWFnZVZlcnNpb25dW3RpbGVJbWFnZVZlcnNpb25UeXBlXT8uZGVmYXVsdD8udXJsO1xuXG4gICAgICBsZXQgc2hvd1R5cGUgPSBcInNlcmllc1wiO1xuICAgICAgaWYgKHRpbGVJdGVtLmNvbGxlY3Rpb25JZCkge1xuICAgICAgICBzaG93VHlwZSA9IFwiY29sbGVjdGlvblwiO1xuICAgICAgfSBlbHNlIGlmICh0aWxlSXRlbS5wcm9ncmFtSWQpIHtcbiAgICAgICAgc2hvd1R5cGUgPSBcInByb2dyYW1cIjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRpbGVUaXRsZSA9IHRpbGVJdGVtLnRleHQudGl0bGUuZnVsbFtzaG93VHlwZV0/LmRlZmF1bHQ/LmNvbnRlbnQ7XG5cbiAgICAgIHJldHVybiBjb25zdHJ1Y3RTaW5nbGVUaWxlRnJhZ21lbnQoe1xuICAgICAgICB0aWxlSXRlbSxcbiAgICAgICAgdGlsZUltYWdlVXJsLFxuICAgICAgICB0aWxlVGl0bGUsXG4gICAgICAgIHNob3dUeXBlLFxuICAgICAgICBoYW5kbGVUaWxlQ2xpY2ssXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7dGlsZUl0ZW06IG9iamVjdCwgdGlsZVRpdGxlOiBzdHJpbmcsIHNob3dUeXBlOiBzdHJpbmd9XG4gKi9cbmNvbnN0IGNvbnN0cnVjdE1vZGFsID0gKHsgdGlsZUl0ZW0sIHRpbGVUaXRsZSwgc2hvd1R5cGUgfSkgPT4ge1xuICBsZXQgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLXRhcmdldFwiKTtcbiAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgbW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbC10aXRsZVwiKS50ZXh0Q29udGVudCA9IHRpbGVUaXRsZTtcblxuICBjb25zdCBoZXJvSW1hZ2VUeXBlID1cbiAgICB0aWxlSXRlbS5pbWFnZS5oZXJvX3RpbGUgfHwgdGlsZUl0ZW0uaW1hZ2UuaGVyb19jb2xsZWN0aW9uO1xuICBjb25zdCBoZXJvVGl0bGVWZXJzaW9uID0gT2JqZWN0LmtleXMoaGVyb0ltYWdlVHlwZSlbMF07XG4gIGNvbnN0IHVzZWRTaG93VHlwZSA9IHNob3dUeXBlID09PSBcImNvbGxlY3Rpb25cIiA/IFwiZGVmYXVsdFwiIDogc2hvd1R5cGU7XG4gIGNvbnN0IGltZ1VybCA9XG4gICAgaGVyb0ltYWdlVHlwZT8uW2hlcm9UaXRsZVZlcnNpb25dPy5bdXNlZFNob3dUeXBlXT8uZGVmYXVsdD8udXJsO1xuICBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLWhlYWRlci1pbWFnZVwiKS5zcmMgPSBpbWdVcmw7XG4gIG1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtYm9keVwiKS5pbm5lckhUTUwgPSBgXG4gICAgICAgICR7XG4gICAgICAgICAgdGlsZUl0ZW0/LnJhdGluZ3NcbiAgICAgICAgICAgID8gYDxkaXY+VFYgUmF0aW5nOiAke3RpbGVJdGVtPy5yYXRpbmdzPy5bMF0/LnN5c3RlbX08L2Rpdj5gXG4gICAgICAgICAgICA6IGBgXG4gICAgICAgIH1cbiAgICAgICAgJHtcbiAgICAgICAgICB0aWxlSXRlbT8ucmVsZWFzZXNcbiAgICAgICAgICAgID8gYDxkaXY+UmVsZWFzZSBEYXRlOiAke3RpbGVJdGVtPy5yZWxlYXNlcz8uWzBdPy5yZWxlYXNlRGF0ZX08L2Rpdj5gXG4gICAgICAgICAgICA6IGBgXG4gICAgICAgIH1cbiAgIGA7XG59O1xuXG5leHBvcnQgeyBjb25zdHJ1Y3RUaWxlLCBjb25zdHJ1Y3RUaWxlUm93LCBjb25zdHJ1Y3RNb2RhbCB9O1xuIiwiY29uc3QgY29uc3RydWN0VGlsZVJvd0ZyYWdtZW50ID0gKHRpbGUsIHRpdGxlLCB0aWxlc0xpc3RGcmFnbWVudCkgPT4ge1xuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgY29uc3QgdGlsZVNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCBcInRpbGUtc2VjdGlvblwiKTtcbiAgY29uc3QgdGlsZUhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBcInRpbGUtcm93LXRpdGxlXCIpO1xuICB0aWxlSGVhZGVyLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIGNvbnN0IHRpbGVVTCA9IGNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBcInRpbGUtcm93XCIpO1xuICB0aWxlVUwudGFiSW5kZXggPSBcIjBcIjtcbiAgdGlsZVVMLmFwcGVuZCguLi50aWxlc0xpc3RGcmFnbWVudCk7XG4gIHRpbGVTZWN0aW9uLmFwcGVuZENoaWxkKHRpbGVIZWFkZXIpO1xuICB0aWxlU2VjdGlvbi5hcHBlbmRDaGlsZCh0aWxlVUwpO1xuICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aWxlU2VjdGlvbik7XG4gIHJldHVybiBmcmFnbWVudDtcbn07XG5cbmNvbnN0IGNvbnN0cnVjdFNpbmdsZVRpbGVGcmFnbWVudCA9ICh7XG4gIHRpbGVJdGVtLFxuICB0aWxlSW1hZ2VVcmwsXG4gIHRpbGVUaXRsZSxcbiAgc2hvd1R5cGUsXG4gIGhhbmRsZVRpbGVDbGljayxcbn0pID0+IHtcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGNvbnN0IHRpbGVJbWFnZUxpID0gY3JlYXRlRWxlbWVudChcImxpXCIsIFwidGlsZS1pbWFnZS1saVwiKTtcbiAgdGlsZUltYWdlTGkudGFiSW5kZXggPSBcIi0xXCI7XG4gIGNvbnN0IHRpbGVJbWFnZVdyYXBwZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwidGlsZS1pbWFnZS13cmFwcGVyXCIpO1xuICB0aWxlSW1hZ2VXcmFwcGVyLm9uY2xpY2sgPSAoZSkgPT5cbiAgICBoYW5kbGVUaWxlQ2xpY2soZSwgeyB0aWxlSXRlbSwgdGlsZVRpdGxlLCBzaG93VHlwZSB9KTtcbiAgdGlsZUltYWdlV3JhcHBlci5kYXRhc2V0LnNldElkID0gdGlsZUl0ZW0uY29udGVudElkO1xuXG4gIGNvbnN0IHRpbGVJbWFnZSA9IGNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgXCJ0aWxlLWltYWdlXCIpO1xuICB0aWxlSW1hZ2Uuc3JjID0gdGlsZUltYWdlVXJsO1xuICB0aWxlSW1hZ2UuYWx0ID0gdGlsZVRpdGxlO1xuXG4gIHRpbGVJbWFnZVdyYXBwZXIuYXBwZW5kQ2hpbGQodGlsZUltYWdlKTtcbiAgdGlsZUltYWdlTGkuYXBwZW5kQ2hpbGQodGlsZUltYWdlV3JhcHBlcik7XG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKHRpbGVJbWFnZUxpKTtcblxuICByZXR1cm4gZnJhZ21lbnQ7XG59O1xuXG5jb25zdCBjb25zdHJ1Y3RNb2RhbEZyYWdtZW50ID0gKCkgPT4ge1xuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgY29uc3QgbW9kYWwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwibW9kYWxcIik7XG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbC10YXJnZXRcIik7XG4gIGNvbnN0IG1vZGFsQ29udGVudCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJtb2RhbC1jb250ZW50XCIpO1xuICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBcIm1vZGFsLXRpdGxlXCIpO1xuICBjb25zdCBtb2RhbEJvZGF5ID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcIm1vZGFsLWJvZHlcIik7XG4gIGNvbnN0IG1vZGFsSGVhZGVySW1hZ2UgPSBjcmVhdGVFbGVtZW50KFwiaW1nXCIsIFwibW9kYWwtaGVhZGVyLWltYWdlXCIpO1xuICBjb25zdCBjbG9zZSA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwibW9kYWwtY2xvc2VcIik7XG4gIGNsb3NlLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIG1vZGFsQm9kYXkudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJcIjtcbiAgfTtcblxuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvc2UpO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxIZWFkZXJJbWFnZSk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbEJvZGF5KTtcbiAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50KTtcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobW9kYWwpO1xuXG4gIHJldHVybiBmcmFnbWVudDtcbn07XG5cbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoZWxlbWVudFR5cGUsIGNsYXNzTmFtZSA9IFwiXCIpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5leHBvcnQge1xuICBjb25zdHJ1Y3RUaWxlUm93RnJhZ21lbnQsXG4gIGNvbnN0cnVjdFNpbmdsZVRpbGVGcmFnbWVudCxcbiAgY29uc3RydWN0TW9kYWxGcmFnbWVudCxcbiAgY3JlYXRlRWxlbWVudCxcbn07XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3RNb2RhbCB9IGZyb20gXCIuL3RpbGUtY29tcG9uZW50c1wiO1xuXG5jb25zdCBzdGFuZGFyZENvbGxlY3Rpb25FbmRwb2ludCA9ICdodHRwczovL2NkLXN0YXRpYy5iYW1ncmlkLmNvbS9kcC0xMTc3MzEyNDEzNDQvaG9tZSc7XG5jb25zdCBzaW5nbGVDb2xsZWN0aW9uRW5kcG9pbnQgPSAnaHR0cHM6Ly9jZC1zdGF0aWMuYmFtZ3JpZC5jb20vZHAtMTE3NzMxMjQxMzQ0L3NldHMnO1xuXG5jb25zdCBoYW5kbGVUaWxlQ2xpY2sgPSAoZSwgcGFyYW1zKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGlmICh0YXJnZXQuY2xhc3NOYW1lICE9PSBcInRpbGUtaW1hZ2VcIikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0cnVjdE1vZGFsKHBhcmFtcyk7XG59O1xuXG5leHBvcnQgeyBcbiAgICBoYW5kbGVUaWxlQ2xpY2ssXG4gICAgc3RhbmRhcmRDb2xsZWN0aW9uRW5kcG9pbnQsXG4gICAgc2luZ2xlQ29sbGVjdGlvbkVuZHBvaW50XG4gfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==