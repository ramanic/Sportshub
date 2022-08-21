import React from "react";
import { Card, Group, Avatar, Text, Box } from "@mantine/core";

const OnlineUser = (props) => {
  const isOnlineIndex = props.onlineUsers.findIndex(
    (user) => user.userId === props.followedUser._id
  );

  const createConvHandler = () => {
    props.getCreateConversation(
      {
        senderId: props.userInfo._id,
        receiverId: props.followedUser._id,
      },
      props.setOpened
    );
  };

  return (
    <Card
      withBorder
      mb={12}
      sx={(theme) => ({
        cursor: "pointer",
        transition: "all .25s",
        "&:hover": {
          // backgroundColor: theme.colors.gray[3],
          backgroundColor: theme.colors.primary[2],
        },
      })}
      onClick={createConvHandler}
    >
      <Group align="center">
        <Box sx={{ position: "relative" }}>
          <Avatar src={props.followedUser.profile.photo} size="sm" radius="xl" />
          {isOnlineIndex >= 0 ? (
            <Box
              sx={(theme) => ({
                backgroundColor: theme.colors.green[6],
                height: 8,
                width: 8,
                borderRadius: "50%",
                position: "absolute",
                top: 0,
                right: -4,
              })}
            ></Box>
          ) : null}
        </Box>

        <Text size="sm">{props.followedUser.name}</Text>
      </Group>
    </Card>
  );
};

export default OnlineUser;
