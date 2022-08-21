import axiosInstance from "../utils/axios/axiosInstance";
import { setErrors } from "./errorActions";

import { GET_SAVED, SET_SAVED_LOADING } from "./types";

// Action for getting my saved
export const getSaved = () => async (dispatch) => {
  dispatch(setSavedLoading(true));
  try {
    const response = await axiosInstance.get("/profile/saved");
    dispatch({
      type: GET_SAVED,
      payload: response.data.data.saved,
    });
  } catch (err) {
    dispatch(setSavedLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

export const setSavedLoading = (data) => {
  return {
    type: SET_SAVED_LOADING,
    payload: data,
  };
};
