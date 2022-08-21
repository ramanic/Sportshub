import {
  COMPLETE_MY_PROFILE,
  SET_COMPLETE_MY_PROFILE_LOADING,
  GET_USER_PROFILE,
  SET_USER_PROFILE_LOADING,
  GET_MY_PROFILE,
  SET_MY_PROFILE_LOADING,
  LIKE_A_POST_FROM_USER_PROFILE,
  LIKE_A_POST_FROM_MY_PROFILE,
  SAVE_A_POST_FROM_MY_PROFILE,
  SAVE_A_POST_FROM_USER_PROFILE,
  DELETE_POST,
  SET_DELETE_POST_LOADING,
  SEND_FRIEND_REQUEST,
} from "../actions/types";

const initialState = {
  myProfile: {},
  myPosts: [],
  userProfile: {},
  completeMyProfileLoading: false,
  myProfileLoading: false,
  userProfileLoading: false,
  deletePostLoading: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    // ## Fetch my profile
    case GET_MY_PROFILE:
      return {
        ...state,
        myProfileLoading: false,
        myProfile: action.payload.user,
        myPosts: action.payload.posts,
      };

    // ## Set loading while fetching my profile
    case SET_MY_PROFILE_LOADING:
      return {
        ...state,
        myProfileLoading: action.payload,
      };

    // ## Set loading when completing my profile
    case SET_COMPLETE_MY_PROFILE_LOADING:
      return {
        ...state,
        completeMyProfileLoading: action.payload,
      };

    // ## Fetch user profile
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfileLoading: false,
        userProfile: action.payload,
      };

    // ## Set loading while fetching user profile
    case SET_USER_PROFILE_LOADING:
      return {
        ...state,
        userProfileLoading: action.payload,
      };

    // ## Like a post from user profile
    case LIKE_A_POST_FROM_USER_PROFILE:
      const oldPostIndex = state.userProfile.posts.findIndex(
        (postItem) => postItem._id === action.payload._id
      );

      const updatedPostItems = [...state.userProfile.posts];
      updatedPostItems[oldPostIndex] = action.payload;

      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          posts: updatedPostItems,
        },
      };

    // ## Like your post from your profile
    case LIKE_A_POST_FROM_MY_PROFILE:
      const oldPostIndex2 = state.myPosts.findIndex(
        (postItem) => postItem._id === action.payload._id
      );
      const updatedPostItems2 = [...state.myPosts];
      updatedPostItems2[oldPostIndex2] = action.payload;
      return {
        ...state,
        myPosts: updatedPostItems2,
      };

    // ## Toggle post save from your profile
    case SAVE_A_POST_FROM_MY_PROFILE:
      const oldPostIndex3 = state.myPosts.findIndex(
        (postItem) => postItem._id === action.payload._id
      );
      const updatedPostItems3 = [...state.myPosts];
      updatedPostItems3[oldPostIndex3] = action.payload;
      return {
        ...state,
        myPosts: updatedPostItems3,
      };

    // ## Toggle post save from user profile
    case SAVE_A_POST_FROM_USER_PROFILE:
      const oldPostIndex4 = state.userProfile.posts.findIndex(
        (postItem) => postItem._id === action.payload._id
      );

      const updatedPostItems4 = [...state.userProfile.posts];
      updatedPostItems4[oldPostIndex4] = action.payload;

      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          posts: updatedPostItems4,
        },
      };

    // ## Delete a post
    case DELETE_POST:
      const myNewPosts = [...state.myPosts];
      const foundIndex = state.myPosts.findIndex((el) => el._id === action.payload);
      myNewPosts.splice(foundIndex, 1);
      return {
        ...state,
        deletePostLoading: false,
        myPosts: myNewPosts,
      };

    // ## Set loading while deleting post
    case SET_DELETE_POST_LOADING:
      return {
        ...state,
        deletePostLoading: action.payload,
      };

    // ## Send friend request
    case SEND_FRIEND_REQUEST:
      console.log({
        ...state,
        userProfile: {
          ...state.userProfile,
          user: {
            ...state.userProfile.user,
            profile: {
              ...state.userProfile.user.profile,
              friends: [
                ...state.userProfile.user.profile.friends,
                { _id: Math.random(), status: "sent", user: action.payload },
              ],
            },
          },
        },
      });

      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          user: {
            ...state.userProfile.user,
            profile: {
              ...state.userProfile.user.profile,
              friends: [
                ...state.userProfile.user.profile.friends,
                { _id: Math.random(), status: "sent", user: action.payload },
              ],
            },
          },
        },
      };

    default:
      return state;
  }
};

export default profileReducer;
