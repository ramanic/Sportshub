import {
  GET_ALL_CONVERSATIONS,
  SET_ALL_CONVERSATIONS_LOADING,
  GET_CONVERSATION_MESSAGES,
  SET_CONVERSATION_MESSAGES_LOADING,
  SET_SEND_MESSAGE_LOADING,
  SEND_MESSAGE,
  SET_ARRIVED_MESSAGE,
  GET_FOLLOWED_USERS,
  SET_FOLLOWED_USERS_LOADING,
  GET_CREATE_CONVERSATION,
  SET_GET_CREATE_CONVERSATION_LOADING,
} from "../actions/types";

const initialState = {
  allConversations: [],
  allConversationsLoading: false,
  conversationMessages: [],
  conversationMessagesLoading: false,
  sendMessageLoading: false,
  followedUsers: [],
  followedUsersLoading: false,
  setGetCreateConversationLoading: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    // ## Fetch all conversations
    case GET_ALL_CONVERSATIONS:
      return {
        ...state,
        allConversationsLoading: false,
        allConversations: action.payload,
      };

    // ## Set loading when fetching conversations
    case SET_ALL_CONVERSATIONS_LOADING:
      return {
        ...state,
        allConversationsLoading: action.payload,
      };

    // ## Fetch current conversation messages
    case GET_CONVERSATION_MESSAGES:
      return {
        ...state,
        conversationMessages: action.payload,
        conversationMessagesLoading: false,
      };

    // ## Set loading while fetching conversation messages
    case SET_CONVERSATION_MESSAGES_LOADING:
      return {
        ...state,
        conversationMessagesLoading: action.payload,
      };

    // ## Send a new message
    case SEND_MESSAGE:
      let newConversationMessages = [...state.conversationMessages, action.payload];

      return {
        ...state,
        sendMessageLoading: false,
        conversationMessages: newConversationMessages,
      };

    // ## Set loading when sending message
    case SET_SEND_MESSAGE_LOADING:
      return {
        ...state,
        sendMessageLoading: action.payload,
      };

    // ## Update the messages array with new message
    case SET_ARRIVED_MESSAGE:
      return {
        ...state,
        conversationMessages: [...state.conversationMessages, action.payload],
      };

    // ## Get followed users
    case GET_FOLLOWED_USERS:
      return {
        ...state,
        followedUsersLoading: false,
        followedUsers: action.payload,
      };

    // ## Set loading while fetching followed users
    case SET_FOLLOWED_USERS_LOADING:
      return {
        ...state,
        followedUsersLoading: action.payload,
      };
    // ## Get or create a conversation
    case GET_CREATE_CONVERSATION:
      let newConversations = [...state.allConversations];
      let alreadyContains = newConversations.findIndex((c) => c._id === action.payload._id);

      if (alreadyContains < 0) {
        newConversations.unshift(action.payload);
      }
      return {
        ...state,
        allConversations: newConversations,
        setGetCreateConversationLoading: false,
      };
    case SET_GET_CREATE_CONVERSATION_LOADING:
      return {
        ...state,
        setGetCreateConversationLoading: action.payload,
      };

    default:
      return state;
  }
};

export default chatReducer;
