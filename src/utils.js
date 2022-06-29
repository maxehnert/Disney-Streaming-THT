import { constructModal } from "./tile-components";

const standardCollectionEndpoint = 'https://cd-static.bamgrid.com/dp-117731241344/home';
const singleCollectionEndpoint = 'https://cd-static.bamgrid.com/dp-117731241344/sets';

const handleTileClick = (e, params) => {
  e.preventDefault();

  let target = e.target;
  if (target.className !== "tile-image") {
    return;
  }

  constructModal(params);
};

export { 
    handleTileClick,
    standardCollectionEndpoint,
    singleCollectionEndpoint
 };
