import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import Loading from "../../common/Loading";
import { googleLoginSuccess, googleLoginError } from "../../../actions/authActions";

const AuthCallback = (props) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [authResponse, setAuthResponse] = useState({
    token: null,
    isNew: null,
    error: false,
  });

  useEffect(() => {
    const token = searchParams.get("token");
    const isNew = searchParams.get("new");
    const error = searchParams.get("error");
    setAuthResponse({ token, isNew, error });
  }, [searchParams]);

  useEffect(() => {
    if (authResponse.error) {
      props.googleLoginError(navigate);
    } else if (!authResponse.error && authResponse.token && authResponse.isNew) {
      props.googleLoginSuccess(authResponse, navigate);
    } else {
      return <Loading />;
    }
  }, [authResponse]);

  return <Loading />;
};

export default connect(null, { googleLoginSuccess, googleLoginError })(AuthCallback);
