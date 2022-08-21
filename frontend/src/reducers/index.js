import { combineReducers } from "redux";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import shopReducer from "./shopReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";
import postRedurer from "./postReducer";
import venueReducer from "./venueReducer";
import myVenueReducer from "./myVenueReducer";
import chatReducer from "./chatReducer";
import notificationReducer from "./notificationReducer";
import savedReducer from "./savedReducer";
import friendReducer from "./friendReducer";
import challengeReducer from "./challengeReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  profile: profileReducer,
  shop: shopReducer,
  cart: cartReducer,
  order: orderReducer,
  user: userReducer,
  post: postRedurer,
  venue: venueReducer,
  myVenue: myVenueReducer,
  chat: chatReducer,
  notification: notificationReducer,
  saved: savedReducer,
  friend: friendReducer,
  challenge: challengeReducer,
});
