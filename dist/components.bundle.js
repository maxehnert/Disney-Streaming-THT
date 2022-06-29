"use strict";
(self["webpackChunkdisney_tht"] = self["webpackChunkdisney_tht"] || []).push([["components"],{

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




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/tile-components.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50cy5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUcwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyx5RUFBd0I7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUEsYUFBYSw0RUFBMkI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBLDBCQUEwQiwrQkFBK0I7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLCtCQUErQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxxQ0FBcUM7QUFDekU7QUFDQTtBQUNBO0FBQ0E7O0FBRTJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRjNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLCtCQUErQjtBQUN4RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQU9FIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGlzbmV5X3RodC8uL3NyYy90aWxlLWNvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vZGlzbmV5X3RodC8uL3NyYy90aWxlLWZyYWdtZW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBjb25zdHJ1Y3RUaWxlUm93RnJhZ21lbnQsXG4gIGNvbnN0cnVjdFNpbmdsZVRpbGVGcmFnbWVudCxcbn0gZnJvbSBcIi4vdGlsZS1mcmFnbWVudHNcIjtcblxuLyoqXG4gKiBjcmVhdGUgdGhlIGh0bWwgZm9yIGEgc2luZ2xlIHRpbGVcbiAqXG4gKiBAcGFyYW0ge2FycmF5fSB0aWxlUm93RGF0YVxuICogQHBhcmFtIHtmdW5jdGlvbn0gaGFuZGxlVGlsZUNsaWNrXG4gKiBAcmV0dXJucyBEb2N1bWVudEZyYWdtZW50W11cbiAqL1xuY29uc3QgY29uc3RydWN0VGlsZVJvdyA9ICh0aWxlUm93RGF0YSwgaGFuZGxlVGlsZUNsaWNrKSA9PiB7XG4gIGNvbnN0IHRpbGUgPSB0aWxlUm93RGF0YS5zZXQ7XG4gIGlmICghdGlsZS5zZXRJZCkge1xuICAgIHJldHVybiBgPHNlY3Rpb24+PC9zZWN0aW9uPmA7XG4gIH1cbiAgY29uc3QgdGl0bGUgPSB0aWxlLnRleHQ/LnRpdGxlPy5mdWxsPy5zZXQ/LmRlZmF1bHQ/LmNvbnRlbnQ7XG4gIGNvbnN0IHRpbGVzTGlzdEZyYWdtZW50ID0gY29uc3RydWN0VGlsZSh0aWxlLml0ZW1zLCBoYW5kbGVUaWxlQ2xpY2spO1xuXG4gIHJldHVybiBjb25zdHJ1Y3RUaWxlUm93RnJhZ21lbnQodGlsZSwgdGl0bGUsIHRpbGVzTGlzdEZyYWdtZW50KTtcbn07XG5cbi8qKlxuICogY3JlYXRlIHRoZSBodG1sIGZvciBhIHNpbmdsZSB0aWxlXG4gKlxuICogQHBhcmFtIHthcnJheX0gdGlsZXNMaXN0bWFwXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGVUaWxlQ2xpY2tcbiAqIEByZXR1cm5zIERvY3VtZW50RnJhZ21lbnRbXVxuICovXG5jb25zdCBjb25zdHJ1Y3RUaWxlID0gKHRpbGVzTGlzdG1hcCA9IFtdLCBoYW5kbGVUaWxlQ2xpY2spID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gdGlsZXNMaXN0bWFwLm1hcCgodGlsZUl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGltYWdlVGlsZSA9IHRpbGVJdGVtLmltYWdlLnRpbGU7XG4gICAgICAvLyBtb3JlIGhhY2tzIGJlY2F1c2UgdGhlIEFQSSBpc24ndCBub3JtYWxpemVkIGFuZCBJIGRvbnQgaGF2ZSB0aW1lIHRvIGZpbmVzc1xuICAgICAgY29uc3QgdGlsZUltYWdlVmVyc2lvbiA9IE9iamVjdC5rZXlzKGltYWdlVGlsZSlbMF07XG4gICAgICBjb25zdCB0aWxlSW1hZ2VWZXJzaW9uVHlwZSA9IE9iamVjdC5rZXlzKGltYWdlVGlsZVt0aWxlSW1hZ2VWZXJzaW9uXSlbMF07XG4gICAgICBjb25zdCB0aWxlSW1hZ2VVcmwgPVxuICAgICAgICBpbWFnZVRpbGVbdGlsZUltYWdlVmVyc2lvbl1bdGlsZUltYWdlVmVyc2lvblR5cGVdPy5kZWZhdWx0Py51cmw7XG5cbiAgICAgIGxldCBzaG93VHlwZSA9IFwic2VyaWVzXCI7XG4gICAgICBpZiAodGlsZUl0ZW0uY29sbGVjdGlvbklkKSB7XG4gICAgICAgIHNob3dUeXBlID0gXCJjb2xsZWN0aW9uXCI7XG4gICAgICB9IGVsc2UgaWYgKHRpbGVJdGVtLnByb2dyYW1JZCkge1xuICAgICAgICBzaG93VHlwZSA9IFwicHJvZ3JhbVwiO1xuICAgICAgfVxuICAgICAgY29uc3QgdGlsZVRpdGxlID0gdGlsZUl0ZW0udGV4dC50aXRsZS5mdWxsW3Nob3dUeXBlXT8uZGVmYXVsdD8uY29udGVudDtcblxuICAgICAgcmV0dXJuIGNvbnN0cnVjdFNpbmdsZVRpbGVGcmFnbWVudCh7XG4gICAgICAgIHRpbGVJdGVtLFxuICAgICAgICB0aWxlSW1hZ2VVcmwsXG4gICAgICAgIHRpbGVUaXRsZSxcbiAgICAgICAgc2hvd1R5cGUsXG4gICAgICAgIGhhbmRsZVRpbGVDbGljayxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHt0aWxlSXRlbTogb2JqZWN0LCB0aWxlVGl0bGU6IHN0cmluZywgc2hvd1R5cGU6IHN0cmluZ31cbiAqL1xuY29uc3QgY29uc3RydWN0TW9kYWwgPSAoeyB0aWxlSXRlbSwgdGlsZVRpdGxlLCBzaG93VHlwZSB9KSA9PiB7XG4gIGxldCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtdGFyZ2V0XCIpO1xuICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLXRpdGxlXCIpLnRleHRDb250ZW50ID0gdGlsZVRpdGxlO1xuXG4gIGNvbnN0IGhlcm9JbWFnZVR5cGUgPVxuICAgIHRpbGVJdGVtLmltYWdlLmhlcm9fdGlsZSB8fCB0aWxlSXRlbS5pbWFnZS5oZXJvX2NvbGxlY3Rpb247XG4gIGNvbnN0IGhlcm9UaXRsZVZlcnNpb24gPSBPYmplY3Qua2V5cyhoZXJvSW1hZ2VUeXBlKVswXTtcbiAgY29uc3QgdXNlZFNob3dUeXBlID0gc2hvd1R5cGUgPT09IFwiY29sbGVjdGlvblwiID8gXCJkZWZhdWx0XCIgOiBzaG93VHlwZTtcbiAgY29uc3QgaW1nVXJsID1cbiAgICBoZXJvSW1hZ2VUeXBlPy5baGVyb1RpdGxlVmVyc2lvbl0/Llt1c2VkU2hvd1R5cGVdPy5kZWZhdWx0Py51cmw7XG4gIG1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtaGVhZGVyLWltYWdlXCIpLnNyYyA9IGltZ1VybDtcbiAgbW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbC1ib2R5XCIpLmlubmVySFRNTCA9IGBcbiAgICAgICAgJHtcbiAgICAgICAgICB0aWxlSXRlbT8ucmF0aW5nc1xuICAgICAgICAgICAgPyBgPGRpdj5UViBSYXRpbmc6ICR7dGlsZUl0ZW0/LnJhdGluZ3M/LlswXT8uc3lzdGVtfTwvZGl2PmBcbiAgICAgICAgICAgIDogYGBcbiAgICAgICAgfVxuICAgICAgICAke1xuICAgICAgICAgIHRpbGVJdGVtPy5yZWxlYXNlc1xuICAgICAgICAgICAgPyBgPGRpdj5SZWxlYXNlIERhdGU6ICR7dGlsZUl0ZW0/LnJlbGVhc2VzPy5bMF0/LnJlbGVhc2VEYXRlfTwvZGl2PmBcbiAgICAgICAgICAgIDogYGBcbiAgICAgICAgfVxuICAgYDtcbn07XG5cbmV4cG9ydCB7IGNvbnN0cnVjdFRpbGUsIGNvbnN0cnVjdFRpbGVSb3csIGNvbnN0cnVjdE1vZGFsIH07XG4iLCJjb25zdCBjb25zdHJ1Y3RUaWxlUm93RnJhZ21lbnQgPSAodGlsZSwgdGl0bGUsIHRpbGVzTGlzdEZyYWdtZW50KSA9PiB7XG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBjb25zdCB0aWxlU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIsIFwidGlsZS1zZWN0aW9uXCIpO1xuICBjb25zdCB0aWxlSGVhZGVyID0gY3JlYXRlRWxlbWVudChcImgzXCIsIFwidGlsZS1yb3ctdGl0bGVcIik7XG4gIHRpbGVIZWFkZXIudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgY29uc3QgdGlsZVVMID0gY3JlYXRlRWxlbWVudChcInVsXCIsIFwidGlsZS1yb3dcIik7XG4gIHRpbGVVTC50YWJJbmRleCA9IFwiMFwiO1xuICB0aWxlVUwuYXBwZW5kKC4uLnRpbGVzTGlzdEZyYWdtZW50KTtcbiAgdGlsZVNlY3Rpb24uYXBwZW5kQ2hpbGQodGlsZUhlYWRlcik7XG4gIHRpbGVTZWN0aW9uLmFwcGVuZENoaWxkKHRpbGVVTCk7XG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKHRpbGVTZWN0aW9uKTtcbiAgcmV0dXJuIGZyYWdtZW50O1xufTtcblxuY29uc3QgY29uc3RydWN0U2luZ2xlVGlsZUZyYWdtZW50ID0gKHtcbiAgdGlsZUl0ZW0sXG4gIHRpbGVJbWFnZVVybCxcbiAgdGlsZVRpdGxlLFxuICBzaG93VHlwZSxcbiAgaGFuZGxlVGlsZUNsaWNrLFxufSkgPT4ge1xuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgY29uc3QgdGlsZUltYWdlTGkgPSBjcmVhdGVFbGVtZW50KFwibGlcIiwgXCJ0aWxlLWltYWdlLWxpXCIpO1xuICB0aWxlSW1hZ2VMaS50YWJJbmRleCA9IFwiLTFcIjtcbiAgY29uc3QgdGlsZUltYWdlV3JhcHBlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJ0aWxlLWltYWdlLXdyYXBwZXJcIik7XG4gIHRpbGVJbWFnZVdyYXBwZXIub25jbGljayA9IChlKSA9PlxuICAgIGhhbmRsZVRpbGVDbGljayhlLCB7IHRpbGVJdGVtLCB0aWxlVGl0bGUsIHNob3dUeXBlIH0pO1xuICB0aWxlSW1hZ2VXcmFwcGVyLmRhdGFzZXQuc2V0SWQgPSB0aWxlSXRlbS5jb250ZW50SWQ7XG5cbiAgY29uc3QgdGlsZUltYWdlID0gY3JlYXRlRWxlbWVudChcImltZ1wiLCBcInRpbGUtaW1hZ2VcIik7XG4gIHRpbGVJbWFnZS5zcmMgPSB0aWxlSW1hZ2VVcmw7XG4gIHRpbGVJbWFnZS5hbHQgPSB0aWxlVGl0bGU7XG5cbiAgdGlsZUltYWdlV3JhcHBlci5hcHBlbmRDaGlsZCh0aWxlSW1hZ2UpO1xuICB0aWxlSW1hZ2VMaS5hcHBlbmRDaGlsZCh0aWxlSW1hZ2VXcmFwcGVyKTtcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGlsZUltYWdlTGkpO1xuXG4gIHJldHVybiBmcmFnbWVudDtcbn07XG5cbmNvbnN0IGNvbnN0cnVjdE1vZGFsRnJhZ21lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBjb25zdCBtb2RhbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJtb2RhbFwiKTtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsLXRhcmdldFwiKTtcbiAgY29uc3QgbW9kYWxDb250ZW50ID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcIm1vZGFsLWNvbnRlbnRcIik7XG4gIGNvbnN0IHRpdGxlID0gY3JlYXRlRWxlbWVudChcImgyXCIsIFwibW9kYWwtdGl0bGVcIik7XG4gIGNvbnN0IG1vZGFsQm9kYXkgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwibW9kYWwtYm9keVwiKTtcbiAgY29uc3QgbW9kYWxIZWFkZXJJbWFnZSA9IGNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgXCJtb2RhbC1oZWFkZXItaW1hZ2VcIik7XG4gIGNvbnN0IGNsb3NlID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJtb2RhbC1jbG9zZVwiKTtcbiAgY2xvc2Uub25jbGljayA9ICgpID0+IHtcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgbW9kYWxCb2RheS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlwiO1xuICB9O1xuXG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChjbG9zZSk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbEhlYWRlckltYWdlKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG1vZGFsQm9kYXkpO1xuICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpO1xuICBmcmFnbWVudC5hcHBlbmRDaGlsZChtb2RhbCk7XG5cbiAgcmV0dXJuIGZyYWdtZW50O1xufTtcblxuY29uc3QgY3JlYXRlRWxlbWVudCA9IChlbGVtZW50VHlwZSwgY2xhc3NOYW1lID0gXCJcIikgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbmV4cG9ydCB7XG4gIGNvbnN0cnVjdFRpbGVSb3dGcmFnbWVudCxcbiAgY29uc3RydWN0U2luZ2xlVGlsZUZyYWdtZW50LFxuICBjb25zdHJ1Y3RNb2RhbEZyYWdtZW50LFxuICBjcmVhdGVFbGVtZW50LFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==