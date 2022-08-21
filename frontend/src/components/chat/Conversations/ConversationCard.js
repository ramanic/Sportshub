import React from "react";
import { Card, Avatar, Text, Box, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const ConversationCard = (props) => {
  const smallScreen = useMediaQuery("(min-width: 768px)");
  const mediumScreen = useMediaQuery("(min-width: 992px)");
  const largeScreen = useMediaQuery("(min-width: 1200px)");
  const xlScreen = useMediaQuery("(min-width: 1400px)");

  const friendInfo = props.conversation.members.find((member) => member._id !== props.userInfo._id);

  return (
    <Card
      withBorder
      mb={mediumScreen ? 18 : 10}
      radius="lg"
      p={mediumScreen ? "xs" : 0}
      sx={(theme) => ({
        cursor: "pointer",
        transition: "all .25s",
        backgroundColor:
          props.conversation._id === props.selectedConversation?._id ? theme.colors.gray[6] : null,
        color: props.conversation._id === props.selectedConversation?._id ? "white" : null,
        "&:hover": {
          backgroundColor:
            props.conversation._id === props.selectedConversation?._id
              ? theme.colors.gray[5]
              : theme.colors.gray[2],
        },
      })}
      onClick={() => props.setSelectedConversation(props.conversation)}
    >
      <Group spacing={xlScreen ? "md" : 4}>
        <Avatar radius="xl" size="sm" src={friendInfo.profile.photo} />
        {largeScreen ? <Text size={xlScreen ? "sm" : "xs"}>{friendInfo.name}</Text> : null}
      </Group>
    </Card>
  );
};

export default ConversationCard;
