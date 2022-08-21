import { SET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  errorType: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...action.payload,
      };
    case CLEAR_ERRORS:
      return {
        errorType: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
