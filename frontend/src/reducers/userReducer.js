import {
  GET_ALL_USERS,
  SET_ALL_USERS_LOADING,
  CHANGE_USER_ROLE,
  SET_CHANGE_USER_ROLE_LOADING,
  GET_RECOMMENDED_PRODUCTS,
  SET_RECOMMENDED_PRODUCTS_LOADING,
  GET_RECOMMENDED_USERS,
  SET_RECOMMENDED_USERS_LOADING,
  GET_RECOMMENDED_VENUES,
  SET_RECOMMENDED_VENUES_LOADING,
} from "../actions/types";

const initialState = {
  users: [],
  getAllUsersLoading: false,
  changeUserRoleLoading: false,
  recommendedProducts: [],
  recommendedProductsLoading: false,
  recommendedUsers: [],
  recommendedUsersLoading: false,
  recommendedVenues: [],
  recommendedVenuesLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // ## Fetch all users
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        getAllUsersLoading: false,
      };

    // ## Set loading while fetching users
    case SET_ALL_USERS_LOADING:
      return {
        ...state,
        getAllUsersLoading: action.payload,
      };
    // ## Change user role
    case CHANGE_USER_ROLE:
      let newUsersData = [...state.users];
      let updateIndex = newUsersData.findIndex((el) => el._id === action.payload._id);
      newUsersData[updateIndex] = action.payload;
      return {
        ...state,
        changeUserRoleLoading: false,
        users: newUsersData,
      };
    // ## Set loading while changing user role
    case SET_CHANGE_USER_ROLE_LOADING:
      return {
        ...state,
        changeUserRoleLoading: action.payload,
      };
    // ## Fetch recommended pproducts
    case GET_RECOMMENDED_PRODUCTS:
      return {
        ...state,
        recommendedProductsLoading: false,
        recommendedProducts: action.payload,
      };
    case SET_RECOMMENDED_PRODUCTS_LOADING:
      return {
        ...state,
        recommendedProductsLoading: action.payload,
      };
    // ## Fetch recommended users
    case GET_RECOMMENDED_USERS:
      return {
        ...state,
        recommendedUsersLoading: false,
        recommendedUsers: action.payload,
      };
    case SET_RECOMMENDED_USERS_LOADING:
      return {
        ...state,
        recommendedUsersLoading: action.payload,
      };
    // ## Fetch recommended venues
    case GET_RECOMMENDED_VENUES:
      return {
        ...state,
        recommendedVenuesLoading: false,
        recommendedVenues: action.payload,
      };
    case SET_RECOMMENDED_VENUES_LOADING:
      return {
        ...state,
        recommendedVenuesLoading: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
