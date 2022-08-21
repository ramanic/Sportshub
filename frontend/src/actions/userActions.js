import axiosInstance from "../utils/axios/axiosInstance";
import { setErrors } from "./errorActions";
import { showSuccessNotification } from "../utils/notifications/showCustomNotification";
import {
  GET_ALL_USERS,
  SET_ALL_USERS_LOADING,
  CHANGE_USER_ROLE,
  SET_CHANGE_USER_ROLE_LOADING,
  GET_RECOMMENDED_PRODUCTS,
  SET_RECOMMENDED_PRODUCTS_LOADING,
  GET_RECOMMENDED_USERS,
  SET_RECOMMENDED_USERS_LOADING,
  GET_RECOMMENDED_VENUES,
  SET_RECOMMENDED_VENUES_LOADING,
} from "./types";

// Action to get the list of all the users
export const getAllUsers = () => async (dispatch) => {
  dispatch(setAllUsersLoading(true));
  try {
    const response = await axiosInstance.get("/user/all");
    dispatch({
      type: GET_ALL_USERS,
      payload: response.data.data.users,
    });
  } catch (err) {
    dispatch(setAllUsersLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to change the role of the user
export const changeUserRole = (userId, newRole, setOpened) => async (dispatch) => {
  dispatch(setChangeUserRoleLoading(true));
  const response = await axiosInstance.post(`/user/change-role/${userId}`, { newRole });

  setOpened(false);
  showSuccessNotification({ title: "Success", message: "User role changed" });
  dispatch({
    type: CHANGE_USER_ROLE,
    payload: response.data.data,
  });
  try {
  } catch (err) {
    dispatch(setChangeUserRoleLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to get recommended shop products
export const getRecommendedProducts = () => async (dispatch) => {
  dispatch(setRecommendedProductsLoading(true));
  try {
    const response = await axiosInstance.get("/product/recomended");
    dispatch({
      type: GET_RECOMMENDED_PRODUCTS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setRecommendedProductsLoading(false));

    dispatch(setErrors(err.response.data));
  }
};

// Action to get recommended users
export const getRecommendedUsers = () => async (dispatch) => {
  dispatch(setRecommendedUsersLoading(true));
  try {
    const response = await axiosInstance.get("/user/recomended");
    dispatch({
      type: GET_RECOMMENDED_USERS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setRecommendedUsersLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to get recommended venues
export const getRecommendedVenues = () => async (dispatch) => {
  dispatch(setRecommendedVenuesLoading(true));
  try {
    const response = await axiosInstance.get("/venue/recomended");
    console.log(response);
    dispatch({
      type: GET_RECOMMENDED_VENUES,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setRecommendedVenuesLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

export const setAllUsersLoading = (data) => {
  return {
    type: SET_ALL_USERS_LOADING,
    payload: data,
  };
};
export const setChangeUserRoleLoading = (data) => {
  return {
    type: SET_CHANGE_USER_ROLE_LOADING,
    payload: data,
  };
};
export const setRecommendedProductsLoading = (data) => {
  return {
    type: SET_RECOMMENDED_PRODUCTS_LOADING,
    payload: data,
  };
};
export const setRecommendedUsersLoading = (data) => {
  return {
    type: SET_RECOMMENDED_USERS_LOADING,
    payload: data,
  };
};
export const setRecommendedVenuesLoading = (data) => {
  return {
    type: SET_RECOMMENDED_VENUES_LOADING,
    payload: data,
  };
};
