import { CALL_API } from 'store/middleware/api';
import types from "store/types/types";


export const getUserResources = (userId) => {
  return {
    [CALL_API]: {
      endpoint: `/resource-api/${userId}`,
      method: 'GET',
      types: [
        types.GET_USER_RESOURCES_REQUEST,
        types.GET_USER_RESOURCES_SUCCESS,
        types.GET_USER_RESOURCES_FAILURE,
      ],
    },
  };
}