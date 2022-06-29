import { constructTileRow } from "./tile-components";
import { handleTileClick, standardCollectionEndpoint, singleCollectionEndpoint } from "./utils";
const errorMsg = {};

/**
 * 
 * @returns {array} resCollectionObject[]
 */
const getStandardCollection = async () => {
  try {
    const res = await fetch(`${standardCollectionEndpoint}.json`);
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
      `${singleCollectionEndpoint}/${refId}.json`
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
    constructTileRow(collectionSet, handleTileClick)
  );
};

export {
  getCollectionByRef,
  getStandardCollection,
  fetchCollectionsAndFormatHTMLFragments,
};
