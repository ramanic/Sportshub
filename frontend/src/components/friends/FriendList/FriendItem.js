import React from "react";
import { connect } from "react-redux";
import { Card, Box, Group, Avatar, Button, Title, Text, Badge } from "@mantine/core";

import { removeFriend } from "../../../actions/friendActions";

const FriendItem = (props) => {
  const removeFriendHandler = () => {
    props.removeFriend(props.friend.user._id);
  };

  return (
    <Card withBorder sx={{ maxWidth: 700, margin: "auto" }} mb={12}>
      <Group position="apart">
        <Group>
          <Avatar src={props.friend.user.profile.photo} radius="xl" size="lg" />
          <Box>
            <Text weight={600}>{props.friend.user.name}</Text>
            <Text size="sm">{props.friend.user.email}</Text>
          </Box>
        </Group>

        <Box>
          {/* <Badge radius="sm">{props.friend.user.role}</Badge> */}
          <Badge radius="sm">accepted {new Date(props.friend.accepted).toLocaleString()}</Badge>
        </Box>
        <Box>
          <Button size="xs" onClick={removeFriendHandler}>
            Remove
          </Button>
        </Box>
      </Group>
    </Card>
  );
};

export default connect(null, { removeFriend })(FriendItem);
