import buildingsImg from "assets/images/buildings.png";

export function getBuildingsData(buildings) {
  const { metal, cristal, deuterium } = buildings;
  const metalData = {
    ...metal,
    name: 'metal',
    style: {
      backgroundImage: `url(${buildingsImg})`,
      backgroundPosition: "0px 0px"
    }
  };

  const cristalData = {
    ...cristal,
    name: 'cristal',
    style: {
      backgroundImage: `url(${buildingsImg})`,
      backgroundPosition: "-100px 0"
    }
  };

  const deuteriumData = {
    ...deuterium,
    name: 'deuterium',
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
