import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import Loading from "../common/Loading";

const PrivateRoute = ({ allowedRoles, auth }) => {
  const location = useLocation();

  if (auth.userInfoLoading || auth.userLoading) {
    return <Loading />;
  } else if (auth.isAuthenticated && allowedRoles.includes(auth.userInfo.role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
