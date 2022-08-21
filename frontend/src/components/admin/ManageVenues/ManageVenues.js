import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Table, Box, Button } from "@mantine/core";
import { connect } from "react-redux";

import Loading from "../../common/Loading";
import VenueRow from "./VenueRow";
import { getAllVenues, removeAllVenues } from "../../../actions/venueActions";

const ManageVenues = (props) => {
  useEffect(() => {
    props.getAllVenues();

    return () => {
      props.removeAllVenues();
    };
  }, []);

  let renderVenues = <Loading />;
  if (!props.allVenues || props.venuesLoading || props.allVenues.length === 0) {
    renderVenues = <Loading />;
  } else if (props.allVenues.length > 0) {
    renderVenues = (
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Venue</th>
            <th style={{ textAlign: "center" }}>Owner</th>
            <th style={{ textAlign: "center" }}>Location</th>
            <th style={{ textAlign: "center" }}>Rating</th>
            <th style={{ textAlign: "center" }}>Status</th>

            <th style={{ textAlign: "center" }}>Created At</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.allVenues.map((item) => (
            <VenueRow key={item._id} venue={item} verifyVenueLoading={props.verifyVenueLoading} />
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Card withBorder shadow="md" mt={10}>
      {renderVenues}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    allVenues: state.venue.allVenues,
    venuesLoading: state.venue.venuesLoading,
    verifyVenueLoading: state.venue.verifyVenueLoading,
  };
};

export default connect(mapStateToProps, { getAllVenues, removeAllVenues })(ManageVenues);
