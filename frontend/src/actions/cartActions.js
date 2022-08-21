import axiosInstance from "../utils/axios/axiosInstance";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_COMPLETE_PURCHASE_LOADING,
  GET_CART_ITEMS_ON_LOAD,
  INCREASE_CART_ITEM_QUANTITY,
  DECREASE_CART_ITEM_QUANTITY,
  CLEAR_CART,
} from "./types";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../utils/notifications/showCustomNotification";
import { setErrors, clearErrors } from "./errorActions";
import isEmpty from "../utils/isEmpty";

// Add an item to cart
export const addToCart = (cartItem) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: cartItem,
  });
  showSuccessNotification({ title: "Success", message: "Added to cart." });
};

// Remove an item from cart
export const removeFromCart = (cartItemId) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: cartItemId,
  });
  showSuccessNotification({ title: "Success", message: "Removed from cart." });
};

// Action to increase item quantity
export const increaseCartItemQuantity = (cartItemId) => (dispatch) => {
  dispatch({
    type: INCREASE_CART_ITEM_QUANTITY,
    payload: cartItemId,
  });
};

// Action to decrease item quantity
export const decreaseCartItemQuantity = (cartItemId) => (dispatch) => {
  dispatch({
    type: DECREASE_CART_ITEM_QUANTITY,
    payload: cartItemId,
  });
};

// Action to clear the cart
export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
  showSuccessNotification({ title: "Success", message: "Cart cleared" });
};

// Load cart items when app loads
export const getCartItemsOnLoad = (cart) => (dispatch) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!isEmpty(cart)) {
    dispatch({
      type: GET_CART_ITEMS_ON_LOAD,
      payload: cart,
    });
  }
};

// Action to send the order to the server

export const completePurchase = (formValues, cartItems, payload) => async (dispatch) => {
  dispatch(setCompletePurchaseLoading(true));
  try {
    return axiosInstance.post("/product/buy", {
      items: cartItems,
      payload: payload,
      name: formValues.name,
      address: formValues.address,
      city: formValues.city,
      phone: formValues.phoneNumber,
    });
  } catch (err) {
    dispatch(setCompletePurchaseLoading(false));
    dispatch(setErrors({ ...err.response.data, errorType: "purchase-failed-error" }));
  }
};

// Action to indicate purchase success
export const completePurchaseSuccess = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch(setCompletePurchaseLoading(false));
  showSuccessNotification({ title: "Success", message: "Payment successful" });
  dispatch({
    type: CLEAR_CART,
  });
};

// Action to indicate purchase error
export const completePurchaseError = (err) => (dispatch) => {
  dispatch(setErrors(err.response.data));
  dispatch(setCompletePurchaseLoading(false));
  showErrorNotification({ title: "Error", message: "Payment error" });
};

export const setCompletePurchaseLoading = (data) => {
  return {
    type: SET_COMPLETE_PURCHASE_LOADING,
    payload: data,
  };
};
