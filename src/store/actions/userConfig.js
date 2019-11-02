import { CALL_API } from 'store/middleware/api';

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const loginUser = (email, password) => {
  return {
    [CALL_API]: {
      endpoint: `/api-user/${email}/${password}`,
      method: 'GET',
      types: [
        LOGIN_USER_REQUEST,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_FAILURE,
      ],
    },
  };
}