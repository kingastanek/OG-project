import { CALL_API } from 'store/middleware/api';

export const GET_USER_RESOURCES_REQUEST = "GET_USER_RESOURCES_REQUEST";
export const GET_USER_RESOURCES_SUCCESS = "GET_USER_RESOURCES_SUCCESS";
export const GET_USER_RESOURCES_FAILURE = "GET_USER_RESOURCES_FAILURE";

export const getUserResources = (userId) => {
  return {
    [CALL_API]: {
      endpoint: `api-user/${userId}/resources`,
      method: 'GET',
      types: [
        GET_USER_RESOURCES_REQUEST,
        GET_USER_RESOURCES_SUCCESS,
        GET_USER_RESOURCES_FAILURE,
      ],
    },
  };
}