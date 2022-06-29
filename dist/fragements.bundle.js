"use strict";
(self["webpackChunkdisney_tht"] = self["webpackChunkdisney_tht"] || []).push([["fragements"],{

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/tile-fragments.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhZ2VtZW50cy5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLCtCQUErQjtBQUN4RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQU9FIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGlzbmV5X3RodC8uL3NyYy90aWxlLWZyYWdtZW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb25zdHJ1Y3RUaWxlUm93RnJhZ21lbnQgPSAodGlsZSwgdGl0bGUsIHRpbGVzTGlzdEZyYWdtZW50KSA9PiB7XG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBjb25zdCB0aWxlU2VjdGlvbiA9IGNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIsIFwidGlsZS1zZWN0aW9uXCIpO1xuICBjb25zdCB0aWxlSGVhZGVyID0gY3JlYXRlRWxlbWVudChcImgzXCIsIFwidGlsZS1yb3ctdGl0bGVcIik7XG4gIHRpbGVIZWFkZXIudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgY29uc3QgdGlsZVVMID0gY3JlYXRlRWxlbWVudChcInVsXCIsIFwidGlsZS1yb3dcIik7XG4gIHRpbGVVTC50YWJJbmRleCA9IFwiMFwiO1xuICB0aWxlVUwuYXBwZW5kKC4uLnRpbGVzTGlzdEZyYWdtZW50KTtcbiAgdGlsZVNlY3Rpb24uYXBwZW5kQ2hpbGQodGlsZUhlYWRlcik7XG4gIHRpbGVTZWN0aW9uLmFwcGVuZENoaWxkKHRpbGVVTCk7XG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKHRpbGVTZWN0aW9uKTtcbiAgcmV0dXJuIGZyYWdtZW50O1xufTtcblxuY29uc3QgY29uc3RydWN0U2luZ2xlVGlsZUZyYWdtZW50ID0gKHtcbiAgdGlsZUl0ZW0sXG4gIHRpbGVJbWFnZVVybCxcbiAgdGlsZVRpdGxlLFxuICBzaG93VHlwZSxcbiAgaGFuZGxlVGlsZUNsaWNrLFxufSkgPT4ge1xuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgY29uc3QgdGlsZUltYWdlTGkgPSBjcmVhdGVFbGVtZW50KFwibGlcIiwgXCJ0aWxlLWltYWdlLWxpXCIpO1xuICB0aWxlSW1hZ2VMaS50YWJJbmRleCA9IFwiLTFcIjtcbiAgY29uc3QgdGlsZUltYWdlV3JhcHBlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJ0aWxlLWltYWdlLXdyYXBwZXJcIik7XG4gIHRpbGVJbWFnZVdyYXBwZXIub25jbGljayA9IChlKSA9PlxuICAgIGhhbmRsZVRpbGVDbGljayhlLCB7IHRpbGVJdGVtLCB0aWxlVGl0bGUsIHNob3dUeXBlIH0pO1xuICB0aWxlSW1hZ2VXcmFwcGVyLmRhdGFzZXQuc2V0SWQgPSB0aWxlSXRlbS5jb250ZW50SWQ7XG5cbiAgY29uc3QgdGlsZUltYWdlID0gY3JlYXRlRWxlbWVudChcImltZ1wiLCBcInRpbGUtaW1hZ2VcIik7XG4gIHRpbGVJbWFnZS5zcmMgPSB0aWxlSW1hZ2VVcmw7XG4gIHRpbGVJbWFnZS5hbHQgPSB0aWxlVGl0bGU7XG5cbiAgdGlsZUltYWdlV3JhcHBlci5hcHBlbmRDaGlsZCh0aWxlSW1hZ2UpO1xuICB0aWxlSW1hZ2VMaS5hcHBlbmRDaGlsZCh0aWxlSW1hZ2VXcmFwcGVyKTtcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGlsZUltYWdlTGkpO1xuXG4gIHJldHVybiBmcmFnbWVudDtcbn07XG5cbmNvbnN0IGNvbnN0cnVjdE1vZGFsRnJhZ21lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBjb25zdCBtb2RhbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJtb2RhbFwiKTtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsLXRhcmdldFwiKTtcbiAgY29uc3QgbW9kYWxDb250ZW50ID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcIm1vZGFsLWNvbnRlbnRcIik7XG4gIGNvbnN0IHRpdGxlID0gY3JlYXRlRWxlbWVudChcImgyXCIsIFwibW9kYWwtdGl0bGVcIik7XG4gIGNvbnN0IG1vZGFsQm9kYXkgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwibW9kYWwtYm9keVwiKTtcbiAgY29uc3QgbW9kYWxIZWFkZXJJbWFnZSA9IGNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgXCJtb2RhbC1oZWFkZXItaW1hZ2VcIik7XG4gIGNvbnN0IGNsb3NlID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJtb2RhbC1jbG9zZVwiKTtcbiAgY2xvc2Uub25jbGljayA9ICgpID0+IHtcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgbW9kYWxCb2RheS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlwiO1xuICB9O1xuXG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChjbG9zZSk7XG4gIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbEhlYWRlckltYWdlKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKG1vZGFsQm9kYXkpO1xuICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpO1xuICBmcmFnbWVudC5hcHBlbmRDaGlsZChtb2RhbCk7XG5cbiAgcmV0dXJuIGZyYWdtZW50O1xufTtcblxuY29uc3QgY3JlYXRlRWxlbWVudCA9IChlbGVtZW50VHlwZSwgY2xhc3NOYW1lID0gXCJcIikgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbmV4cG9ydCB7XG4gIGNvbnN0cnVjdFRpbGVSb3dGcmFnbWVudCxcbiAgY29uc3RydWN0U2luZ2xlVGlsZUZyYWdtZW50LFxuICBjb25zdHJ1Y3RNb2RhbEZyYWdtZW50LFxuICBjcmVhdGVFbGVtZW50LFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==