"use strict";
(self["webpackChunkdisney_tht"] = self["webpackChunkdisney_tht"] || []).push([["collection"],{

/***/ "./src/get-collections.js":
/*!********************************!*\
  !*** ./src/get-collections.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchCollectionsAndFormatHTMLFragments": () => (/* binding */ fetchCollectionsAndFormatHTMLFragments),
/* harmony export */   "getCollectionByRef": () => (/* binding */ getCollectionByRef),
/* harmony export */   "getStandardCollection": () => (/* binding */ getStandardCollection)
/* harmony export */ });
/* harmony import */ var _tile_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile-components */ "./src/tile-components.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");


const errorMsg = {};

/**
 * 
 * @returns {array} resCollectionObject[]
 */
const getStandardCollection = async () => {
  try {
    const res = await fetch(`${_utils__WEBPACK_IMPORTED_MODULE_1__.standardCollectionEndpoint}.json`);
    return await res.json();
  } catch (err) {
    console.log(err);
    errorMsg.message = err.message;
  }
};

/**
 * normalize the response data to match generic content result
 * @param {array} refIdCollection
 * @return {object} resCollectionObject
 */
const getCollectionByRef = async (refId) => {

  try {
    const res = await fetch(
      `${_utils__WEBPACK_IMPORTED_MODULE_1__.singleCollectionEndpoint}/${refId}.json`
    );
    const formattedJSON = await res.json();
    const setType = Object.keys(formattedJSON.data)[0];
    return Object.assign({}, { set: formattedJSON.data[setType] });
  } catch (err) {
    console.log(err);
    errorMsg.message = err.message;
  }
};

const getStandardCollectionAndCuratedRefIds = async (cb) => {
  const collectionDataRes = await getStandardCollection();

  const collectionData =
    collectionDataRes?.data?.StandardCollection?.containers;

  let refIdCollection = [];
  let curatedSet = [];

  if (collectionData.length) {
    curatedSet = collectionData.filter((collectionSet) => {
      if (collectionSet.set.refId && collectionSet.set.refId.length) {
        refIdCollection.push(collectionSet.set.refId);
      }
      return !collectionSet.set.refId;
    });
  }

  return cb(curatedSet, refIdCollection);
};

/**
 *
 * @returns combined array of static and dynamic content
 */
const getAllCollections = async () => {
  // here we use this callback to run another async call to get all the dynamic data
  return await getStandardCollectionAndCuratedRefIds(
    async (curatedSet, refIdCollection) => {
      const dynamicCuratedCollections = await Promise.all(
        refIdCollection.map((refId) => getCollectionByRef(refId, errorMsg))
      );

      return [...curatedSet, ...dynamicCuratedCollections];
    }
  );
};

/**
 *
 * @returns DocumentFragment[]
 */
const fetchCollectionsAndFormatHTMLFragments = async () => {
  const curatedCollection = await getAllCollections();
  return curatedCollection.map((collectionSet) =>
    (0,_tile_components__WEBPACK_IMPORTED_MODULE_0__.constructTileRow)(collectionSet, _utils__WEBPACK_IMPORTED_MODULE_1__.handleTileClick)
  );
};




/***/ }),

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/get-collections.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUQ7QUFDMkM7QUFDaEc7O0FBRUE7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsOERBQTBCLENBQUM7QUFDMUQ7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUyw0REFBd0IsQ0FBQyxHQUFHLE1BQU07QUFDM0M7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLElBQUksa0NBQWtDO0FBQ2pFLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxrRUFBZ0IsZ0JBQWdCLG1EQUFlO0FBQ25EO0FBQ0E7O0FBTUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hGd0I7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVMseUVBQXdCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBLGFBQWEsNEVBQTJCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7QUFDQSwwQkFBMEIsK0JBQStCO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQywrQkFBK0I7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MscUNBQXFDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBOztBQUUyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUYzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwrQkFBK0I7QUFDeEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFPRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUVpRDs7QUFFbkQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUUsZ0VBQWM7QUFDaEI7O0FBTUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaXNuZXlfdGh0Ly4vc3JjL2dldC1jb2xsZWN0aW9ucy5qcyIsIndlYnBhY2s6Ly9kaXNuZXlfdGh0Ly4vc3JjL3RpbGUtY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly9kaXNuZXlfdGh0Ly4vc3JjL3RpbGUtZnJhZ21lbnRzLmpzIiwid2VicGFjazovL2Rpc25leV90aHQvLi9zcmMvdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uc3RydWN0VGlsZVJvdyB9IGZyb20gXCIuL3RpbGUtY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgaGFuZGxlVGlsZUNsaWNrLCBzdGFuZGFyZENvbGxlY3Rpb25FbmRwb2ludCwgc2luZ2xlQ29sbGVjdGlvbkVuZHBvaW50IH0gZnJvbSBcIi4vdXRpbHNcIjtcbmNvbnN0IGVycm9yTXNnID0ge307XG5cbi8qKlxuICogXG4gKiBAcmV0dXJucyB7YXJyYXl9IHJlc0NvbGxlY3Rpb25PYmplY3RbXVxuICovXG5jb25zdCBnZXRTdGFuZGFyZENvbGxlY3Rpb24gPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7c3RhbmRhcmRDb2xsZWN0aW9uRW5kcG9pbnR9Lmpzb25gKTtcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgICBlcnJvck1zZy5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cbi8qKlxuICogbm9ybWFsaXplIHRoZSByZXNwb25zZSBkYXRhIHRvIG1hdGNoIGdlbmVyaWMgY29udGVudCByZXN1bHRcbiAqIEBwYXJhbSB7YXJyYXl9IHJlZklkQ29sbGVjdGlvblxuICogQHJldHVybiB7b2JqZWN0fSByZXNDb2xsZWN0aW9uT2JqZWN0XG4gKi9cbmNvbnN0IGdldENvbGxlY3Rpb25CeVJlZiA9IGFzeW5jIChyZWZJZCkgPT4ge1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXG4gICAgICBgJHtzaW5nbGVDb2xsZWN0aW9uRW5kcG9pbnR9LyR7cmVmSWR9Lmpzb25gXG4gICAgKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRKU09OID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICBjb25zdCBzZXRUeXBlID0gT2JqZWN0LmtleXMoZm9ybWF0dGVkSlNPTi5kYXRhKVswXTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgeyBzZXQ6IGZvcm1hdHRlZEpTT04uZGF0YVtzZXRUeXBlXSB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgICBlcnJvck1zZy5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cbmNvbnN0IGdldFN0YW5kYXJkQ29sbGVjdGlvbkFuZEN1cmF0ZWRSZWZJZHMgPSBhc3luYyAoY2IpID0+IHtcbiAgY29uc3QgY29sbGVjdGlvbkRhdGFSZXMgPSBhd2FpdCBnZXRTdGFuZGFyZENvbGxlY3Rpb24oKTtcblxuICBjb25zdCBjb2xsZWN0aW9uRGF0YSA9XG4gICAgY29sbGVjdGlvbkRhdGFSZXM/LmRhdGE/LlN0YW5kYXJkQ29sbGVjdGlvbj8uY29udGFpbmVycztcblxuICBsZXQgcmVmSWRDb2xsZWN0aW9uID0gW107XG4gIGxldCBjdXJhdGVkU2V0ID0gW107XG5cbiAgaWYgKGNvbGxlY3Rpb25EYXRhLmxlbmd0aCkge1xuICAgIGN1cmF0ZWRTZXQgPSBjb2xsZWN0aW9uRGF0YS5maWx0ZXIoKGNvbGxlY3Rpb25TZXQpID0+IHtcbiAgICAgIGlmIChjb2xsZWN0aW9uU2V0LnNldC5yZWZJZCAmJiBjb2xsZWN0aW9uU2V0LnNldC5yZWZJZC5sZW5ndGgpIHtcbiAgICAgICAgcmVmSWRDb2xsZWN0aW9uLnB1c2goY29sbGVjdGlvblNldC5zZXQucmVmSWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICFjb2xsZWN0aW9uU2V0LnNldC5yZWZJZDtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBjYihjdXJhdGVkU2V0LCByZWZJZENvbGxlY3Rpb24pO1xufTtcblxuLyoqXG4gKlxuICogQHJldHVybnMgY29tYmluZWQgYXJyYXkgb2Ygc3RhdGljIGFuZCBkeW5hbWljIGNvbnRlbnRcbiAqL1xuY29uc3QgZ2V0QWxsQ29sbGVjdGlvbnMgPSBhc3luYyAoKSA9PiB7XG4gIC8vIGhlcmUgd2UgdXNlIHRoaXMgY2FsbGJhY2sgdG8gcnVuIGFub3RoZXIgYXN5bmMgY2FsbCB0byBnZXQgYWxsIHRoZSBkeW5hbWljIGRhdGFcbiAgcmV0dXJuIGF3YWl0IGdldFN0YW5kYXJkQ29sbGVjdGlvbkFuZEN1cmF0ZWRSZWZJZHMoXG4gICAgYXN5bmMgKGN1cmF0ZWRTZXQsIHJlZklkQ29sbGVjdGlvbikgPT4ge1xuICAgICAgY29uc3QgZHluYW1pY0N1cmF0ZWRDb2xsZWN0aW9ucyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICByZWZJZENvbGxlY3Rpb24ubWFwKChyZWZJZCkgPT4gZ2V0Q29sbGVjdGlvbkJ5UmVmKHJlZklkLCBlcnJvck1zZykpXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gWy4uLmN1cmF0ZWRTZXQsIC4uLmR5bmFtaWNDdXJhdGVkQ29sbGVjdGlvbnNdO1xuICAgIH1cbiAgKTtcbn07XG5cbi8qKlxuICpcbiAqIEByZXR1cm5zIERvY3VtZW50RnJhZ21lbnRbXVxuICovXG5jb25zdCBmZXRjaENvbGxlY3Rpb25zQW5kRm9ybWF0SFRNTEZyYWdtZW50cyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgY3VyYXRlZENvbGxlY3Rpb24gPSBhd2FpdCBnZXRBbGxDb2xsZWN0aW9ucygpO1xuICByZXR1cm4gY3VyYXRlZENvbGxlY3Rpb24ubWFwKChjb2xsZWN0aW9uU2V0KSA9PlxuICAgIGNvbnN0cnVjdFRpbGVSb3coY29sbGVjdGlvblNldCwgaGFuZGxlVGlsZUNsaWNrKVxuICApO1xufTtcblxuZXhwb3J0IHtcbiAgZ2V0Q29sbGVjdGlvbkJ5UmVmLFxuICBnZXRTdGFuZGFyZENvbGxlY3Rpb24sXG4gIGZldGNoQ29sbGVjdGlvbnNBbmRGb3JtYXRIVE1MRnJhZ21lbnRzLFxufTtcbiIsImltcG9ydCB7XG4gIGNvbnN0cnVjdFRpbGVSb3dGcmFnbWVudCxcbiAgY29uc3RydWN0U2luZ2xlVGlsZUZyYWdtZW50LFxufSBmcm9tIFwiLi90aWxlLWZyYWdtZW50c1wiO1xuXG4vKipcbiAqIGNyZWF0ZSB0aGUgaHRtbCBmb3IgYSBzaW5nbGUgdGlsZVxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IHRpbGVSb3dEYXRhXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGVUaWxlQ2xpY2tcbiAqIEByZXR1cm5zIERvY3VtZW50RnJhZ21lbnRbXVxuICovXG5jb25zdCBjb25zdHJ1Y3RUaWxlUm93ID0gKHRpbGVSb3dEYXRhLCBoYW5kbGVUaWxlQ2xpY2spID0+IHtcbiAgY29uc3QgdGlsZSA9IHRpbGVSb3dEYXRhLnNldDtcbiAgaWYgKCF0aWxlLnNldElkKSB7XG4gICAgcmV0dXJuIGA8c2VjdGlvbj48L3NlY3Rpb24+YDtcbiAgfVxuICBjb25zdCB0aXRsZSA9IHRpbGUudGV4dD8udGl0bGU/LmZ1bGw/LnNldD8uZGVmYXVsdD8uY29udGVudDtcbiAgY29uc3QgdGlsZXNMaXN0RnJhZ21lbnQgPSBjb25zdHJ1Y3RUaWxlKHRpbGUuaXRlbXMsIGhhbmRsZVRpbGVDbGljayk7XG5cbiAgcmV0dXJuIGNvbnN0cnVjdFRpbGVSb3dGcmFnbWVudCh0aWxlLCB0aXRsZSwgdGlsZXNMaXN0RnJhZ21lbnQpO1xufTtcblxuLyoqXG4gKiBjcmVhdGUgdGhlIGh0bWwgZm9yIGEgc2luZ2xlIHRpbGVcbiAqXG4gKiBAcGFyYW0ge2FycmF5fSB0aWxlc0xpc3RtYXBcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZVRpbGVDbGlja1xuICogQHJldHVybnMgRG9jdW1lbnRGcmFnbWVudFtdXG4gKi9cbmNvbnN0IGNvbnN0cnVjdFRpbGUgPSAodGlsZXNMaXN0bWFwID0gW10sIGhhbmRsZVRpbGVDbGljaykgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiB0aWxlc0xpc3RtYXAubWFwKCh0aWxlSXRlbSkgPT4ge1xuICAgICAgY29uc3QgaW1hZ2VUaWxlID0gdGlsZUl0ZW0uaW1hZ2UudGlsZTtcbiAgICAgIC8vIG1vcmUgaGFja3MgYmVjYXVzZSB0aGUgQVBJIGlzbid0IG5vcm1hbGl6ZWQgYW5kIEkgZG9udCBoYXZlIHRpbWUgdG8gZmluZXNzXG4gICAgICBjb25zdCB0aWxlSW1hZ2VWZXJzaW9uID0gT2JqZWN0LmtleXMoaW1hZ2VUaWxlKVswXTtcbiAgICAgIGNvbnN0IHRpbGVJbWFnZVZlcnNpb25UeXBlID0gT2JqZWN0LmtleXMoaW1hZ2VUaWxlW3RpbGVJbWFnZVZlcnNpb25dKVswXTtcbiAgICAgIGNvbnN0IHRpbGVJbWFnZVVybCA9XG4gICAgICAgIGltYWdlVGlsZVt0aWxlSW1hZ2VWZXJzaW9uXVt0aWxlSW1hZ2VWZXJzaW9uVHlwZV0/LmRlZmF1bHQ/LnVybDtcblxuICAgICAgbGV0IHNob3dUeXBlID0gXCJzZXJpZXNcIjtcbiAgICAgIGlmICh0aWxlSXRlbS5jb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgc2hvd1R5cGUgPSBcImNvbGxlY3Rpb25cIjtcbiAgICAgIH0gZWxzZSBpZiAodGlsZUl0ZW0ucHJvZ3JhbUlkKSB7XG4gICAgICAgIHNob3dUeXBlID0gXCJwcm9ncmFtXCI7XG4gICAgICB9XG4gICAgICBjb25zdCB0aWxlVGl0bGUgPSB0aWxlSXRlbS50ZXh0LnRpdGxlLmZ1bGxbc2hvd1R5cGVdPy5kZWZhdWx0Py5jb250ZW50O1xuXG4gICAgICByZXR1cm4gY29uc3RydWN0U2luZ2xlVGlsZUZyYWdtZW50KHtcbiAgICAgICAgdGlsZUl0ZW0sXG4gICAgICAgIHRpbGVJbWFnZVVybCxcbiAgICAgICAgdGlsZVRpdGxlLFxuICAgICAgICBzaG93VHlwZSxcbiAgICAgICAgaGFuZGxlVGlsZUNsaWNrLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge3RpbGVJdGVtOiBvYmplY3QsIHRpbGVUaXRsZTogc3RyaW5nLCBzaG93VHlwZTogc3RyaW5nfVxuICovXG5jb25zdCBjb25zdHJ1Y3RNb2RhbCA9ICh7IHRpbGVJdGVtLCB0aWxlVGl0bGUsIHNob3dUeXBlIH0pID0+IHtcbiAgbGV0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC10YXJnZXRcIik7XG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIG1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtdGl0bGVcIikudGV4dENvbnRlbnQgPSB0aWxlVGl0bGU7XG5cbiAgY29uc3QgaGVyb0ltYWdlVHlwZSA9XG4gICAgdGlsZUl0ZW0uaW1hZ2UuaGVyb190aWxlIHx8IHRpbGVJdGVtLmltYWdlLmhlcm9fY29sbGVjdGlvbjtcbiAgY29uc3QgaGVyb1RpdGxlVmVyc2lvbiA9IE9iamVjdC5rZXlzKGhlcm9JbWFnZVR5cGUpWzBdO1xuICBjb25zdCB1c2VkU2hvd1R5cGUgPSBzaG93VHlwZSA9PT0gXCJjb2xsZWN0aW9uXCIgPyBcImRlZmF1bHRcIiA6IHNob3dUeXBlO1xuICBjb25zdCBpbWdVcmwgPVxuICAgIGhlcm9JbWFnZVR5cGU/LltoZXJvVGl0bGVWZXJzaW9uXT8uW3VzZWRTaG93VHlwZV0/LmRlZmF1bHQ/LnVybDtcbiAgbW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbC1oZWFkZXItaW1hZ2VcIikuc3JjID0gaW1nVXJsO1xuICBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLWJvZHlcIikuaW5uZXJIVE1MID0gYFxuICAgICAgICAke1xuICAgICAgICAgIHRpbGVJdGVtPy5yYXRpbmdzXG4gICAgICAgICAgICA/IGA8ZGl2PlRWIFJhdGluZzogJHt0aWxlSXRlbT8ucmF0aW5ncz8uWzBdPy5zeXN0ZW19PC9kaXY+YFxuICAgICAgICAgICAgOiBgYFxuICAgICAgICB9XG4gICAgICAgICR7XG4gICAgICAgICAgdGlsZUl0ZW0/LnJlbGVhc2VzXG4gICAgICAgICAgICA/IGA8ZGl2PlJlbGVhc2UgRGF0ZTogJHt0aWxlSXRlbT8ucmVsZWFzZXM/LlswXT8ucmVsZWFzZURhdGV9PC9kaXY+YFxuICAgICAgICAgICAgOiBgYFxuICAgICAgICB9XG4gICBgO1xufTtcblxuZXhwb3J0IHsgY29uc3RydWN0VGlsZSwgY29uc3RydWN0VGlsZVJvdywgY29uc3RydWN0TW9kYWwgfTtcbiIsImNvbnN0IGNvbnN0cnVjdFRpbGVSb3dGcmFnbWVudCA9ICh0aWxlLCB0aXRsZSwgdGlsZXNMaXN0RnJhZ21lbnQpID0+IHtcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGNvbnN0IHRpbGVTZWN0aW9uID0gY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgXCJ0aWxlLXNlY3Rpb25cIik7XG4gIGNvbnN0IHRpbGVIZWFkZXIgPSBjcmVhdGVFbGVtZW50KFwiaDNcIiwgXCJ0aWxlLXJvdy10aXRsZVwiKTtcbiAgdGlsZUhlYWRlci50ZXh0Q29udGVudCA9IHRpdGxlO1xuICBjb25zdCB0aWxlVUwgPSBjcmVhdGVFbGVtZW50KFwidWxcIiwgXCJ0aWxlLXJvd1wiKTtcbiAgdGlsZVVMLnRhYkluZGV4ID0gXCIwXCI7XG4gIHRpbGVVTC5hcHBlbmQoLi4udGlsZXNMaXN0RnJhZ21lbnQpO1xuICB0aWxlU2VjdGlvbi5hcHBlbmRDaGlsZCh0aWxlSGVhZGVyKTtcbiAgdGlsZVNlY3Rpb24uYXBwZW5kQ2hpbGQodGlsZVVMKTtcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGlsZVNlY3Rpb24pO1xuICByZXR1cm4gZnJhZ21lbnQ7XG59O1xuXG5jb25zdCBjb25zdHJ1Y3RTaW5nbGVUaWxlRnJhZ21lbnQgPSAoe1xuICB0aWxlSXRlbSxcbiAgdGlsZUltYWdlVXJsLFxuICB0aWxlVGl0bGUsXG4gIHNob3dUeXBlLFxuICBoYW5kbGVUaWxlQ2xpY2ssXG59KSA9PiB7XG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBjb25zdCB0aWxlSW1hZ2VMaSA9IGNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBcInRpbGUtaW1hZ2UtbGlcIik7XG4gIHRpbGVJbWFnZUxpLnRhYkluZGV4ID0gXCItMVwiO1xuICBjb25zdCB0aWxlSW1hZ2VXcmFwcGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcInRpbGUtaW1hZ2Utd3JhcHBlclwiKTtcbiAgdGlsZUltYWdlV3JhcHBlci5vbmNsaWNrID0gKGUpID0+XG4gICAgaGFuZGxlVGlsZUNsaWNrKGUsIHsgdGlsZUl0ZW0sIHRpbGVUaXRsZSwgc2hvd1R5cGUgfSk7XG4gIHRpbGVJbWFnZVdyYXBwZXIuZGF0YXNldC5zZXRJZCA9IHRpbGVJdGVtLmNvbnRlbnRJZDtcblxuICBjb25zdCB0aWxlSW1hZ2UgPSBjcmVhdGVFbGVtZW50KFwiaW1nXCIsIFwidGlsZS1pbWFnZVwiKTtcbiAgdGlsZUltYWdlLnNyYyA9IHRpbGVJbWFnZVVybDtcbiAgdGlsZUltYWdlLmFsdCA9IHRpbGVUaXRsZTtcblxuICB0aWxlSW1hZ2VXcmFwcGVyLmFwcGVuZENoaWxkKHRpbGVJbWFnZSk7XG4gIHRpbGVJbWFnZUxpLmFwcGVuZENoaWxkKHRpbGVJbWFnZVdyYXBwZXIpO1xuICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aWxlSW1hZ2VMaSk7XG5cbiAgcmV0dXJuIGZyYWdtZW50O1xufTtcblxuY29uc3QgY29uc3RydWN0TW9kYWxGcmFnbWVudCA9ICgpID0+IHtcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGNvbnN0IG1vZGFsID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcIm1vZGFsXCIpO1xuICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwibW9kYWwtdGFyZ2V0XCIpO1xuICBjb25zdCBtb2RhbENvbnRlbnQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwibW9kYWwtY29udGVudFwiKTtcbiAgY29uc3QgdGl0bGUgPSBjcmVhdGVFbGVtZW50KFwiaDJcIiwgXCJtb2RhbC10aXRsZVwiKTtcbiAgY29uc3QgbW9kYWxCb2RheSA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJtb2RhbC1ib2R5XCIpO1xuICBjb25zdCBtb2RhbEhlYWRlckltYWdlID0gY3JlYXRlRWxlbWVudChcImltZ1wiLCBcIm1vZGFsLWhlYWRlci1pbWFnZVwiKTtcbiAgY29uc3QgY2xvc2UgPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcIm1vZGFsLWNsb3NlXCIpO1xuICBjbG9zZS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBtb2RhbEJvZGF5LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH07XG5cbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKGNsb3NlKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG1vZGFsSGVhZGVySW1hZ2UpO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxCb2RheSk7XG4gIG1vZGFsLmFwcGVuZENoaWxkKG1vZGFsQ29udGVudCk7XG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKG1vZGFsKTtcblxuICByZXR1cm4gZnJhZ21lbnQ7XG59O1xuXG5jb25zdCBjcmVhdGVFbGVtZW50ID0gKGVsZW1lbnRUeXBlLCBjbGFzc05hbWUgPSBcIlwiKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuZXhwb3J0IHtcbiAgY29uc3RydWN0VGlsZVJvd0ZyYWdtZW50LFxuICBjb25zdHJ1Y3RTaW5nbGVUaWxlRnJhZ21lbnQsXG4gIGNvbnN0cnVjdE1vZGFsRnJhZ21lbnQsXG4gIGNyZWF0ZUVsZW1lbnQsXG59O1xuIiwiaW1wb3J0IHsgY29uc3RydWN0TW9kYWwgfSBmcm9tIFwiLi90aWxlLWNvbXBvbmVudHNcIjtcblxuY29uc3Qgc3RhbmRhcmRDb2xsZWN0aW9uRW5kcG9pbnQgPSAnaHR0cHM6Ly9jZC1zdGF0aWMuYmFtZ3JpZC5jb20vZHAtMTE3NzMxMjQxMzQ0L2hvbWUnO1xuY29uc3Qgc2luZ2xlQ29sbGVjdGlvbkVuZHBvaW50ID0gJ2h0dHBzOi8vY2Qtc3RhdGljLmJhbWdyaWQuY29tL2RwLTExNzczMTI0MTM0NC9zZXRzJztcblxuY29uc3QgaGFuZGxlVGlsZUNsaWNrID0gKGUsIHBhcmFtcykgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xuICBpZiAodGFyZ2V0LmNsYXNzTmFtZSAhPT0gXCJ0aWxlLWltYWdlXCIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdHJ1Y3RNb2RhbChwYXJhbXMpO1xufTtcblxuZXhwb3J0IHsgXG4gICAgaGFuZGxlVGlsZUNsaWNrLFxuICAgIHN0YW5kYXJkQ29sbGVjdGlvbkVuZHBvaW50LFxuICAgIHNpbmdsZUNvbGxlY3Rpb25FbmRwb2ludFxuIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=