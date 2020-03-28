import types from "store/types/types"

const initialState = {
  areResearchesFetching: false,
  researchLevelUpSent:  false,
  energyTechnology: {},
  laserTechnology: {},
  ionTechnology: {},
  hyperspaceTechnology: {},
  plasmaTechnology: {},
  combustionDrive: {},
  impulseDrive: {},
  hyperspaceDrive: {},
  espionageTechnology: {},
  computerTechnology: {},
  astrophysics: {},
  intergalacticResearchNetwork: {},
  gravitonTechnology: {},
  weaponsTechnology: {},
  shieldingTechnology: {},
  armorTechnology: {},
  researches: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_RESEARCHES_REQUEST: {
      return Object.assign({}, state, {
        areResearchesFetching: true,
      });
    }
    case types.GET_USER_RESEARCHES_SUCCESS: {
      const { data } = action.response;
      const [
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
      ] = data;
      return Object.assign({}, state, {
        areResearchesFetching: false,
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
        researches: [ ...data ],
      })
    }
    case types.GET_USER_RESEARCHES_FAILURE: {
      return Object.assign({}, state, {
        areResearchesFetching: true,
      })
    }

    case types.RESEARCH_LEVEL_UP_REQUEST: {
      return Object.assign({}, state, {
        researchLevelUpSent: false,
      })
    }
    case types.RESEARCH_LEVEL_UP_SUCCESS: {
      return Object.assign({}, state, {
        researchLevelUpSent: true,
      })
    }
    case types.RESEARCH_LEVEL_UP_FAILURE: {
      return Object.assign({}, state, {
        researchLevelUpSent: true,
      })
    }
    default:
      return state;
  }
};