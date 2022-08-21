import axiosInstance from "../utils/axios/axiosInstance";
import { setErrors } from "./errorActions";
import {
  COMPLETE_MY_PROFILE,
  SET_COMPLETE_MY_PROFILE_LOADING,
  GET_USER_PROFILE,
  SET_USER_PROFILE_LOADING,
  GET_MY_PROFILE,
  SET_MY_PROFILE_LOADING,
} from "./types";

// Action for completing my profile
export const completeProfile = (userData, navigate, navigateTo) => async (dispatch) => {
  dispatch(setCompleteMyProfileLoading(true));
  try {
    const response = await axiosInstance.post("/profile/update", userData, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(response);
    dispatch({
      type: GET_MY_PROFILE,
      payload: response.data.data,
    });
    dispatch(setCompleteMyProfileLoading(false));
    if (navigateTo === "/profile") {
      navigate(0);
    } else {
      navigate(navigateTo);
    }
  } catch (err) {
    console.log(err);
    dispatch(setCompleteMyProfileLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action for fetching my profile
export const getMyProfile = () => async (dispatch) => {
  dispatch(setMyProfileLoading(true));
  try {
    const response = await axiosInstance.get("/profile/me");
    dispatch({
      type: GET_MY_PROFILE,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setMyProfileLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action for getting user profile
export const getUserProfile = (username) => async (dispatch) => {
  dispatch(setUserProfileLoading(true));
  try {
    const response = await axiosInstance.get(`/profile/user/${username}`);

    dispatch({
      type: GET_USER_PROFILE,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch(setUserProfileLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

export const setUserProfileLoading = (data) => {
  return {
    type: SET_USER_PROFILE_LOADING,
    payload: data,
  };
};

export const setMyProfileLoading = (data) => {
  return {
    type: SET_MY_PROFILE_LOADING,
    payload: data,
  };
};

export const setCompleteMyProfileLoading = (data) => {
  return {
    type: SET_COMPLETE_MY_PROFILE_LOADING,
    payload: data,
  };
};
