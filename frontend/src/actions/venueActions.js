import {
  GET_ALL_VENUES,
  REMOVE_ALL_VENUES,
  SET_CREATE_VENUE_LOADING,
  SET_VENUES_LOADING,
  GET_VENUE,
  SET_VENUE_LOADING,
  SORT_VENUE_BY_NAME,
  SET_EDIT_VENUE_LOADING,
  GET_VENUE_AVAILABILITY,
  SET_VENUE_AVAILABILITY_LOADING,
  UPDATE_VENUE_SCHEDULE,
  SET_UPDATE_VENUE_SCHDULE_LOADING,
  VERIFY_VENUE,
  SET_VERIFY_VENUE_LOADING,
  REVIEW_VENUE,
  SET_REVIEW_VENUE_LOADING,
  SAVE_VENUE_FROM_LIST,
  SAVE_VENUE_FROM_SINGLE,
  SET_BOOK_VENUE_LOADING,
  GET_MY_BOOKINGS,
  SET_MY_BOOKINGS_LOADING,
} from "./types";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../utils/notifications/showCustomNotification";
import { clearErrors, setErrors } from "./errorActions";
import axiosInstance from "../utils/axios/axiosInstance";

// Action for creating a new venue
export const createNewVenue = (venueData, navigate) => async (dispatch) => {
  dispatch(setCreateVenueLoading(true));

  try {
    const response = await axiosInstance.post("/venue/add", venueData, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(setCreateVenueLoading(false));
    showSuccessNotification({ title: "Success", message: "Venue created successfully" });
    navigate("/venues");
  } catch (err) {
    dispatch(setCreateVenueLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action for fetching all venues
export const getVenues = (pageNumber) => async (dispatch) => {
  dispatch(setVenuesLoading(true));
  try {
    const response = await axiosInstance.get("/venue/get", {
      params: {
        page: pageNumber,
      },
    });

    dispatch({
      type: GET_ALL_VENUES,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setVenuesLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action for fetching all venues without limit
export const getAllVenues = () => async (dispatch) => {
  dispatch(setVenuesLoading(true));
  try {
    const response = await axiosInstance.get("/venue/get", {
      params: {
        limit: 500,
        filter: "all",
      },
    });

    dispatch({
      type: GET_ALL_VENUES,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setVenuesLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action for getting filtered venues
export const getFilteredVenues = (filter) => async (dispatch) => {
  dispatch(setVenuesLoading(true));
  try {
    dispatch(removeAllVenues());
    const response = await axiosInstance.post("/venue/filtered", filter);

    dispatch({
      type: GET_ALL_VENUES,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setVenuesLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Verify a venue
export const verifyVenue = (venueId) => async (dispatch) => {
  dispatch(setVerifyVenueLoading(true));
  try {
    const response = await axiosInstance.post(`/venue/verify/${venueId}`);
    dispatch({
      type: VERIFY_VENUE,
      payload: response.data.data,
    });
    showSuccessNotification({ title: "Success", message: "Venue verified" });
  } catch (err) {
    dispatch(setErrors(err.response.data));
    dispatch(setVerifyVenueLoading(false));
  }
};

// Action for fetching a single venue
export const getVenue = (venueId) => async (dispatch) => {
  dispatch(setVenueLoading(true));
  try {
    const response = await axiosInstance.get(`/venue/get/${venueId}`);
    dispatch({
      type: GET_VENUE,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setVenueLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to get venue available schedules
export const getVenueAvailability = (venueId, date) => async (dispatch) => {
  dispatch(setVenueAvailabilityLoading(true));
  try {
    const response = await axiosInstance.get(`/venue/availability/${venueId}`, {
      params: {
        date,
      },
    });
    dispatch({
      type: GET_VENUE_AVAILABILITY,
      payload: { availableTime: response.data.data, bookingDate: date },
    });
  } catch (err) {
    dispatch(setVenueAvailabilityLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to update dthe venue schedule
export const updateVenueSchedule = (venueId, updateData, navigate) => async (dispatch) => {
  dispatch(setUpdateVenueScheduleLoading(true));
  try {
    const response = await axiosInstance.post(`/venue/schedule/update/${venueId}`, updateData);
    dispatch(setUpdateVenueScheduleLoading(false));
    showSuccessNotification({ title: "Success", message: "Venue schedule updated successfully" });
    navigate("/my-venues");
  } catch (err) {
    dispatch(setUpdateVenueScheduleLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to sort venues
export const sortVenues = (sortBy) => (dispatch) => {
  if (sortBy === "name") {
    dispatch({
      type: SORT_VENUE_BY_NAME,
    });
  }
};

// Action for removing all venue items
export const removeAllVenues = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALL_VENUES,
    payload: [],
  });
};

// Action to edit a venue
export const editVenue = (venueData, venueId, navigate) => async (dispatch) => {
  dispatch(setEditVenueLoading(true));
  try {
    const response = await axiosInstance.post(`/venue/update/${venueId}`, venueData, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(setEditVenueLoading(false));
    showSuccessNotification({ title: "Success", message: "Venue updated successfully" });
    navigate("/my-venues");
  } catch (err) {
    console.log(err.response);
    dispatch(setEditVenueLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to write a venue review
export const reviewVenue = (venueId, reviewInfo, setOpened) => async (dispatch) => {
  dispatch(setReviewVenueLoading(true));
  try {
    const response = await axiosInstance.post(`/venue/review/${venueId}`, reviewInfo);
    dispatch({
      type: REVIEW_VENUE,
      payload: response.data.data,
    });
    setOpened(false);
  } catch (err) {
    dispatch(setReviewVenueLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to save a venue
export const saveVenue = (venueId, from) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/venue/save/${venueId}`);

    if (from === "list") {
      dispatch({
        type: SAVE_VENUE_FROM_LIST,
        payload: response.data.data,
      });
    } else if (from === "single") {
      dispatch({
        type: SAVE_VENUE_FROM_SINGLE,
        payload: response.data.data,
      });
    }
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

// Action to get my venue bookings
export const getMyBookings = () => async (dispatch) => {
  dispatch(setMyBookingsLoading(true));
  try {
    const response = await axiosInstance.get("/venue/bookings/my");
    dispatch({
      type: GET_MY_BOOKINGS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setMyBookingsLoading(false));

    dispatch(setErrors(err.response.data));
  }
};

// Action to book a venue
export const completeVenueBooking = (bookingData, venueId) => async (dispatch) => {
  dispatch(setBookVenueLoading(true));
  try {
    return axiosInstance.post(`/venue/book/${venueId}`, bookingData);
  } catch (err) {
    dispatch(setBookVenueLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to indicate book success
export const completeVenueBookingSuccess = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch(setBookVenueLoading(false));

  showSuccessNotification({ title: "Success", message: "Payment successful" });
};

// Action to indicate book error
export const completeVenueBookingError = (err) => (dispatch) => {
  dispatch(setErrors(err.response.data));
  dispatch(setBookVenueLoading(false));
  showErrorNotification({ title: "Error", message: "Payment error" });
};

const setCreateVenueLoading = (data) => {
  return {
    type: SET_CREATE_VENUE_LOADING,
    payload: data,
  };
};

const setVenuesLoading = (data) => {
  return {
    type: SET_VENUES_LOADING,
    payload: data,
  };
};

const setVenueLoading = (data) => {
  return {
    type: SET_VENUE_LOADING,
    payload: data,
  };
};

const setEditVenueLoading = (data) => {
  return {
    type: SET_EDIT_VENUE_LOADING,
    payload: data,
  };
};
const setVenueAvailabilityLoading = (data) => {
  return {
    type: SET_VENUE_AVAILABILITY_LOADING,
    payload: data,
  };
};
const setUpdateVenueScheduleLoading = (data) => {
  return {
    type: SET_UPDATE_VENUE_SCHDULE_LOADING,
    payload: data,
  };
};
const setVerifyVenueLoading = (data) => {
  return {
    type: SET_VERIFY_VENUE_LOADING,
    payload: data,
  };
};

const setReviewVenueLoading = (data) => {
  return {
    type: SET_REVIEW_VENUE_LOADING,
    payload: data,
  };
};

const setBookVenueLoading = (data) => {
  return {
    type: SET_BOOK_VENUE_LOADING,
    payload: data,
  };
};
const setMyBookingsLoading = (data) => {
  return {
    type: SET_MY_BOOKINGS_LOADING,
    payload: data,
  };
};
