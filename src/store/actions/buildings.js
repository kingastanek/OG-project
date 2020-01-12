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