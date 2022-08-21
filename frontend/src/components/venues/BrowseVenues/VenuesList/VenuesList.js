import React from "react";
import { Title, Grid, Box, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import VenueCard from "./VenueCard";
import VenuesSort from "../../VenuesFilter/VenuesSort";

const VenuesList = (props) => {
  // Sort venues according to user location
  let newVenues = [...props.allVenues];
  let matchedVenues = [];
  let unmatchedVenues = [];

  if (props.userInfo?.profile?.address?.city && props.userInfo?.profile?.address?.district) {
    const userDistrict = props.userInfo.profile.address.district;
    props.allVenues.forEach((venue, index) => {
      const venueDistrict = venue.address.district;
      if (userDistrict === venueDistrict) {
        matchedVenues.push(venue);
      } else {
        unmatchedVenues.push(venue);
      }
    });

    newVenues = [...matchedVenues, ...unmatchedVenues];
  }

  if (props.sortBy === "rating") {
    newVenues = newVenues.sort((a, b) => {
      let sumValuesa = a.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
      let averageRatinga = a.reviews.length === 0 ? 0 : sumValuesa / a.reviews.length;
      let sumValuesb = b.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
      let averageRatingb = b.reviews.length === 0 ? 0 : sumValuesb / b.reviews.length;
      return averageRatingb - averageRatinga;
    });
  }

  const smallScreen = useMediaQuery("(min-width: 768px)");
  return (
    <Box>
      <Group position="apart" sx={{ alignItems: "flex-start" }}>
        <Title order={smallScreen ? 3 : 4} mb={16}>
          Browse Venues
        </Title>
        <VenuesSort sortBy={props.sortBy} venuesSortByHandler={props.venuesSortByHandler} />
      </Group>

      <Group direction="column">
        {newVenues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} user={props.user} />
        ))}
      </Group>
    </Box>
  );
};

export default VenuesList;
