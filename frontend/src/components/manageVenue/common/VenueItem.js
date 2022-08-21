import React from "react";
import { Card, Text, Title, Image, Box, Button, Badge, Group, Progress } from "@mantine/core";

const VenueItem = (props) => {
  return (
    <Card shadow={0} withBorder mb={20}>
      <Group position="apart">
        <Group>
          <Image src={props.currentVenue.images[0]} radius="sm" width={120} height={80} />
          <Box>
            <Text weight={600}>{props.currentVenue.name}</Text>
            <Text size="xs" color="dimmed">
              {props.currentVenue.address.city + " ," + props.currentVenue.address.district}
            </Text>
            <Badge radius="sm" color="secondary" my={10}>
              {props.currentVenue.category}
            </Badge>
          </Box>
        </Group>

        <Box sx={{ textAlign: "center" }}>
          {props.currentVenue.verified ? (
            <Badge radius="sm" color="primary">
              Verified
            </Badge>
          ) : (
            <Badge radius="sm" color="red">
              Unverified
            </Badge>
          )}
          <Text color="dimmed" size="xs">
            {new Date(props.currentVenue.createdAt).toLocaleString()}
          </Text>
        </Box>
        <Box sx={{ width: 140, textAlign: "center" }}>
          <Progress value={86} label="4.4 / 5" size="xl" />
          <Text size="xs" color="dimmed">
            120 reviews
          </Text>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Badge radius="sm" size="lg">
            140
          </Badge>
          <Text size="xs" color="dimmed">
            Bookings
          </Text>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Badge radius="sm" size="lg">
            Rs. 25040
          </Badge>
          <Text size="xs" color="dimmed">
            Earned
          </Text>
        </Box>
      </Group>
    </Card>
  );
};

export default VenueItem;
