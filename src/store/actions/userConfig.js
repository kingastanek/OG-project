import { CALL_API } from 'store/middleware/api';
import types from "store/types/types";

export const loginUser = (email, password) => {
  return {
    [CALL_API]: {
      endpoint: `/user-api/${email}/${password}`,
      method: 'GET',
      types: [
        types.LOGIN_USER_REQUEST,
        types.LOGIN_USER_SUCCESS,
        types.LOGIN_USER_FAILURE,
      ],
    },
  };
}