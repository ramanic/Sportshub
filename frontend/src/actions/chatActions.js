import {
  GET_ALL_CONVERSATIONS,
  SET_ALL_CONVERSATIONS_LOADING,
  GET_CONVERSATION_MESSAGES,
  SET_CONVERSATION_MESSAGES_LOADING,
  SET_SEND_MESSAGE_LOADING,
  SEND_MESSAGE,
  SET_ARRIVED_MESSAGE,
  GET_FOLLOWED_USERS,
  SET_FOLLOWED_USERS_LOADING,
  GET_CREATE_CONVERSATION,
  SET_GET_CREATE_CONVERSATION_LOADING,
} from "./types";
import { showSuccessNotification } from "../utils/notifications/showCustomNotification";
import { setErrors } from "./errorActions";
import axiosInstance from "../utils/axios/axiosInstance";

// Get all conversations of the current user
export const getAllConversations = () => async (dispatch) => {
  dispatch(setConversationsLoading(true));
  try {
    const response = await axiosInstance.get("/conversation");

    dispatch({
      type: GET_ALL_CONVERSATIONS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setConversationsLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Get a conversation or create it
export const getCreateConversation = (info, setOpened) => async (dispatch) => {
  dispatch(setGetCreateConversationLoading(true));
  try {
    const response = await axiosInstance.post("/conversation", info);
    dispatch({
      type: GET_CREATE_CONVERSATION,
      payload: response.data.data,
    });
    setOpened(false);
  } catch (err) {
    dispatch(setGetCreateConversationLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Get all messages of the selected conversation
export const getConversationMessages = (conversationId) => async (dispatch) => {
  dispatch(setConversationMessagesLoading(true));

  try {
    const response = await axiosInstance.get(`/message/${conversationId}`);

    dispatch({
      type: GET_CONVERSATION_MESSAGES,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setConversationMessagesLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to send a new message
export const sendMessage = (message) => async (dispatch) => {
  dispatch(setSendMessageLoading(true));
  try {
    const response = await axiosInstance.post("/message", message);

    dispatch({
      type: SEND_MESSAGE,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setSendMessageLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to get users you have followed
export const getFollowedUsers = () => async (dispatch) => {
  dispatch(setFollowedUsersLoading(true));
  try {
    const response = await axiosInstance.get("/profile/friends");
    dispatch({
      type: GET_FOLLOWED_USERS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setFollowedUsersLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to set the newly arrived message
export const setArrivedMessage = (message) => (dispatch) => {
  dispatch({
    type: SET_ARRIVED_MESSAGE,
    payload: message,
  });
};

const setConversationsLoading = (data) => {
  return {
    type: SET_ALL_CONVERSATIONS_LOADING,
    payload: data,
  };
};

const setConversationMessagesLoading = (data) => {
  return {
    type: SET_CONVERSATION_MESSAGES_LOADING,
    payload: data,
  };
};

const setSendMessageLoading = (data) => {
  return {
    type: SET_SEND_MESSAGE_LOADING,
    payload: data,
  };
};

const setFollowedUsersLoading = (data) => {
  return {
    type: SET_FOLLOWED_USERS_LOADING,
    payload: data,
  };
};
const setGetCreateConversationLoading = (data) => {
  return {
    type: SET_GET_CREATE_CONVERSATION_LOADING,
    payload: data,
  };
};
