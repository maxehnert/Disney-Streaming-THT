import "./styles.css";
import { getCollectionByRef, getStandardCollection, fetchCollectionsAndFormatHTMLFragments } from "./get-collections";
import { constructTileRow, constructModal } from "./tile-components";
import { constructModalFragment } from "./tile-fragments";

(function () {

//   const getStandardCollectionAndCuratedRefIds = async (cb) => {
//     const collectionDataRes = await getStandardCollection(errorMsg);

//     const collectionData =
//       collectionDataRes?.data?.StandardCollection?.containers;

//     let refIdCollection = [];
//     let curatedSet = [];

//     if (collectionData.length) {
//       curatedSet = collectionData.filter((collectionSet) => {
//         if (collectionSet.set.refId && collectionSet.set.refId.length) {
//           refIdCollection.push(collectionSet.set.refId);
//         }
//         return !collectionSet.set.refId;
//       });
//     }

//     return cb(curatedSet, refIdCollection);
//   };

  /**
   *
   * @returns combined array of static and dynamic content
   */
//   const getAllCollections = async () => {
//     // here we use this callback to run another async call to get all the dynamic data
//     return await getStandardCollectionAndCuratedRefIds(
//       async (curatedSet, refIdCollection) => {
//         const dynamicCuratedCollections = await Promise.all(
//           refIdCollection.map((refId) => getCollectionByRef(refId, errorMsg))
//         );

//         return [...curatedSet, ...dynamicCuratedCollections];
//       }
//     );
//   };

//   const fetchCollectionsAndFormatHTMLFragments = async () => {
//     const curatedCollection = await getAllCollections();
//     return curatedCollection.map((collectionSet) =>
//       constructTileRow(collectionSet, handleTileClick)
//     );
//   };

//   const handleTileClick = (e, params) => {
//     e.preventDefault();

//     let target = e.target;
//     if (target.className !== "tile-image") {
//       return;
//     }
//     constructModal(params);

//     console.log("clicked ", e, "\n", params);
//   };

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
