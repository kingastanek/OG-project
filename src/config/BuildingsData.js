import buildingsImg from "assets/images/buildings.png";

export function getBuildingsData(state, props, onClick) {
  const {
    classes,
    buildings: { metal, cristal, deuterium }
  } = props;
  const { metalActive, cristalActive, deuteriumActive } = state;
  const { toggleMetalActive, toggleCristalActive, toggleDeuteriumActive } = onClick; 
  const metalData = {
    ...metal,
    onClick: toggleMetalActive,
    buildingDetailsActive: metalActive ? classes.buildingImgClicked : "",
    style: {
      backgroundImage: `url(${buildingsImg})`,
      backgroundPosition: "0px 0px"
    }
  };

  const cristalData = {
    ...cristal,
    onClick: toggleCristalActive,
    buildingDetailsActive: cristalActive ? classes.buildingImgClicked : "",
    style: {
      backgroundImage: `url(${buildingsImg})`,
      backgroundPosition: "-100px 0"
    }
  };

  const deuteriumData = {
    ...deuterium,
    onClick: toggleDeuteriumActive,
    buildingDetailsActive: deuteriumActive ? classes.buildingImgClicked : "",
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
