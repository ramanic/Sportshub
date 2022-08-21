import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box, Grid } from "@mantine/core";

import Loading from "../../../common/Loading";
import BookedItem from "./BookedItem";
import { getMyBookings } from "../../../../actions/venueActions";

const BookingsTab = (props) => {
  useEffect(() => {
    props.getMyBookings();
  }, []);

  let renderMyBookings = <Loading />;

  if (props.myBookingsLoading && props.myBookings.length === 0) {
    renderMyBookings = <Loading />;
  } else {
    renderMyBookings = props.myBookings.map((booking) => (
      <Grid.Col xs={2} md={1} key={booking._id}>
        <BookedItem booking={booking} />
      </Grid.Col>
    ));
  }

  return (
    <Box mt={16} gutter={36}>
      <Grid columns={2}>{renderMyBookings}</Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    myBookings: state.venue.myBookings,
    myBookingsLoading: state.venue.myBookingsLoading,
  };
};

export default connect(mapStateToProps, { getMyBookings })(BookingsTab);
