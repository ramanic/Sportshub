import {
  GET_ALL_POSTS,
  SET_ALL_POSTS_LOADING,
  GET_LOCAL_POSTS,
  SET_LOCAL_POSTS_LOADING,
  GET_A_POST,
  SET_A_POST_LOADING,
  CREATE_A_POST,
  SET_CREATE_A_POST_LOADING,
  LIKE_A_POST_FROM_LIST,
  LIKE_A_POST_FROM_SINGLE,
  ADD_COMMENT,
  SET_ADD_COMMENT_LOADING,
  LIKE_A_POST_FROM_USER_PROFILE,
  LIKE_A_POST_FROM_MY_PROFILE,
  REMOVE_ALL_POSTS,
  SAVE_A_POST_FROM_LIST,
  SAVE_A_POST_FROM_SINGLE,
  SAVE_A_POST_FROM_MY_PROFILE,
  SAVE_A_POST_FROM_USER_PROFILE,
  DELETE_POST,
  SET_DELETE_POST_LOADING,
  LIKE_A_POST_FROM_LOCAL_LIST,
  SAVE_A_POST_FROM_LOCAL_LIST,
} from "../actions/types";
import { showSuccessNotification } from "../utils/notifications/showCustomNotification";
import { setErrors } from "./errorActions";
import axiosInstance from "../utils/axios/axiosInstance";

// Action to get all posts
export const getAllPosts = (pageNumber) => async (dispatch) => {
  dispatch(setAllPostsLoading(true));
  try {
    const response = await axiosInstance.get("/post/all", {
      params: {
        page: pageNumber,
      },
    });
    console.log(response.data.data);

    dispatch({
      type: GET_ALL_POSTS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch(setAllPostsLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to get local posts
export const getLocalPosts = () => async (dispatch) => {
  dispatch(setLocalPostsLoading(true));
  try {
    const response = await axiosInstance.get("/post/friends");
    dispatch({
      type: GET_LOCAL_POSTS,
      payload: response.data.data.posts,
    });
  } catch (err) {
    console.log(err);
    dispatch(setLocalPostsLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to remove the posts when component unmounts
export const removeAllPosts = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALL_POSTS,
    payload: [],
  });
};

// Action to get a post
export const getAPost = (postId) => async (dispatch) => {
  dispatch(setAPostLoading(true));
  try {
    const response = await axiosInstance.get(`/post/view/${postId}`);
    dispatch({
      type: GET_A_POST,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setAPostLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to create a post
export const createAPost = (postData, setInputFocused, setFormValues) => async (dispatch) => {
  dispatch(setCreateAPostLoading(true));
  try {
    const response = await axiosInstance.post("/post/add", postData, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    setInputFocused(false);
    setFormValues({
      images: null,
      caption: "",
      tags: [],
    });
    dispatch({
      type: CREATE_A_POST,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setCreateAPostLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to toggle like on a post
export const toggleLike = (postId, from) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/post/like/${postId}`);

    if (from === "list") {
      dispatch({
        type: LIKE_A_POST_FROM_LIST,
        payload: response.data.data,
      });
    } else if ((from = "local-list")) {
      dispatch({
        type: LIKE_A_POST_FROM_LOCAL_LIST,
        payload: response.data.data,
      });
    } else if (from === "single") {
      dispatch({
        type: LIKE_A_POST_FROM_SINGLE,
        payload: response.data.data,
      });
    } else if (from === "user-profile") {
      dispatch({
        type: LIKE_A_POST_FROM_USER_PROFILE,
        payload: response.data.data,
      });
    } else if (from === "my-profile") {
      dispatch({
        type: LIKE_A_POST_FROM_MY_PROFILE,
        payload: response.data.data,
      });
    }
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

// Action to add a comment
export const addAComment = (postId, commentData) => async (dispatch) => {
  dispatch(setAddCommentLoading(true));
  try {
    const response = await axiosInstance.post(`/post/comment/${postId}`, commentData);
    console.log(response);
    dispatch({
      type: ADD_COMMENT,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setAddCommentLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to toggle saving and unsaving of the post
export const togglePostSave = (postId, from) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/post/save/${postId}`);

    if (from === "list") {
      dispatch({
        type: SAVE_A_POST_FROM_LIST,
        payload: response.data.data,
      });
    } else if (from === "local-list") {
      dispatch({
        type: SAVE_A_POST_FROM_LOCAL_LIST,
        payload: response.data.data,
      });
    } else if (from === "single") {
      dispatch({
        type: SAVE_A_POST_FROM_SINGLE,
        payload: response.data.data,
      });
    } else if (from === "user-profile") {
      dispatch({
        type: SAVE_A_POST_FROM_USER_PROFILE,
        payload: response.data.data,
      });
    } else if (from === "my-profile") {
      dispatch({
        type: SAVE_A_POST_FROM_MY_PROFILE,
        payload: response.data.data,
      });
    }
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

// Action to delete a post
export const deletePost = (postId) => async (dispatch) => {
  dispatch(setDeletePostLoading(true));
  try {
    const response = await axiosInstance.post(`/post/delete/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    showSuccessNotification({ title: "Success", message: "Post deleted successfully" });
  } catch (err) {
    dispatch(setDeletePostLoading(true));

    dispatch(setErrors(err.response.data));
  }
};

// Action to set loading when fetching all posts
const setAllPostsLoading = (data) => {
  return {
    type: SET_ALL_POSTS_LOADING,
    payload: data,
  };
};
const setLocalPostsLoading = (data) => {
  return {
    type: SET_LOCAL_POSTS_LOADING,
    payload: data,
  };
};

// Action to set loading when fetching post
const setAPostLoading = (data) => {
  return {
    type: SET_A_POST_LOADING,
    payload: data,
  };
};
// Action to set loading when fetching post
const setCreateAPostLoading = (data) => {
  return {
    type: SET_CREATE_A_POST_LOADING,
    payload: data,
  };
};

// Action to set loading when adding a comment
const setAddCommentLoading = (data) => {
  return {
    type: SET_ADD_COMMENT_LOADING,
    payload: data,
  };
};
// Action to set loading when deleting a post
const setDeletePostLoading = (data) => {
  return {
    type: SET_DELETE_POST_LOADING,
    payload: data,
  };
};
