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
  REMOVE_ALL_SHOP_ITEMS,
  SET_REVIEW_SHOP_ITEM_LOADING,
  REVIEW_SHOP_ITEM,
  SAVE_SHOP_ITEM_FROM_LIST,
  SAVE_SHOP_ITEM_FROM_SINGLE,
} from "../actions/types";

const initialState = {
  shopItems: [],
  totalPages: null,
  shopItemsLoading: false,
  shopItem: null,
  shopItemLoading: false,
  createItemLoading: false,
  editItemLoading: false,
  deleteItemLoading: false,
  reviewShopItemLoading: false,
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    // ## Fetch all shop items
    case GET_SHOP_ITEMS:
      return {
        ...state,
        shopItemsLoading: false,
        shopItems: [...state.shopItems, ...action.payload.products],
        totalPages: action.payload.totalPages,
      };
    // ## Set loading when fetching shop items
    case SET_SHOP_ITEMS_LOADING:
      return {
        ...state,
        shopItemsLoading: action.payload,
      };

    // ## Remove all shop items when component unmounts
    case REMOVE_ALL_SHOP_ITEMS:
      return {
        ...state,
        shopItems: [],
      };

    // ## Fetch a single shop item
    case GET_SHOP_ITEM:
      return {
        ...state,
        shopItem: action.payload,
        shopItemLoading: false,
      };
    // ## Set loading when fetching a shop item
    case SET_SHOP_ITEM_LOADING:
      return {
        ...state,
        shopItemLoading: action.payload,
      };
    // ## Set loading when creating a new shop item
    case SET_CREATE_ITEM_LOADING:
      return {
        ...state,
        createItemLoading: action.payload,
      };
    // ## Set loading when editing a shop item
    case SET_EDIT_SHOP_ITEM_LOADING:
      return {
        ...state,
        editItemLoading: action.payload,
      };
    // ## Delete a shop item
    case DELETE_SHOP_ITEM:
      let newShopItems = [...state.shopItems];
      let foundIndex = state.shopItems.findIndex((el) => el._id === action.payload);
      newShopItems.splice(foundIndex, 1);

      return {
        ...state,
        deleteItemLoading: false,
        shopItems: newShopItems,
      };
    // ## Set loading when deleting shop item
    case SET_DELETE_SHOP_ITEM_LOADING:
      return {
        ...state,
        deleteItemLoading: action.payload,
      };
    // ## Sort items by their names
    case SORT_SHOP_BY_NAME:
      return {
        ...state,
        shopItems: state.shopItems.sort((a, b) => a.name.localeCompare(b.name)),
      };
    // ## Sort items by their price
    case SORT_SHOP_BY_PRICE:
      return {
        ...state,
        shopItems: state.shopItems.sort((a, b) => a.price - b.price),
      };
    // // ## Sort items by their rating
    // case SORT_SHOP_BY_RATING:
    //   return {
    //     ...state,
    //     shopItems: action.payload,
    //   };
    // ## Review a shop item
    case REVIEW_SHOP_ITEM:
      return {
        ...state,
        reviewShopItemLoading: false,
        shopItem: {
          ...state.shopItem,
          reviews: action.payload.reviews,
        },
      };
    // ## Set loading while reviewing shop item
    case SET_REVIEW_SHOP_ITEM_LOADING:
      return {
        ...state,
        reviewShopItemLoading: action.payload,
      };

    // ## Toggle shop item save from list
    case SAVE_SHOP_ITEM_FROM_LIST:
      const oldProductIndex = state.shopItems.findIndex(
        (shopItem) => shopItem._id === action.payload._id
      );
      const updatedProductItems = [...state.shopItems];
      updatedProductItems[oldProductIndex] = action.payload;
      return {
        ...state,
        shopItems: updatedProductItems,
      };

    // ## Toggle shop item save from single
    case SAVE_SHOP_ITEM_FROM_SINGLE:
      return {
        ...state,
        shopItem: action.payload,
      };

    default:
      return state;
  }
};

export default shopReducer;
