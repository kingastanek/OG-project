import buildingsImg from "assets/images/buildings.png";

export function getBuildingsData(buildings, activeBuildingId) {
  const { metal, cristal, deuterium } = buildings;
  const metalData = {
    ...metal,
    active: metal.buildingId === activeBuildingId,
    style: {
      backgroundImage: `url(${buildingsImg})`,
      backgroundPosition: "0px 0px"
    }
  };

  const cristalData = {
    ...cristal,
    active: cristal.buildingId === activeBuildingId,
    style: {
      backgroundImage: `url(${buildingsImg})`,
      backgroundPosition: "-100px 0"
    }
  };

  const deuteriumData = {
    ...deuterium,
    active: deuterium.buildingId === activeBuildingId,
    style: {
      backgroundImage: `url(${buildingsImg})`,
      backgroundPosition: "-200px 0"
    }
  };
  return [metalData, cristalData, deuteriumData];
}

export default {
  getBuildingsData
};
