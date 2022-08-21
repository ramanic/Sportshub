import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import VenueGallery from "./VenueGallery/VenueGallery";
import VenueHeading from "./VenueHeading/VenueHeading";
import VenueDetails from "./VenueDetails/VenueDetails";
import VenueReviews from "./VenueReviews/VenueReviews";
import Loading from "../common/Loading";
import { getVenue } from "../../actions/venueActions";

const Venue = (props) => {
  const params = useParams();
  useEffect(() => {
    props.getVenue(params.venueId);
  }, []);

  let rendervenue = <Loading />;

  if (props.venueLoading || !props.currentVenue) {
    rendervenue = <Loading />;
  } else {
    rendervenue = (
      <>
        <VenueGallery venueImages={props.currentVenue.images} />
        <VenueHeading currentVenue={props.currentVenue} user={props.user} />
        <VenueDetails currentVenue={props.currentVenue} />
        <VenueReviews
          reviewVenueLoading={props.reviewVenueLoading}
          reviews={props.currentVenue.reviews.sort(function (a, b) {
            return new Date(b.reviewedAt) - new Date(a.reviewedAt);
          })}
          venueId={props.currentVenue._id}
        />
      </>
    );
  }

  return rendervenue;
};

const mapStateToProps = (state) => {
  return {
    currentVenue: state.venue.currentVenue,
    venueLoading: state.venue.venueLoading,
    reviewVenueLoading: state.venue.reviewVenueLoading,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getVenue })(Venue);
