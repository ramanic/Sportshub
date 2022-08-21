import axiosInstance from "../utils/axios/axiosInstance";
import {
  GET_ORDER_ITEMS,
  SET_ORDER_ITEMS_LOADING,
  GET_MY_ORDERS,
  SET_MY_ORDERS_LOADING,
} from "./types";
import { setErrors } from "./errorActions";

// Action to fetch order items
export const getOrderItems = () => async (dispatch) => {
  dispatch(setOrderItemsLoading(true));
  try {
    const response = await axiosInstance.get("/orders/all");

    dispatch({
      type: GET_ORDER_ITEMS,
      payload: response.data.data.orders,
    });
  } catch (err) {
    dispatch(setOrderItemsLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

// Action to fetch my orders
export const getMyOrders = () => async (dispatch) => {
  dispatch(setMyOrdersLoading(true));
  try {
    const response = await axiosInstance.get("/orders/my");
    dispatch({
      type: GET_MY_ORDERS,
      payload: response.data.data.orders,
    });
  } catch (err) {
    dispatch(setMyOrdersLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

export const setOrderItemsLoading = (data) => {
  return {
    type: SET_ORDER_ITEMS_LOADING,
    payload: data,
  };
};

export const setMyOrdersLoading = (data) => {
  return {
    type: SET_MY_ORDERS_LOADING,
    payload: data,
  };
};
