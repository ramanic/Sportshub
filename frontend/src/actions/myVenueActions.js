import {
  GET_MY_VENUES,
  SET_MY_VENUES_LOADING,
  GET_VENUE_HISTORY,
  SET_VENUE_HISTORY_LOADING,
  GET_MY_VENUE_AGGREGATES,
  SET_MY_VENUE_AGGREGATES_LOADING,
} from "./types";
import { showSuccessNotification } from "../utils/notifications/showCustomNotification";
import { setErrors } from "./errorActions";
import axiosInstance from "../utils/axios/axiosInstance";

// Action to get all my venues
export const getMyVenues = () => async (dispatch) => {
  dispatch(setMyVenuesLoading(true));
  try {
    const response = await axiosInstance.get("/venue/my-venues/get");
    dispatch({
      type: GET_MY_VENUES,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setMyVenuesLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to get venue booking history
export const getVenueHistory = (venueId) => async (dispatch) => {
  dispatch(setVenueHistoryLoading(true));

  try {
    const response = await axiosInstance.get(`/venue/my-venues/${venueId}/history`);
    console.log(response.data.data);
    dispatch({
      type: GET_VENUE_HISTORY,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setVenueHistoryLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to get my venue aggregates
export const getMyVenueAggregates = () => async (dispatch) => {
  dispatch(setMyVenueAggregatesLoading(true));
  try {
    const response = await axiosInstance.get("/venue/my-venues/aggregate");
    dispatch({
      type: GET_MY_VENUE_AGGREGATES,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setMyVenueAggregatesLoading(true));
    dispatch(setErrors(err.response.data));
  }
};

const setMyVenuesLoading = (data) => {
  return {
    type: SET_MY_VENUES_LOADING,
    payload: data,
  };
};
const setVenueHistoryLoading = (data) => {
  return {
    type: SET_MY_VENUES_LOADING,
    payload: data,
  };
};
const setMyVenueAggregatesLoading = (data) => {
  return {
    type: SET_MY_VENUE_AGGREGATES_LOADING,
    payload: data,
  };
};
