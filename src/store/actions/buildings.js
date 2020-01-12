import { CALL_API } from 'store/middleware/api';
import types from 'store/types/types';

export const getBuildings = userId => {
  return {
    [CALL_API]: {
      endpoint: `/building-api/${userId}/`,
      method: 'GET',
      types: [
        types.GET_USER_BUILDINGS_REQUEST,
        types.GET_USER_BUILDINGS_SUCCESS,
        types.GET_USER_RESOURCES_FAILURE
      ],
    }
  };
};

export const buildingLevelUp = (userId, buildingName) => {
  return {
    [CALL_API]: {
      endpoint: `/building-api/${userId}/${buildingName}`,
      method: 'PUT',
      types: [
        types.BUILDING_LEVEL_UP_REQUEST,
        types.BUILDING_LEVEL_UP_SUCCESS,
        types.BUILDING_LEVEL_UP_FAILURE
      ],
      data: {
        userId,
        buildingName,
      }
    }
  };
};