import buildingsImg from "assets/images/buildings.png";
import strings from "config/strings";

const createBuildingData = (
  building, 
  activeBuildingId,
  backgroundPosition,
  bigImgBackgroundPosition,
  description,
) => {
  return {
    ...building,
    active: building.buildingId === activeBuildingId,
    style: {
      backgroundImage: `url(${buildingsImg})`,
      backgroundPosition,
    },
    bigImgBackgroundPosition,
    description,
  }
}

export const getBuildingsData = (buildings, activeBuildingId) => {
  const { metal, cristal, deuterium } = buildings;

  const metalData = createBuildingData(
    metal,
    activeBuildingId,
    '0px 0px',
    '2px 0px',
    strings.METAL_DESCRIPTION,
  );

  const cristalData = createBuildingData(
    cristal,
    activeBuildingId,
    '-100px 0px',
    '-194px 0px',
    strings.CRISTAL_DESCRIPTION
  );

  const deuteriumData = createBuildingData(
    deuterium,
    activeBuildingId,
    '-200px 0px',
    '-389px 0px',
    strings.DEUTERIUM_DESCRIPTION,
  );

  return [metalData, cristalData, deuteriumData];
}

export default { getBuildingsData };
