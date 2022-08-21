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
  LIKE_A_POST_FROM_MY_PROFILE,
  LIKE_A_POST_FROM_USER_PROFILE,
  ADD_COMMENT,
  SET_ADD_COMMENT_LOADING,
  REMOVE_ALL_POSTS,
  SAVE_A_POST_FROM_LIST,
  SAVE_A_POST_FROM_SINGLE,
  LIKE_A_POST_FROM_LOCAL_LIST,
  SAVE_A_POST_FROM_LOCAL_LIST,
} from "../actions/types";

const initialState = {
  postItems: [],
  localPostItems: [],
  totalPages: null,
  postItemsLoading: false,
  localPostItemsLoading: false.valueOf,
  currentPost: null,
  currentPostLoading: false,
  createPostLoading: false,
  addCommentLoading: false,
};

const postReducer = (state = initialState, action) => {
  let oldPostIndex, updatedPostItems;
  switch (action.type) {
    // ## Fetch all posts
    case GET_ALL_POSTS:
      return {
        ...state,
        postItems: [...state.postItems, ...action.payload.posts],
        totalPages: action.payload.totalPages,
        postItemsLoading: false,
      };
    // ## Set loading when fetching posts
    case SET_ALL_POSTS_LOADING:
      return {
        ...state,
        postItemsLoading: action.payload,
      };
    // ## Fetch all localposts
    case GET_LOCAL_POSTS:
      return {
        ...state,
        localPostItems: action.payload,
        localPostItemsLoading: false,
      };
    // ## Set loading when fetching local posts
    case SET_LOCAL_POSTS_LOADING:
      return {
        ...state,
        localPostItemsLoading: action.payload,
      };

    // ## Remove all posts when components unmounts'
    case REMOVE_ALL_POSTS:
      return {
        ...state,
        postItems: [],
      };
    // ## Fetch a post
    case GET_A_POST:
      return {
        ...state,
        currentPost: action.payload,
        currentPostLoading: false,
      };
    // ## Set loading when fetching a post
    case SET_A_POST_LOADING:
      return {
        ...state,
        currentPostLoading: action.payload,
      };
    // ## Create a new post
    case CREATE_A_POST:
      return {
        ...state,
        createPostLoading: false,
        postItems: [action.payload, ...state.postItems],
      };
    // ## Set loading while creating a new post
    case SET_CREATE_A_POST_LOADING:
      return {
        ...state,
        createPostLoading: action.payload,
      };

    // ## Toggle like of a post
    case LIKE_A_POST_FROM_LIST:
      oldPostIndex = state.postItems.findIndex((postItem) => postItem._id === action.payload._id);

      updatedPostItems = [...state.postItems];
      updatedPostItems[oldPostIndex] = action.payload;
      return {
        ...state,
        postItems: updatedPostItems,
      };
    // ## Toggle like of a post from local feed
    case LIKE_A_POST_FROM_LOCAL_LIST:
      oldPostIndex = state.localPostItems.findIndex(
        (postItem) => postItem._id === action.payload._id
      );

      updatedPostItems = [...state.localPostItems];
      updatedPostItems[oldPostIndex] = action.payload;
      return {
        ...state,
        localPostItems: updatedPostItems,
      };
    // ## Toggle like of a post
    case LIKE_A_POST_FROM_SINGLE:
      return {
        ...state,
        currentPost: action.payload,
      };

    // ## Toggle loke of a post from my profile
    case LIKE_A_POST_FROM_MY_PROFILE:
      return {
        ...state,
      };

    // ## Toggle loke of a post from user profile
    case LIKE_A_POST_FROM_USER_PROFILE:
      return {
        ...state,
      };

    // ## Toggle post save from list
    case SAVE_A_POST_FROM_LIST:
      oldPostIndex = state.postItems.findIndex((postItem) => postItem._id === action.payload._id);

      updatedPostItems = [...state.postItems];
      updatedPostItems[oldPostIndex] = action.payload;

      return {
        ...state,
        postItems: updatedPostItems,
      };

    // ## Toggle post save from local feed list
    case SAVE_A_POST_FROM_LOCAL_LIST:
      oldPostIndex = state.localPostItems.findIndex(
        (postItem) => postItem._id === action.payload._id
      );

      updatedPostItems = [...state.localPostItems];
      updatedPostItems[oldPostIndex] = action.payload;

      return {
        ...state,
        localPostItems: updatedPostItems,
      };

    // ## Toggle post save from single post page
    case SAVE_A_POST_FROM_SINGLE:
      return {
        ...state,
        currentPost: action.payload,
      };

    // ## Add a new comment
    case ADD_COMMENT:
      return {
        ...state,
        addCommentLoading: false,
        currentPost: action.payload,
      };

    // ## Toggle new comment loading
    case SET_ADD_COMMENT_LOADING:
      return {
        ...state,
        addCommentLoading: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
