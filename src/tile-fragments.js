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

export {
  constructTileRowFragment,
  constructSingleTileFragment,
  constructModalFragment,
  createElement,
};
