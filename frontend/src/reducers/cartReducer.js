import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_COMPLETE_PURCHASE_LOADING,
  GET_CART_ITEMS_ON_LOAD,
  INCREASE_CART_ITEM_QUANTITY,
  DECREASE_CART_ITEM_QUANTITY,
  CLEAR_CART,
} from "../actions/types";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  completePurchaseLoading: false,
};

const cartReducer = (state = initialState, action) => {
  let newCartItems, alreadyAdded, newTotalPrice;
  switch (action.type) {
    // ## Add item to cart
    case ADD_TO_CART:
      newCartItems = state.cartItems;
      alreadyAdded = state.cartItems.findIndex((el) => el._id === action.payload._id);
      // if the item is already added, just change quantity
      if (alreadyAdded >= 0) {
        newCartItems[alreadyAdded].quantity += 1;
      } else {
        newCartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      // save cart to localstorage
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: newCartItems,
          totalPrice: state.totalPrice + action.payload.price,
        })
      );
      return {
        ...state,
        cartItems: newCartItems,
        totalPrice: state.totalPrice + action.payload.price,
      };
    // ## Remove item from cart
    case REMOVE_FROM_CART:
      newCartItems = state.cartItems;
      newTotalPrice = state.totalPrice;
      alreadyAdded = state.cartItems.findIndex((el) => el._id === action.payload);

      // if the item is already added, just change quantity
      if (alreadyAdded >= 0) {
        newTotalPrice -=
          state.cartItems[alreadyAdded].price * state.cartItems[alreadyAdded].quantity;
        newCartItems.splice(alreadyAdded, 1);
      }
      // save cart to localstorage
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: newCartItems,
          totalPrice: newTotalPrice,
        })
      );
      return {
        ...state,
        cartItems: newCartItems,
        totalPrice: newTotalPrice,
      };

    // ## Load cart on app load
    case GET_CART_ITEMS_ON_LOAD:
      return {
        ...state,
        completePurchaseLoading: false,
        cartItems: action.payload.cartItems,
        totalPrice: action.payload.totalPrice,
      };

    // ## Increase cart item quantity
    case INCREASE_CART_ITEM_QUANTITY:
      newCartItems = state.cartItems;
      newTotalPrice = state.totalPrice;

      alreadyAdded = state.cartItems.findIndex((el) => el._id === action.payload);

      if (alreadyAdded >= 0) {
        newCartItems[alreadyAdded].quantity += 1;
        newTotalPrice += state.cartItems[alreadyAdded].price;
      }

      // save cart to localstorage
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: newCartItems,
          totalPrice: newTotalPrice,
        })
      );

      return {
        ...state,
        cartItems: newCartItems,
        totalPrice: newTotalPrice,
      };

    // ## Decrease cart item quantity
    case DECREASE_CART_ITEM_QUANTITY:
      newCartItems = state.cartItems;
      newTotalPrice = state.totalPrice;
      alreadyAdded = state.cartItems.findIndex((el) => el._id === action.payload);

      if (alreadyAdded >= 0) {
        newCartItems[alreadyAdded].quantity -= 1;
        newTotalPrice -= state.cartItems[alreadyAdded].price;
      }

      // save cart to localstorage
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: newCartItems,
          totalPrice: newTotalPrice,
        })
      );

      return {
        ...state,
        cartItems: newCartItems,
        totalPrice: newTotalPrice,
      };

    // ## Clear the cart
    case CLEAR_CART:
      localStorage.removeItem("cart");
      return {
        cartItems: [],
        totalPrice: 0,
        completePurchaseLoading: false,
      };

    // ## Set loading when processing purchase
    case SET_COMPLETE_PURCHASE_LOADING:
      return {
        ...state,
        completePurchaseLoading: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
