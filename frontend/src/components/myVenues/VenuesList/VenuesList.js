import React from "react";
import { Card, Text, Title, Image, Badge } from "@mantine/core";

import VenueItem from "./VenueItem";

const VenuesList = (props) => {
  console.log("AAA", props);

  return (
    <Card withBorder shadow="md" mt={20}>
      <Title order={4} mb={10}>
        My Venues
      </Title>
      {props.myVenues.map((venue) => (
        <VenueItem key={venue._id} venue={venue} venueEarnings={props.venueEarnings} />
      ))}
    </Card>
  );
};

export default VenuesList;
