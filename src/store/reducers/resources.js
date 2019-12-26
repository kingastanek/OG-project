import types from "store/types/types";

const initialState = {
  areResourcesFetching: false,
  resources: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_RESOURCES_REQUEST: {
      return Object.assign({}, state, {
        areResourcesFetching: true
      });
    }
    case types.GET_USER_RESOURCES_SUCCESS: {
      const result = action.response.data;
      return Object.assign({}, state, {
        areResourcesFetching: false,
        resources: result
      });
    }
    case types.GET_USER_RESOURCES_FAILURE: {
      return Object.assign({}, state, {
        areResourcesFetching: false
      });
    }

    default:
      return state;
  }
};
