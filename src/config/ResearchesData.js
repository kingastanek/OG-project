import researchesImg from "assets/images/researches.jpg";
import strings from "config/strings";

const createTechnologyData = (
  technology, 
  activeTechnologyId,
  backgroundPosition,
  bigImgBackgroundPosition,
  title,
  description,
) => {
  return {
    ...technology,
    active: technology.techId === activeTechnologyId,
    style: {
      backgroundImage: `url(${researchesImg})`,
      backgroundPosition,
    },
    bigImgBackgroundPosition,
    title,
    description,
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
    '0px 0px',
    '1px 0px',
    strings.ENERGY_TECHNOLOGY,
    strings.ENERGY_TECHNOLOGY_DESCRIPTION,
  );

  const laserTechnologyData = createTechnologyData(
    laserTechnology,
    activeTechnologyId,
    '-99px 0px',
    '-194px 0px',
    strings.LASER_TECHNOLOGY,
    strings.LASER_TECHNOLOGY_DESCRIPTION,
  );

  const ionTechnologyData = createTechnologyData(
    ionTechnology,
    activeTechnologyId,
    '-198px 0px',
    '-390px 0px',
    strings.ION_TECHNOLOGY,
    strings.ION_TECHNOLOGY_DESCRIPTION,
  );

  const hyperspaceTechnologyData = createTechnologyData(
    hyperspaceTechnology,
    activeTechnologyId,
    '-298px 0px',
    '-586px 0px',
    strings.HYPERSPACE_TECHNOLOGY,
    strings.HYPERSPACE_TECHNOLOGY_DESCRIPTION,
  );

  const plasmaTechnologyData = createTechnologyData(
    plasmaTechnology,
    activeTechnologyId,
    '-397px 0px',
    '-781px 0px',
    strings.PLASMA_TECHNOLOGY,
    strings.PLASMA_TECHNOLOGY_DESCRIPTION,
  );

  const combustionDriveData = createTechnologyData(
    combustionDrive,
    activeTechnologyId,
    '-497px 0px',
    '-977px 0px',
    strings.COMBUSTION_DRIVE,
    strings.COMBUSTION_DRIVE_DESCRIPTION,
  );

  const impulseDriveData = createTechnologyData(
    impulseDrive,
    activeTechnologyId,
    '-595px 0px',
    '-1170px 0px',
    strings.IMPULSE_DRIVE,
    strings.IMPULSE_DRIVE_DESCRIPTION,
  );

  const hyperspaceDriveData = createTechnologyData(
    hyperspaceDrive,
    activeTechnologyId,
    '-695px 0px',
    '-1366px 0px',
    strings.HYPERSPACE_DRIVE,
    strings.HYPERSPACE_DRIVE_DESCRIPTION,
  );

  const espionageTechnologyData = createTechnologyData(
    espionageTechnology,
    activeTechnologyId,
    '-793px 0px',
    '-1562px 0px',
    strings.ESPIONAGE_TECHNOLOGY,
    strings.ESPIONAGE_TECHNOLOGY_DESCRIPTION,
  );

  const computerTechnologyData = createTechnologyData(
    computerTechnology,
    activeTechnologyId,
    '-895px 0px',
    '-1757px 0px',
    strings.COMPUTER_TECHNOLOGY,
    strings.COMPUTER_TECHNOLOGY_DESCRIPTION,
  );

  const astrophysicsData = createTechnologyData(
    astrophysics,
    activeTechnologyId,
    '-992px 0px',
    '-1951px 0px',
    strings.ASTROPHYSICS,
    strings.ASTROPHYSICS_DESCRIPTION,
  );

  const intergalacticResearchNetworkData = createTechnologyData(
    intergalacticResearchNetwork,
    activeTechnologyId,
    '-1090px 0px',
    '-2146px 0px',
    strings.INTERGALACTIC_RESEARCH_NETWORK,
    strings.INTERGALACTIC_RESEARCH_NETWORK_DESCRIPTION,
  );

  const gravitonTechnologyData = createTechnologyData(
    gravitonTechnology,
    activeTechnologyId,
    '-1188px 0px',
    '-2340px 0px',
    strings.GRAVITON_TECHNOLOGY,
    strings.GRAVITON_TECHNOLOGY_DESCRIPTION,
  );

  const weaponsTechnologyData = createTechnologyData(
    weaponsTechnology,
    activeTechnologyId,
    '-1289px 0px',
    '-2537px 0px',
    strings.WEAPONS_TECHNOLOGY,
    strings.WEAPONS_TECHNOLOGY_DESCRIPTION,
  );

  const shieldingTechnologyData = createTechnologyData(
    shieldingTechnology,
    activeTechnologyId,
    '-1389px 0px',
    '-2732px 0px',
    strings.SHIELDING_TECHNOLOGY,
    strings.SHIELDING_TECHNOLOGY_DESCRIPTION,
  );

  const armorTechnologyData = createTechnologyData(
    armorTechnology,
    activeTechnologyId,
    '-1488px 0px',
    '-2928px 0px',
    strings.ARMOR_TECHNOLOGY,
    strings.ARMOR_TECHNOLOGY_DESCRIPTION,
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
