import {
  GET_SHOP_ITEMS,
  SET_SHOP_ITEMS_LOADING,
  GET_SHOP_ITEM,
  SET_SHOP_ITEM_LOADING,
  EDIT_SHOP_ITEM,
  SET_EDIT_SHOP_ITEM_LOADING,
  DELETE_SHOP_ITEM,
  SET_DELETE_SHOP_ITEM_LOADING,
  SET_CREATE_ITEM_LOADING,
  SORT_SHOP_BY_NAME,
  SORT_SHOP_BY_PRICE,
  SORT_SHOP_BY_RATING,
  REVIEW_SHOP_ITEM,
  SET_REVIEW_SHOP_ITEM_LOADING,
  REMOVE_ALL_SHOP_ITEMS,
  SAVE_SHOP_ITEM_FROM_LIST,
  SAVE_SHOP_ITEM_FROM_SINGLE,
} from "../actions/types";
import { showSuccessNotification } from "../utils/notifications/showCustomNotification";
import { setErrors } from "./errorActions";
import axiosInstance from "../utils/axios/axiosInstance";

// Action for creating a new shop item
export const createShopItem = (productData, navigate) => async (dispatch) => {
  dispatch(setCreateItemLoading(true));
  try {
    const response = await axiosInstance.post("/product/add", productData, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(setCreateItemLoading(false));
    showSuccessNotification({ title: "Success", message: "Product created successfully" });
    navigate("/shop");
  } catch (err) {
    dispatch(setCreateItemLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action for fetching shop items
export const getShopItems = (pageNumber) => async (dispatch) => {
  dispatch(setShopItemsLoading(true));
  try {
    const response = await axiosInstance.get("/product", {
      params: {
        page: pageNumber,
      },
    });

    dispatch({
      type: GET_SHOP_ITEMS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setShopItemsLoading(false));
    dispatch(setErrors(err.response.data));
  }
};
// Action for fetching all shop items without limit
export const getAllShopItems = () => async (dispatch) => {
  dispatch(setShopItemsLoading(true));
  try {
    const response = await axiosInstance.get("/product", {
      params: {
        limit: 500,
      },
    });

    dispatch({
      type: GET_SHOP_ITEMS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setShopItemsLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action for getting filtered shop items
export const getFilteredShopItems = (filter) => async (dispatch) => {
  dispatch(setShopItemsLoading(true));
  try {
    dispatch(removeAllShopItems());
    const response = await axiosInstance.post("/product/filtered", filter);
    console.log(response.data.data);

    dispatch({
      type: GET_SHOP_ITEMS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch(setShopItemsLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to remove the posts when component unmounts
export const removeAllShopItems = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALL_SHOP_ITEMS,
    payload: [],
  });
};

// Action to get a shop item
export const getShopItem = (productId) => async (dispatch) => {
  dispatch(setShopItemLoading(true));
  try {
    const response = await axiosInstance.get(`/product/view/${productId}`);

    dispatch({
      type: GET_SHOP_ITEM,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setShopItemLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action for editing shop item
export const editShopItem = (productData, productId, navigate) => async (dispatch) => {
  dispatch(setEditShopItemLoading(true));
  try {
    const response = await axiosInstance.post(`/product/update/${productId}`, productData, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(setEditShopItemLoading(false));
    showSuccessNotification({ title: "Success", message: "Product updated successfully" });
    navigate("/shop");
  } catch (err) {
    dispatch(setEditShopItemLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to delete a shop item
export const deleteShopItem = (productId, navigate) => async (dispatch) => {
  dispatch(setDeleteShopItemLoading(true));
  try {
    const response = await axiosInstance.post(`/product/delete/${productId}`);
    dispatch({
      type: DELETE_SHOP_ITEM,
      payload: productId,
    });
    showSuccessNotification({ title: "Success", message: "Product deleted successfully" });
  } catch (err) {
    dispatch(setDeleteShopItemLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to write a product review
export const reviewShopItem = (productId, reviewInfo) => async (dispatch) => {
  dispatch(setReviewShopItemLoading(true));
  try {
    const response = await axiosInstance.post(`/product/review/${productId}`, reviewInfo);
    dispatch({
      type: REVIEW_SHOP_ITEM,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setReviewShopItemLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to save shop item
export const saveShopItem = (productId, from) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/product/save/${productId}`);

    if (from === "list") {
      dispatch({
        type: SAVE_SHOP_ITEM_FROM_LIST,
        payload: response.data.data,
      });
    } else if (from === "single") {
      dispatch({
        type: SAVE_SHOP_ITEM_FROM_SINGLE,
        payload: response.data.data,
      });
    }
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

// Action to sort shop items
export const sortShopItems = (sortBy) => (dispatch, getState) => {
  if (sortBy === "price") {
    dispatch({
      type: SORT_SHOP_BY_PRICE,
    });
  } else if (sortBy === "name") {
    dispatch({
      type: SORT_SHOP_BY_NAME,
    });
  }
};

const setShopItemsLoading = (data) => {
  return {
    type: SET_SHOP_ITEMS_LOADING,
    payload: data,
  };
};
const setShopItemLoading = (data) => {
  return {
    type: SET_SHOP_ITEM_LOADING,
    payload: data,
  };
};
const setCreateItemLoading = (data) => {
  return {
    type: SET_CREATE_ITEM_LOADING,
    payload: data,
  };
};
const setEditShopItemLoading = (data) => {
  return {
    type: SET_EDIT_SHOP_ITEM_LOADING,
    payload: data,
  };
};
const setDeleteShopItemLoading = (data) => {
  return {
    type: SET_DELETE_SHOP_ITEM_LOADING,
    payload: data,
  };
};

const setReviewShopItemLoading = (data) => {
  return {
    type: SET_REVIEW_SHOP_ITEM_LOADING,
    payload: data,
  };
};
