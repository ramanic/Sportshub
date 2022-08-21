import React from "react";
import {
  Title,
  Text,
  Avatar,
  Button,
  Box,
  Group,
  Badge,
  Card,
  ActionIcon,
  Grid,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const MyProfileInfo = (props) => {
  const smallScreen = useMediaQuery("(min-width: 768px)");
  const mediumScreen = useMediaQuery("(min-width: 992px)");
  const largeScreen = useMediaQuery("(min-width: 1200px)");

  let myFriends = 0;

  props.myProfile.profile.friends.map((el) => {
    if (el.status === "accepted") {
      myFriends += 1;
    }
  });

  return (
    <Card withBorder shadow="md" p={smallScreen ? "md" : "xs"}>
      <Group sx={{ alignItems: "center" }} spacing="xs">
        <Avatar src={props.myProfile.profile.photo} size={mediumScreen ? 160 : 90} radius="lg" />

        <Group direction="column" spacing={0} sx={{ maxWidth: 400 }}>
          <Title order={3}>{props.myProfile.name}</Title>
          <Text size="sm" color="secondary">
            @{props.myProfile.username}
          </Text>
          <Text size="sm" color="secondary">
            {props.myProfile.email}
          </Text>
          <Group mt={12}>
            {props.myProfile.profile.preferences &&
              props.myProfile.profile.preferences.map((pref) => (
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
                <Title order={smallScreen ? 2 : 3}>{myFriends}</Title>
              </ActionIcon>
              <Text size={smallScreen ? "md" : "sm"}>Friends</Text>
            </Group>
          </Grid.Col>
        </Grid>
      </Group>
    </Card>
  );
};

export default MyProfileInfo;
