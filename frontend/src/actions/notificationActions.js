import {
  GET_NOTIFICATIONS,
  SET_NOTIFICATIONS_LOADING,
  READ_ALL_NOTIFICATIONS,
  READ_A_NOTIFICATION,
} from "./types";
import { showSuccessNotification } from "../utils/notifications/showCustomNotification";
import { setErrors } from "./errorActions";
import axiosInstance from "../utils/axios/axiosInstance";

// Action to get all notifications
export const getAllNotifications = () => async (dispatch) => {
  dispatch(setNotificationsLoading(true));
  try {
    const response = await axiosInstance.get("/profile/notifications");
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setNotificationsLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to read a notification
export const readAllNotifications = () => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/profile/notifications/readAll");
    dispatch({
      type: READ_ALL_NOTIFICATIONS,
    });
    showSuccessNotification({ title: "Success", message: "All notifications read" });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

// Action to read a single notification
export const readANotification = (id) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/profile/notifications/read/${id}`);
    dispatch({
      type: READ_A_NOTIFICATION,
      payload: id,
    });
    showSuccessNotification({ title: "Success", message: "Marked as read" });
  } catch (err) {
    console.log(err);
    dispatch(setErrors(err.response.data));
  }
};

// Action to set loading while fetching notifications
const setNotificationsLoading = (data) => {
  return {
    type: SET_NOTIFICATIONS_LOADING,
    payload: data,
  };
};
