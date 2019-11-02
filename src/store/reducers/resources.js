import {
  GET_USER_RESOURCES_REQUEST,
  GET_USER_RESOURCES_SUCCESS,
  GET_USER_RESOURCES_FAILURE,
} from "store/actions/resources";

const initialState = {
  areResourcesFetching: false,
  resources: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_RESOURCES_REQUEST: {
      return Object.assign({}, state, {
        areResourcesFetching: true
      });
    }
    case GET_USER_RESOURCES_SUCCESS: {
      const result = action;
      return Object.assign({}, state, {
        areResourcesFetching: false,
        resources: result
      });
    }
    case GET_USER_RESOURCES_FAILURE: {
      return Object.assign({}, state, {
        areResourcesFetching: false
      });
    }

    default:
      return state;
  }
};
