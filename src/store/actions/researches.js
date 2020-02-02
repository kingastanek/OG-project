import { CALL_API } from 'store/middleware/api';
import types from 'store/types/types';

export const getResearches = userId => {
  return {
    [CALL_API]: {
      endpoint: `/research-api/${userId}/`,
      method: 'GET',
      types: [
        types.GET_USER_RESEARCHES_REQUEST,
        types.GET_USER_RESEARCHES_SUCCESS,
        types.GET_USER_RESEARCHES_FAILURE
      ],
    }
  };
};

export const researchLevelUp = (userId, researchName) => {
  return {
    [CALL_API]: {
      endpoint: `/research-api/${userId}/${researchName}`,
      method: 'PUT',
      types: [
        types.RESEARCH_LEVEL_UP_REQUEST,
        types.RESEARCH_LEVEL_UP_SUCCESS,
        types.RESEARCH_LEVEL_UP_FAILURE
      ],
      data: {
        userId,
        researchName,
      }
    }
  };
};