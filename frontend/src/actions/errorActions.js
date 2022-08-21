import { SET_ERRORS, CLEAR_ERRORS } from "./types";
import { showErrorNotification } from "../utils/notifications/showCustomNotification";

// Function to set the errors
export const setErrors =
  (payload, errorType = null) =>
  (dispatch) => {
    dispatch({
      type: SET_ERRORS,
      payload,
    });
    showErrorNotification({ title: "Error", message: payload.message });
  };

// Function to clear the errors
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
