import React from "react";

import PopularVenues from "./PopularVenues/PopularVenues";
import Loading from "../../common/Loading";

const RightContent = (props) => {
  let renderVenues = <Loading />;

  if (props.recommendedVenues.length === 0 && props.recommendedVenuesLoading) {
    renderVenues = <Loading />;
  } else {
    renderVenues = <PopularVenues venues={props.recommendedVenues} userInfo={props.userInfo} />;
  }

  return <>{renderVenues}</>;
};

export default RightContent;
