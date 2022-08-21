import React from "react";
import { Link } from "react-router-dom";
import { Card, Text, Avatar, Group, Box, Progress, Badge } from "@mantine/core";

const VenueHistoryItem = (props) => {
  return (
    <Card withBorder mb={16} shadow="md">
      <Group position="apart" align="flex-start">
        <Box>
          <Text weight={600} sx={{ textAlign: "center" }} mb={4} color="primary">
            Booked By
          </Text>
          <Group>
            <Avatar
              src={props.history.buyer.profile.photo}
              radius="xl"
              component={Link}
              to={`/profile/${props.history.buyer.username}`}
            />
            <Box>
              <Text component={Link} to={`/profile/${props.history.buyer.username}`}>
                {props.history.buyer.name}
              </Text>
              <Text size="sm" color="dimmed">
                {props.history.buyer.email}
              </Text>
            </Box>
          </Group>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Text weight={600} mb={4} color="primary">
            Booked For
          </Text>
          <Text>{new Date(props.history.date).toLocaleDateString()}</Text>
          <Text>
            {props.history.startTime} - {props.history.endTime}
          </Text>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Text weight={600} mb={4} color="primary">
            Amount
          </Text>
          <Text>Rs. {props.history.totalCost}</Text>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Text weight={600} mb={4} color="primary">
            Booked At
          </Text>
          <Text>{new Date(props.history.createdAt).toLocaleString()}</Text>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Text weight={600} mb={4} color="primary">
            Payment
          </Text>
          <Badge radius="sm" color="primary">
            Khalti
          </Badge>
        </Box>
      </Group>
    </Card>
  );
};

export default VenueHistoryItem;
