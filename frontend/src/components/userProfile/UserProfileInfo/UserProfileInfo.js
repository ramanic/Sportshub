import React from "react";
import { connect } from "react-redux";
import { Title, Text, Avatar, Button, Group, Badge, Card, ActionIcon, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { sendFriendRequest } from "../../../actions/friendActions";

const UserProfileInfo = (props) => {
  const smallScreen = useMediaQuery("(min-width: 768px)");
  const mediumScreen = useMediaQuery("(min-width: 992px)");
  const largeScreen = useMediaQuery("(min-width: 1200px)");

  const sendFriendRequestHandler = () => {
    props.sendFriendRequest(props.userProfile._id, props.user.user_id);
  };

  const foundFriend = props.userProfile.profile.friends.find((el) => el.user == props.user.user_id);

  return (
    <Card withBorder shadow="md" p={smallScreen ? "md" : "xs"}>
      <Group sx={{ alignItems: "center" }} spacing="xs">
        <Avatar src={props.userProfile.profile.photo} size={mediumScreen ? 160 : 90} radius="lg" />

        <Group direction="column" spacing={0} sx={{ maxWidth: 400 }}>
          <Title order={3}>{props.userProfile.name}</Title>
          <Text size="sm" color="secondary">
            @{props.userProfile.username}
          </Text>
          <Text size="sm" color="secondary">
            {props.userProfile.email}
          </Text>
          <Group mt={12}>
            {props.userProfile.profile.preferences.map((pref) => (
              <Badge
                key={pref}
                variant="gradient"
                radius="sm"
                gradient={{ from: "primary", to: "secondary" }}
              >
                {pref}
              </Badge>
            ))}
          </Group>
        </Group>
        <Grid columns={2} sx={{ marginLeft: "auto" }} mr={largeScreen ? 60 : 0}>
          <Grid.Col span={2}>
            <Group direction="column" align="center" spacing="xs">
              <ActionIcon color="primary">
                <Title order={smallScreen ? 2 : 3}>123</Title>
              </ActionIcon>
              <Text size={smallScreen ? "md" : "sm"}>Friends</Text>
              {foundFriend && foundFriend.status === "accepted" ? (
                <Button size={smallScreen ? "sm" : "xs"}>Friends</Button>
              ) : foundFriend &&
                (foundFriend.status === "sent" || foundFriend.status === "received") ? (
                <Button size={smallScreen ? "sm" : "xs"}>Request Sent</Button>
              ) : (
                <Button
                  size={smallScreen ? "sm" : "xs"}
                  onClick={sendFriendRequestHandler}
                  loading={props.sendFriendRequestLoading}
                >
                  Add Friend
                </Button>
              )}
            </Group>
          </Grid.Col>
        </Grid>
        <Group spacing="xl"></Group>
      </Group>
    </Card>
  );
};

export default connect(null, { sendFriendRequest })(UserProfileInfo);
