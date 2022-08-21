import axiosInstance from "../utils/axios/axiosInstance";
import { setErrors } from "./errorActions";
import { showSuccessNotification } from "../utils/notifications/showCustomNotification";

import {
  GET_FRIENDS,
  SET_FRIENDS_LOADING,
  GET_FRIEND_REQUESTS,
  SET_FRIEND_REQUESTS_LOADING,
  GET_SENT_REQUESTS,
  SET_SENT_REQUESTS_LOADING,
  ACCEPT_FRIEND_REQUEST,
  SET_ACCEPT_FRIEND_REQUEST_LOADING,
  REMOVE_FRIEND,
  SET_REMOVE_FRIEND_LOADING,
  SEND_FRIEND_REQUEST,
  SET_SEND_FRIEND_REQUEST_LOADING,
} from "./types";

// Action for getting your friends
export const getFriends = () => async (dispatch) => {
  dispatch(setFriendsLoading(true));
  try {
    const response = await axiosInstance.get("/profile/friends");
    dispatch({
      type: GET_FRIENDS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setFriendsLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action for getting friend requests
export const getFriendRequests = () => async (dispatch) => {
  dispatch(setFriendRequestsLoading(true));
  try {
    const response = await axiosInstance.get("/profile/friends", {
      params: {
        filter: "received",
      },
    });
    dispatch({
      type: GET_FRIEND_REQUESTS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setFriendRequestsLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action for getting friend requests
export const getSentRequests = () => async (dispatch) => {
  dispatch(setSentRequestsLoading(true));
  try {
    const response = await axiosInstance.get("/profile/friends", {
      params: {
        filter: "sent",
      },
    });
    dispatch({
      type: GET_SENT_REQUESTS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setSentRequestsLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to accept friend request
export const acceptFriendRequest = (id) => async (dispatch) => {
  dispatch(setAcceptFriendRequestLoading(true));
  try {
    const response = await axiosInstance.post("/profile/accept-friend", { id });
    dispatch({
      type: ACCEPT_FRIEND_REQUEST,
      payload: id,
    });
    showSuccessNotification({ title: "Success", message: "Friend request accepted" });
  } catch (err) {
    dispatch(setAcceptFriendRequestLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to send friend request
export const sendFriendRequest = (id, currentUser) => async (dispatch) => {
  dispatch(setSendFriendRequestLoading(true));
  try {
    const response = await axiosInstance.post("/profile/add-friend", { id });
    console.log(response);
    dispatch({
      type: SEND_FRIEND_REQUEST,
      payload: currentUser,
    });
    showSuccessNotification({ title: "Success", message: "Friend request sent" });
  } catch (err) {
    dispatch(setSendFriendRequestLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to remove a friend
export const removeFriend = (id) => async (dispatch) => {
  dispatch(setRemoveFriendLoading(true));
  try {
    const response = await axiosInstance.post("/profile/remove-friend", { id });
    dispatch({
      type: REMOVE_FRIEND,
      payload: id,
    });
    showSuccessNotification({ title: "Success", message: "Friend removed" });
  } catch (err) {
    dispatch(setRemoveFriendLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

const setFriendsLoading = (data) => {
  return {
    type: SET_FRIENDS_LOADING,
    payload: data,
  };
};

const setFriendRequestsLoading = (data) => {
  return {
    type: SET_FRIEND_REQUESTS_LOADING,
    payload: data,
  };
};
const setSentRequestsLoading = (data) => {
  return {
    type: SET_SENT_REQUESTS_LOADING,
    payload: data,
  };
};
const setAcceptFriendRequestLoading = (data) => {
  return {
    type: SET_ACCEPT_FRIEND_REQUEST_LOADING,
    payload: data,
  };
};
const setRemoveFriendLoading = (data) => {
  return {
    type: SET_REMOVE_FRIEND_LOADING,
    payload: data,
  };
};
const setSendFriendRequestLoading = (data) => {
  return {
    type: SET_SEND_FRIEND_REQUEST_LOADING,
    payload: data,
  };
};
