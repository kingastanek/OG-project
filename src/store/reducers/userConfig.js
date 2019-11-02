import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "store/actions/userConfig";

const initialState = {
  isLoginFetching: false,
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST: {
      return Object.assign({}, state, {
        isLoginFetching: true,
        isAuthenticated: false,
      });
    }
    case LOGIN_USER_SUCCESS: {
      const user = action.response.data;
      return Object.assign({}, state, {
        isLoginFetching: false,
        isAuthenticated: true,
        user
      });
    }
    case LOGIN_USER_FAILURE: {
      return Object.assign({}, state, {
        isLoginFetching: false,
        isAuthenticated: false,
      });
    }

    default:
      return state;
  }
};
