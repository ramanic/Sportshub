import {
  GET_ORDER_ITEMS,
  SET_ORDER_ITEMS_LOADING,
  GET_MY_ORDERS,
  SET_MY_ORDERS_LOADING,
} from "../actions/types";

const initialState = {
  orders: [],
  getOrdersLoading: false,
  myOrders: [],
  myOrdersLoading: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // ## Fetch all order items
    case GET_ORDER_ITEMS:
      return {
        ...state,
        orders: action.payload,
        getOrdersLoading: false,
      };
    // ## Set loading when fetching order items
    case SET_ORDER_ITEMS_LOADING:
      return {
        ...state,
        getOrdersLoading: action.payload,
      };
    // ## Get my orders
    case GET_MY_ORDERS:
      return {
        ...state,
        myOrders: action.payload,
        myOrdersLoading: false,
      };
    // ## Set loading while fetching my orders
    case SET_MY_ORDERS_LOADING:
      return {
        ...state,
        myOrdersLoading: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
