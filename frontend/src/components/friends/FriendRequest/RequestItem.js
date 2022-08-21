import React from "react";
import { Card, Box, Group, Avatar, Button, Title, Text, Badge } from "@mantine/core";
import { connect } from "react-redux";

import { acceptFriendRequest } from "../../../actions/friendActions";

const RequestItem = (props) => {
  const acceptFriendRequestHandler = () => {
    props.acceptFriendRequest(props.request.user._id);
  };
  console.log(props);
  return (
    <Card withBorder sx={{ maxWidth: 700, margin: "auto" }} mb={12}>
      <Group position="apart">
        <Group>
          <Avatar src={props.request.user.profile.photo} radius="xl" size="lg" />
          <Box>
            <Text weight={600}>{props.request.user.name}</Text>
            <Text size="sm">{props.request.user.email}</Text>
          </Box>
        </Group>

        <Box>
          <Badge radius="sm">received {new Date(props.request.sent).toLocaleString()}</Badge>
        </Box>
        <Box>
          <Button
            size="xs"
            onClick={acceptFriendRequestHandler}
            loading={props.acceptFriendRequestLoading}
          >
            Accept
          </Button>
        </Box>
      </Group>
    </Card>
  );
};

export default connect(null, { acceptFriendRequest })(RequestItem);
