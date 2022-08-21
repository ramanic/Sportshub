import {
  GET_FRIENDS,
  SET_FRIENDS_LOADING,
  GET_FRIEND_REQUESTS,
  SET_FRIEND_REQUESTS_LOADING,
  GET_SENT_REQUESTS,
  SET_SENT_REQUESTS_LOADING,
  ACCEPT_FRIEND_REQUEST,
  SET_ACCEPT_FRIEND_REQUEST_LOADING,
  REMOVE_FRIEND,
  SET_REMOVE_FRIEND_LOADING,
  SEND_FRIEND_REQUEST,
  SET_SEND_FRIEND_REQUEST_LOADING,
} from "../actions/types";

const initialState = {
  friends: [],
  friendsLoading: false,
  friendRequests: [],
  friendRequestsLoading: false,
  sentRequests: [],
  sentRequestsLoading: false,
  acceptFriendRequestLoading: false,
  removeFriendLoading: false,
  sendFriendRequestLoading: false,
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    // ## Get friend list
    case GET_FRIENDS:
      return {
        ...state,
        friendsLoading: false,
        friends: action.payload,
      };

    // ## Set loading while getting friend list
    case SET_FRIENDS_LOADING:
      return {
        ...state,
        friendsLoading: action.payload,
      };

    // ## Get friend requests
    case GET_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequests: action.payload,
        friendRequestsLoading: false,
      };

    // ## Set loading while getting friend requests
    case SET_FRIEND_REQUESTS_LOADING:
      return {
        ...state,
        friendRequestsLoading: action.payload,
      };

    // ## Get sent requests
    case GET_SENT_REQUESTS:
      return {
        ...state,
        sentRequests: action.payload,
        sentRequestsLoading: false,
      };
    // ## Set loading while fetching sent requests
    case SET_SENT_REQUESTS_LOADING:
      return {
        ...state,
        sentRequestsLoading: action.payload,
      };

    // ## Accept a friend request
    case ACCEPT_FRIEND_REQUEST:
      const newFriendRequests = [...state.friendRequests];
      console.log(state.friendRequests);
      const updatedFriendRequests = newFriendRequests.filter(
        (el) => el.user._id !== action.payload
      );
      console.log(updatedFriendRequests);
      return {
        ...state,
        acceptFriendRequestLoading: false,
        friendRequests: updatedFriendRequests,
        acceptFriendRequestLoading: false,
      };
    // ## Set loading when accepting friend request
    case SET_ACCEPT_FRIEND_REQUEST_LOADING:
      return {
        ...state,
        acceptFriendRequestLoading: action.payload,
      };

    // ## Remove a friend
    case REMOVE_FRIEND:
      const newFriends = state.friends.filter((el) => el.user._id !== action.payload);
      return {
        ...state,
        friends: newFriends,
        removeFriendLoading: false,
      };
    // ## Set loading while removing a friend
    case SET_REMOVE_FRIEND_LOADING:
      return {
        ...state,
        removeFriendLoading: action.payload,
      };

    // ## Send friend request
    case SEND_FRIEND_REQUEST:
      return {
        ...state,
        sendFriendRequestLoading: false,
      };
    // ## Set loading while sending friend request
    case SET_SEND_FRIEND_REQUEST_LOADING:
      return {
        ...state,
        sendFriendRequestLoading: action.payload,
      };
    default:
      return state;
  }
};

export default friendReducer;
