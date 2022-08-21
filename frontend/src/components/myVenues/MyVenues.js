import React, { useEffect } from "react";
import { Card, Text } from "@mantine/core";
import { connect } from "react-redux";

import VenuesSummary from "./VenuesSummary/VenuesSummary";
import VenuesList from "./VenuesList/VenuesList";
import Loading from "../common/Loading";
import isEmpty from "../../utils/isEmpty";
import { getMyVenues, getMyVenueAggregates } from "../../actions/myVenueActions";

const MyVenues = (props) => {
  useEffect(() => {
    props.getMyVenues();
    props.getMyVenueAggregates();
  }, []);

  let renderMyVenues = <Loading />;

  if (
    (props.myVenuesLoading && props.myVenues.length === 0) ||
    (props.venueAggregatesLoading && isEmpty(props.venueAggregates))
  ) {
    renderMyVenues = <Loading />;
  } else {
    renderMyVenues = (
      <>
        {props.venueAggregatesLoading || isEmpty(props.venueAggregates) ? (
          <Loading />
        ) : (
          <VenuesSummary
            userInfo={props.userInfo}
            venueAggregates={props.venueAggregates}
            totalVenues={props.myVenues.length}
            myVenues={props.myVenues}
          />
        )}

        <VenuesList
          myVenues={props.myVenues}
          venueEarnings={props.venueAggregates?.venueEarnings}
        />
      </>
    );
  }

  return (
    <Card withBorder shadow="lg">
      {renderMyVenues}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    myVenues: state.myVenue.myVenues,
    myVenuesLoading: state.myVenue.myVenuesLoading,
    userInfo: state.auth.userInfo,
    venueAggregatesLoading: state.myVenue.venueAggregatesLoading,
    venueAggregates: state.myVenue.venueAggregates,
  };
};

export default connect(mapStateToProps, { getMyVenues, getMyVenueAggregates })(MyVenues);
