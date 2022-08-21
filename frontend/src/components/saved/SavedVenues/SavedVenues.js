import React from "react";
import { Box, Group } from "@mantine/core";

import VenueCard from "./VenueCard";

const SavedVenues = (props) => {
  return (
    <Box mt={16}>
      <Group direction="column">
        {props.venues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} user={props.user} />
        ))}
      </Group>
    </Box>
  );
};

export default SavedVenues;
