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

export const registerUser = (newUser) => {
  const { email, password, username } = newUser;
  return {
    [CALL_API]: {
      endpoint: `/user-api`,
      method: 'POST',
      types: [
        types.REGISTER_USER_REQUEST,
        types.REGISTER_USER_SUCCESS,
        types.REGISTER_USER_FAILURE,
      ],
      data: {
        username,
        email,
        password
      }
    },
  };
}