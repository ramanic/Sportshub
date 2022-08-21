import { GET_SAVED, SET_SAVED_LOADING } from "../actions/types";

const initialState = {
  mySaved: {},
  mySavedLoading: false,
};

const savedReducer = (state = initialState, action) => {
  switch (action.type) {
    // ## Get my saved
    case GET_SAVED:
      return {
        ...state,
        mySavedLoading: false,
        mySaved: action.payload,
      };
    // ## Set loading while getting my saved
    case SET_SAVED_LOADING:
      return {
        ...state,
        mySavedLoading: action.payload,
      };
    default:
      return state;
  }
};

export default savedReducer;
