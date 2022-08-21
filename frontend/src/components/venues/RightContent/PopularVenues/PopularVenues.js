import React from "react";
import { Card, Title } from "@mantine/core";

import PopularVenueItem from "./PopularVenueItem";

const PopularVenues = (props) => {
  let newVenues = [...props.venues];
  if (props.userInfo.profile.address?.district) {
    newVenues = props.venues.filter(
      (venue) => venue.address.district === props.userInfo.profile.address.district
    );
  }

  return (
    <>
      <Title order={4} mb={16}>
        Popular Venues
      </Title>
      {newVenues.map((venue) => (
        <PopularVenueItem key={venue._id} venue={venue} />
      ))}
    </>
  );
};

export default PopularVenues;
