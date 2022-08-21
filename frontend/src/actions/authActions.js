import jwt_decode from "jwt-decode";
import { showSuccessNotification } from "../utils/notifications/showCustomNotification";

import axiosInstance from "../utils/axios/axiosInstance";
import setAuthToken from "../utils/auth/setAuthToken";
import { setErrors } from "./errorActions";
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
} from "./types";

// Action for registering a user
export const registerUser = (userData, navigate) => async (dispatch) => {
  dispatch(setCurrentUserLoading());
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    authenticateUser(response, dispatch, navigate, "/register/complete-profile");
  } catch (err) {
    dispatch(removeCurrentUserLoading());
    console.log(err.response);
    dispatch(setErrors(err.response.data));
  }
};

// Action for logging in user
export const loginUser = (userData, navigate, from) => async (dispatch) => {
  dispatch(setCurrentUserLoading());
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    authenticateUser(response, dispatch, navigate, from);
  } catch (err) {
    dispatch(removeCurrentUserLoading());
    dispatch(setErrors(err.response.data));
  }
};

// Action for successful google login
export const googleLoginSuccess = (data, navigate) => async (dispatch) => {
  setAuthToken(data.token);
  dispatch(setCurrentUserInfoLoading());
  try {
    const response = await axiosInstance.get("/profile/me");
    response.data.data.token = data.token;
    authenticateUserGoogle(response, dispatch, navigate, "/home");
  } catch (err) {
    dispatch(removeCurrentUserInfoLoading());
    dispatch(setErrors(err.response.data));
  }
};

// Action for google login failure
export const googleLoginError = (navigate) => (dispatch) => {
  dispatch(setErrors({ message: "Login error. Please try again." }));
  navigate("/login", { replace: true });
};

// Action to log user out
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwt");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  showSuccessNotification({ title: "Success", message: "Logged out successfully" });
};

// Dispatch function to set user data in store
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setCurrentUserLoading = () => {
  return {
    type: SET_CURRENT_USER_LOADING,
  };
};
export const removeCurrentUserLoading = () => {
  return {
    type: REMOVE_CURRENT_USER_LOADING,
  };
};

// Function for populating user info on app reload
export const populateUserInfo = () => async (dispatch) => {
  dispatch(setCurrentUserInfoLoading());
  try {
    const response = await axiosInstance.get("/profile/me");
    dispatch({
      type: SET_CURRENT_USER_INFO,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(removeCurrentUserInfoLoading());
    dispatch(setErrors(err.response.data));
  }
};

// Action to change the user password
export const changePassword = (newPassword, setPassModalOpened) => async (dispatch) => {
  dispatch(setChangePasswordLoading(true));
  try {
    const response = await axiosInstance.post("/profile/changePassword", newPassword);
    dispatch(setChangePasswordLoading(false));
    setPassModalOpened(false);
    showSuccessNotification({ title: "Success", message: "Password changed" });
  } catch (err) {
    dispatch(setChangePasswordLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to get reset password link
export const resetPassword = (email) => async (dispatch) => {
  dispatch(setResetPasswordLoading(true));
  try {
    const response = await axiosInstance.post("/profile/resetPassword", email);
    showSuccessNotification({ title: "Success", message: "Reset link sent to your mail" });
    dispatch(setResetPasswordLoading(false));
  } catch (err) {
    dispatch(setResetPasswordLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to check reset link validity
export const checkResetValidity = (resetString, navigate) => async (dispatch) => {
  dispatch(setCheckResetValidityLoading(true));
  try {
    const response = await axiosInstance.post(`/profile/checkResetString/${resetString}`);
    dispatch(setCheckResetValidityLoading(false));
  } catch (err) {
    console.log(err);
    navigate("/login", { replace: true });
    dispatch(setCheckResetValidityLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to reset to new password
export const resetNewPassword = (resetString, formData, navigate) => async (dispatch) => {
  dispatch(setResetNewPasswordLoading(true));
  try {
    const response = await axiosInstance.post(`/profile/resetNewPassword/${resetString}`, formData);
    dispatch(setResetNewPasswordLoading(true));
    showSuccessNotification({ title: "Success", message: "Password reset successfully" });
    navigate("/login", { replace: true });
  } catch (err) {
    dispatch(setResetNewPasswordLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

export const setCheckResetValidityLoading = (data) => {
  return {
    type: SET_CHECK_RESET_VALIDITY_LOADING,
    payload: data,
  };
};
export const setChangePasswordLoading = (data) => {
  return {
    type: SET_CHANGE_PASSWORD_LOADING,
    payload: data,
  };
};
export const setResetPasswordLoading = (data) => {
  return {
    type: SET_RESET_PASSWORD_LOADING,
    payload: data,
  };
};
export const setResetNewPasswordLoading = (data) => {
  return {
    type: SET_RESET_NEW_PASSWORD_LOADING,
    payload: data,
  };
};

export const setCurrentUserInfoLoading = () => {
  return {
    type: SET_CURRENT_USER_INFO_LOADING,
  };
};
const removeCurrentUserInfoLoading = () => {
  return {
    type: REMOVE_CURRENT_USER_INFO_LOADING,
  };
};

// Function to set logged in users state
const authenticateUser = (response, dispatch, navigate, navigateTo) => {
  // Save token in localstorage
  const token = response.data.data.token;

  localStorage.setItem("jwt", token);

  // Set the token in axios header
  setAuthToken(token);

  // Set the decoded data in redux store
  const decoded = jwt_decode(token);
  dispatch(setCurrentUser(decoded));
  let newData = {
    user: response.data.data,
  };
  dispatch({
    type: SET_CURRENT_USER_INFO,
    payload: newData,
  });
  showSuccessNotification({ title: "Success", message: "Login successful" });
  navigate(navigateTo, { replace: true });
};

// Function to set logged in users state
const authenticateUserGoogle = (response, dispatch, navigate, navigateTo) => {
  // Save token in localstorage
  const token = response.data.data.token;

  localStorage.setItem("jwt", token);

  // Set the token in axios header
  setAuthToken(token);

  // Set the decoded data in redux store
  const decoded = jwt_decode(token);
  dispatch(setCurrentUser(decoded));
  let newData = {
    user: response.data.data.user,
  };
  dispatch({
    type: SET_CURRENT_USER_INFO,
    payload: newData,
  });
  showSuccessNotification({ title: "Success", message: "Login successful" });
  navigate(navigateTo, { replace: true });
};
