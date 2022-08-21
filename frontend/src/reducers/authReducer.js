import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_LOADING,
  REMOVE_CURRENT_USER_LOADING,
  SET_CURRENT_USER_INFO,
  SET_CURRENT_USER_INFO_LOADING,
  REMOVE_CURRENT_USER_INFO_LOADING,
  SET_CHANGE_PASSWORD_LOADING,
  SET_RESET_PASSWORD_LOADING,
  SET_CHECK_RESET_VALIDITY_LOADING,
  SET_RESET_NEW_PASSWORD_LOADING,
} from "../actions/types";
import isEmpty from "../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  userLoading: false,
  userInfo: {},
  userInfoLoading: false,
  changePasswordLoading: false,
  resetPasswordLoading: false,
  checkResetValidityLoading: false,
  resetNewPasswordLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: isEmpty(action.payload) ? {} : action.payload,
        isAuthenticated: !isEmpty(action.payload),
        userLoading: false,
      };
    case SET_CURRENT_USER_LOADING:
      return {
        ...state,
        userLoading: true,
      };
    case REMOVE_CURRENT_USER_LOADING:
      return {
        ...state,
        userLoading: false,
      };
    case SET_CURRENT_USER_INFO:
      return {
        ...state,
        userInfo: action.payload.user,
        userInfoLoading: false,
      };
    case SET_CURRENT_USER_INFO_LOADING:
      return {
        ...state,
        userInfoLoading: true,
      };
    case REMOVE_CURRENT_USER_INFO_LOADING:
      return {
        ...state,
        userInfoLoading: false,
      };
    case SET_CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        changePasswordLoading: action.payload,
      };
    case SET_RESET_PASSWORD_LOADING:
      return {
        ...state,
        resetPasswordLoading: action.payload,
      };
    case SET_CHECK_RESET_VALIDITY_LOADING:
      return {
        ...state,
        checkResetValidityLoading: action.payload,
      };
    case SET_RESET_NEW_PASSWORD_LOADING:
      return {
        ...state,
        resetNewPasswordLoading: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
