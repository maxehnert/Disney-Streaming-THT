import { constructTileRowFragment, constructSingleTileFragment, constructModalFragment, createElement } from './tile-fragments';
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
  
  return constructTileRowFragment(tile, title, tilesListFragment);
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
    return tilesListmap
      .map((tileItem) => {
        const imageTile = tileItem.image.tile;
        // more hacks because the API isn't normalized and I dont have time to finess
        const tileImageVersion = Object.keys(imageTile)[0];
        const tileImageVersionType = Object.keys(
          imageTile[tileImageVersion]
        )[0];
        const tileImageUrl =
          imageTile[tileImageVersion][tileImageVersionType]?.default?.url;

        let showType = "series";
        if (tileItem.collectionId) {
          showType = "collection";
        } else if (tileItem.programId) {
          showType = "program";
        }
        const tileTitle = tileItem.text.title.full[showType]?.default?.content;

        return constructSingleTileFragment({ tileItem, tileImageUrl, tileTitle, showType, handleTileClick })
      });
  } catch (e) {
    console.log(e);
    // errorMsg = e.message;
  }
};

/**
 * @param {tileItem: object, tileTitle: string, showType: string} 
 */
const constructModal = ({tileItem, tileTitle, showType}) => {
   let modal = document.querySelector('.modal-target');
   modal.style.display = "block";
   modal.querySelector('.modal-title').textContent = tileTitle;

   const heroImageType = tileItem.image.hero_tile || tileItem.image.hero_collection ;
   const heroTitleVersion = Object.keys(heroImageType)[0];
   const usedShowType = showType === 'collection' ? 'default' : showType;
   const imgUrl = heroImageType?.[heroTitleVersion]?.[usedShowType]?.default?.url;
   modal.querySelector('.modal-header-image').src = imgUrl;
   modal.querySelector('.modal-body').innerHTML = `
        ${tileItem?.ratings ? `<div>TV Rating: ${tileItem?.ratings?.[0]?.system}</div>` : ``}
        ${tileItem?.releases ? `<div>Release Date: ${tileItem?.releases?.[0]?.releaseDate}</div>` : ``}
   `;
}

export { constructTileRow, constructTile, constructModalFragment, constructModal };
