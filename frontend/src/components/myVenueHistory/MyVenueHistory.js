import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Title, Grid } from "@mantine/core";

import VenueItem from "./VenueItem";
import VenueHistoryItem from "./VenueHistoryItem";
import Loading from "../common/Loading";
import { getVenueHistory } from "../../actions/myVenueActions";
import isEmpty from "../../utils/isEmpty";

const MyVenueHistory = (props) => {
  const params = useParams();
  useEffect(() => {
    props.getVenueHistory(params.venueId);
  }, []);

  let renderVenueHistory = <Loading />;
  let renderVenueItem = <Loading />;

  if (props.venueHistoryLoading && props.venueHistory.length === 0 && isEmpty(props.currentVenue)) {
    renderVenueHistory = <Loading />;
    renderVenueItem = <Loading />;
  } else if (!isEmpty(props.currentVenue) && props.venueHistory.length >= 0) {
    let totalEarned = 0;
    props.venueHistory.forEach((el) => {
      totalEarned += el.totalCost;
    });

    renderVenueHistory = props.venueHistory.map((history) => (
      <VenueHistoryItem key={history._id} history={history} />
    ));
    renderVenueItem = (
      <VenueItem
        venue={props.currentVenue}
        totalEarned={totalEarned}
        totalBookings={props.venueHistory.length}
      />
    );
  }

  return (
    <Card withBorder shadow="lg">
      {renderVenueItem}
      <Title order={4} mb={12}>
        Venue Booking History
      </Title>
      {renderVenueHistory}
      {/* <Grid>
        <Grid.Col></Grid.Col>
      </Grid> */}
      {/* <VenueHistoryItem />
      <VenueHistoryItem />
      <VenueHistoryItem />
      <VenueHistoryItem />
      <VenueHistoryItem />
      <VenueHistoryItem />
      <VenueHistoryItem />
      <VenueHistoryItem /> */}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    venueHistory: state.myVenue.venueHistory,
    currentVenue: state.myVenue.currentVenue,
    venueHistoryLoading: state.myVenue.venueHistoryLoading,
  };
};

export default connect(mapStateToProps, { getVenueHistory })(MyVenueHistory);
