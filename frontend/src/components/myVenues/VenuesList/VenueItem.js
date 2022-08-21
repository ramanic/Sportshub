import React from "react";
import { Link } from "react-router-dom";
import { Card, Text, Title, Image, Box, Button, Badge, Group, Progress } from "@mantine/core";

import VenueItemMenu from "./VenueItemMenu";

const VenueItem = (props) => {
  const sumValues = props.venue.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
  const averageRating =
    props.venue.reviews.length === 0 ? 0 : sumValues / props.venue.reviews.length;

  // Calculate earnings of a venue
  let currentVenueEarning = 0;
  if (props.venueEarnings) {
    let foundIndex = props.venueEarnings.findIndex((el) => el._id === props.venue._id);
    if (foundIndex >= 0) {
      currentVenueEarning = props.venueEarnings[foundIndex].total;
    }
  }

  return (
    <Card shadow={0} withBorder mb={20}>
      <Group position="apart">
        <Group>
          <Image src={props.venue.images[0]} radius="sm" width={120} height={80} />
          <Box>
            <Text weight={600} component={Link} to={`/venue/${props.venue._id}`}>
              {props.venue.name}
            </Text>
            <Text size="xs" color="dimmed">
              {props.venue.address.city + " ," + props.venue.address.district}
            </Text>
          </Box>
        </Group>

        <Box sx={{ textAlign: "center" }}>
          {props.venue.verified ? (
            <Badge radius="sm" color="primary">
              Verified
            </Badge>
          ) : (
            <Badge radius="sm" color="red">
              Unverified
            </Badge>
          )}

          <Text color="dimmed" size="xs">
            {new Date(props.venue.createdAt).toLocaleString()}
          </Text>
        </Box>
        <Box sx={{ width: 140, textAlign: "center" }}>
          <Progress
            value={(averageRating * 20).toFixed(2)}
            label={`${averageRating.toFixed(2)} / 5`}
            size="xl"
          />
          <Text size="xs" color="dimmed">
            {props.venue.reviews.length} reviews
          </Text>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Badge radius="sm" size="lg">
            {props.venue.saves.length}
          </Badge>
          <Text size="xs" color="dimmed">
            Saves
          </Text>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Badge radius="sm" size="lg">
            Rs. {currentVenueEarning}
          </Badge>
          <Text size="xs" color="dimmed">
            Earned
          </Text>
        </Box>
        <Box>
          <VenueItemMenu venueId={props.venue._id} />
        </Box>
      </Group>
    </Card>
  );
};

export default VenueItem;
