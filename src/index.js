import "./styles.css";
import { fetchCollectionsAndFormatHTMLFragments } from "./get-collections";
import { constructModalFragment } from "./tile-fragments";

(function () {

  async function renderTiles() {
    const collectionEl = document.createElement("div");
    collectionEl.classList.add("collection-container");
    const collectionSet = await fetchCollectionsAndFormatHTMLFragments();
    collectionEl.append(...collectionSet);
    document.body.appendChild(collectionEl);
  }

  function renderModal() {
    document.body.append(constructModalFragment());
  }

  renderTiles();
  renderModal();
})();
