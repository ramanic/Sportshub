import React from "react";
import { Link } from "react-router-dom";
import { Card, Group, Text, Box, Badge, Avatar, Image } from "@mantine/core";

const PopularEventItem = (props) => {
  console.log(props);
  return (
    <Card withBorder p="xs" mb={12}>
      <Group>
        <Image src={props.venue.images[0]} radius="xs" height={50} width={60} />
        <Box>
          <Text weight={600} size="sm" component={Link} to={`/venue/${props.venue._id}`}>
            {props.venue.name}
          </Text>
          <Text size="xs" color="dimmed">
            {props.venue.address.district + ", " + props.venue.address.city}
          </Text>
        </Box>
      </Group>
    </Card>
  );
};

export default PopularEventItem;
