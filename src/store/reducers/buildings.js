import types from "store/types/types"

const initialState = {
  areBuildingsFetching: false,
  buildingLevelUpSent:  false,
  metal: {},
  deuterium: {},
  cristal: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_BUILDINGS_REQUEST: {
      return Object.assign({}, state, {
        areBuildingsFetching: true,
      });
    }
    case types.GET_USER_BUILDINGS_SUCCESS: {
      const buildings = action.response.data;
      const metal = buildings.filter(building => {
        const metalMine = building.name === "METAL_MINE";
        return metalMine;
      });
      const cristal = buildings.filter(building => {
        const cristalMine = building.name === "CRISTAL_MINE";
        return cristalMine;
      });
      const deuterium = buildings.filter(building => {
        const deuteriumMine = building.name === "DEUTERIUM_MINE";
        return deuteriumMine;
      });
      return Object.assign({}, state, {
        areBuildingsFetching: false,
        metal: metal[0],
        cristal: cristal[0],
        deuterium: deuterium[0]
      })
    }
    case types.GET_USER_BUILDINGS_FAILURE: {
      return Object.assign({}, state, {
        areBuildingsFetching: true,
      })
    }

    case types.BUILDING_LEVEL_UP_REQUEST: {
      return Object.assign({}, state, {
        buildingLevelUpSent: false,
      })
    }
    case types.BUILDING_LEVEL_UP_SUCCESS: {
      return Object.assign({}, state, {
        buildingLevelUpSent: true,
      })
    }
    case types.BUILDING_LEVEL_UP_FAILURE: {
      return Object.assign({}, state, {
        buildingLevelUpSent: true,
      })
    }
    default:
      return state;
  }
};