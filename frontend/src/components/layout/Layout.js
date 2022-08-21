import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import store from "../../store";
import {
  setCurrentUser,
  populateUserInfo,
  setCurrentUserLoading,
  setCurrentUserInfoLoading,
} from "../../actions/authActions";
import { getCartItemsOnLoad } from "../../actions/cartActions";
import setAuthToken from "../../utils/auth/setAuthToken";

import Skeleton from "./Skeleton";
import PrivateRoute from "../authRoutes/PrivateRoute";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import CompleteProfile from "../myProfile/CompleteProfile/CompleteProfile";
import MyProfile from "../myProfile/MyProfile";
import PostFeed from "../posts/PostFeed";
import Post from "../post/Post";
import Shop from "../shop/Shop";
import Product from "../shop/Product/Product";
import Checkout from "../checkout/Checkout";
import AuthCallback from "../auth/AuthCallback/AuthCallback";
import AddProduct from "../shop/AddProduct/AddProduct";
import EditProduct from "../shop/EditProduct/EditProduct";
import Admin from "../admin/Admin";
import Venues from "../venues/Venues";
import Venue from "../venue/Venue";
import BookVenue from "../bookVenue/BookVenue";
import MyVenues from "../myVenues/MyVenues";
import ManageVenue from "../manageVenue/ManageVenue";
import MyVenuesStats from "../myVenuesStats/MyVenuesStats";
import MyVenueHistory from "../myVenueHistory/MyVenueHistory";
import AddVenue from "../addVenue/AddVenue";
import EditVenue from "../myVenues/EditVenue/EditVenue";
import UserProfile from "../userProfile/UserProfile";
import Chat from "../chat/Chat";
import Saved from "../saved/Saved";
import Friends from "../friends/Friends";
import Challenges from "../challenges/Challenges";
import NotFound from "../common/404";
import ResetPassword from "../auth/ResetPassword/ResetPassword";
import NewPassword from "../auth/ResetPassword/NewPassword";

// Check login state on page reload
if (localStorage.jwt) {
  store.dispatch(setCurrentUserLoading(true));
  store.dispatch(setCurrentUserInfoLoading(true));
  const token = localStorage.jwt;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(populateUserInfo());
}

// Load cart when app loads
if (localStorage.cart) {
  const cart = JSON.parse(localStorage.cart);
  store.dispatch(getCartItemsOnLoad(cart));
}

const Layout = () => {
  return (
    <Skeleton>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password/:passwordResetString" element={<NewPassword />} />
        <Route path="/home" element={<PostFeed />} />

        {/* Routes needing authentication */}
        <Route element={<PrivateRoute allowedRoles={["user", "admin", "venueOwner"]} />}>
          <Route path="/register/complete-profile" element={<CompleteProfile />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/profile/:username" element={<UserProfile />} />

          <Route path="/post/:postId" element={<Post />} />

          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/checkout" element={<Checkout />} />
          <Route path="/shop/add" element={<AddProduct />} />
          <Route path="/shop/:productId" element={<Product />} />
          <Route path="/shop/:productId/edit" element={<EditProduct />} />

          <Route path="/venues" element={<Venues />} />
          <Route path="/venue/:venueId" element={<Venue />} />
          <Route path="/venue/:venueId/book" element={<BookVenue />} />

          <Route path="/chat" element={<Chat />} />

          <Route path="/saved" element={<Saved />} />

          <Route path="/friends" element={<Friends />} />

          <Route path="/challenges" element={<Challenges />} />
        </Route>

        {/* Venue owner routes */}
        <Route element={<PrivateRoute allowedRoles={["venueOwner", "admin"]} />}>
          <Route path="/my-venues" element={<MyVenues />} />
          <Route path="/my-venues/stats" element={<MyVenuesStats />} />
          <Route path="/my-venues/:venueId/history" element={<MyVenueHistory />} />
          <Route path="/my-venues/:venueId/manage" element={<ManageVenue />} />
          <Route path="/my-venues/add" element={<AddVenue />} />
          <Route path="/my-venues/:venueId/edit" element={<EditVenue />} />
        </Route>

        {/* Admin routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Skeleton>
  );
};

export default Layout;
