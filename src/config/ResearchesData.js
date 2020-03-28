import researchesImg from "assets/images/researches.jpg";

const createTechnologyData = (
  technology, 
  activeTechnologyId,
  backgroundPosition
) => {
  return {
    ...technology,
    active: technology.techId === activeTechnologyId,
    style: {
      backgroundImage: `url(${researchesImg})`,
      backgroundPosition,
    }
  }
}

export const getResearchesData = (researches, activeTechnologyId) => {
  const {
    energyTechnology,
    laserTechnology,
    ionTechnology,
    hyperspaceTechnology,
    plasmaTechnology,
    combustionDrive,
    impulseDrive,
    hyperspaceDrive,
    espionageTechnology,
    computerTechnology,
    astrophysics,
    intergalacticResearchNetwork,
    gravitonTechnology,
    weaponsTechnology,
    shieldingTechnology,
    armorTechnology,
  } = researches;

  const energyTechnologyData = createTechnologyData(
    energyTechnology,
    activeTechnologyId,
    '0px 0px'
  );

  const laserTechnologyData = createTechnologyData(
    laserTechnology,
    activeTechnologyId,
    '-100px 0px'
  );

  const ionTechnologyData = createTechnologyData(
    ionTechnology,
    activeTechnologyId,
    '-200px 0px'
  );

  const hyperspaceTechnologyData = createTechnologyData(
    hyperspaceTechnology,
    activeTechnologyId,
    '-300px 0px'
  );

  const plasmaTechnologyData = createTechnologyData(
    plasmaTechnology,
    activeTechnologyId,
    '-400px 0px'
  );

  const combustionDriveData = createTechnologyData(
    combustionDrive,
    activeTechnologyId,
    '-500px 0px'
  );

  const impulseDriveData = createTechnologyData(
    impulseDrive,
    activeTechnologyId,
    '-600px 0px'
  );

  const hyperspaceDriveData = createTechnologyData(
    hyperspaceDrive,
    activeTechnologyId,
    '-700px 0px'
  );

  const espionageTechnologyData = createTechnologyData(
    espionageTechnology,
    activeTechnologyId,
    '-800px 0px'
  );

  const computerTechnologyData = createTechnologyData(
    computerTechnology,
    activeTechnologyId,
    '-900px 0px'
  );

  const astrophysicsData = createTechnologyData(
    astrophysics,
    activeTechnologyId,
    '-1000px 0px'
  );

  const intergalacticResearchNetworkData = createTechnologyData(
    intergalacticResearchNetwork,
    activeTechnologyId,
    '-1100px 0px'
  );

  const gravitonTechnologyData = createTechnologyData(
    gravitonTechnology,
    activeTechnologyId,
    '-1100px 0px'
  );

  const weaponsTechnologyData = createTechnologyData(
    weaponsTechnology,
    activeTechnologyId,
    '-1000px 0px'
  );

  const shieldingTechnologyData = createTechnologyData(
    shieldingTechnology,
    activeTechnologyId,
    '-1100px 0px'
  );

  const armorTechnologyData = createTechnologyData(
    armorTechnology,
    activeTechnologyId,
    '-1200px 0px'
  );

  return [
    energyTechnologyData,
    laserTechnologyData,
    ionTechnologyData,
    hyperspaceTechnologyData,
    plasmaTechnologyData,
    combustionDriveData,
    impulseDriveData,
    hyperspaceDriveData,
    espionageTechnologyData,
    computerTechnologyData,
    astrophysicsData,
    intergalacticResearchNetworkData,
    gravitonTechnologyData,
    weaponsTechnologyData,
    shieldingTechnologyData,
    armorTechnologyData,
  ];
}

export default { getResearchesData };
