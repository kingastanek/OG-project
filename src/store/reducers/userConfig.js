import types from "store/types/types";

const initialState = {
  isLoginFetching: false,
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST: {
      return Object.assign({}, state, {
        isLoginFetching: true,
        isAuthenticated: false,
      });
    }
    case types.LOGIN_USER_SUCCESS: {
      const user = action.response.data;
      return Object.assign({}, state, {
        isLoginFetching: false,
        isAuthenticated: true,
        user
      });
    }
    case types.LOGIN_USER_FAILURE: {
      return Object.assign({}, state, {
        isLoginFetching: false,
        isAuthenticated: false,
      });
    }

    default:
      return state;
  }
};
