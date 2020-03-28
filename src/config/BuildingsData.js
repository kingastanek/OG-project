import buildingsImg from "assets/images/buildings.png";

const createBuildingData = (
  building, 
  activeBuildingId,
  backgroundPosition
) => {
  return {
    ...building,
    active: building.buildingId === activeBuildingId,
    style: {
      backgroundImage: `url(${buildingsImg})`,
      backgroundPosition,
    }
  }
}

export const getBuildingsData = (buildings, activeBuildingId) => {
  const { metal, cristal, deuterium } = buildings;

  const metalData = createBuildingData(
    metal,
    activeBuildingId,
    '0px 0px'
  );

  const cristalData = createBuildingData(
    cristal,
    activeBuildingId,
    '-100px 0px'
  );

  const deuteriumData = createBuildingData(
    deuterium,
    activeBuildingId,
    '-200px 0px'
  );

  return [metalData, cristalData, deuteriumData];
}

export default { getBuildingsData };
