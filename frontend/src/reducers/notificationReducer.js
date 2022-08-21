import {
  GET_NOTIFICATIONS,
  SET_NOTIFICATIONS_LOADING,
  READ_ALL_NOTIFICATIONS,
  READ_A_NOTIFICATION,
} from "../actions/types";

const initialState = {
  notifications: [],
  notificationsLoading: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    // ## Fetch all notifications
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notificationsLoading: false,
        notifications: action.payload,
      };

    // ## Set loading while fetching notifications
    case SET_NOTIFICATIONS_LOADING:
      return {
        ...state,
        notificationsLoading: action.payload,
      };

    // ## Read all notifications
    case READ_ALL_NOTIFICATIONS:
      let newNotifications = [...state.notifications];
      newNotifications = newNotifications.map((notification) => {
        return { ...notification, read: true };
      });
      return {
        ...state,
        notifications: newNotifications,
      };

    // ## Read a single notification
    case READ_A_NOTIFICATION:
      let newNotifications2 = [...state.notifications];
      let foundIndex = newNotifications2.findIndex((notif) => notif._id === action.payload);
      newNotifications2[foundIndex].read = true;
      return {
        ...state,
        notifications: newNotifications2,
      };

    default:
      return state;
  }
};

export default notificationReducer;
