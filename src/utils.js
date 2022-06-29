import { constructModal } from "./tile-components";

const handleTileClick = (e, params) => {
  e.preventDefault();

  let target = e.target;
  if (target.className !== "tile-image") {
    return;
  }
  constructModal(params);

  console.log("clicked ", e, "\n", params);
};

export { handleTileClick };
