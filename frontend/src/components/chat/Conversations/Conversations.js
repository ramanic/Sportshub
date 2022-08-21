import React from "react";
import { Card, Text, ScrollArea, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import ConversationCard from "./ConversationCard";

const Conversations = (props) => {
  const smallScreen = useMediaQuery("(min-width: 768px)");
  const mediumScreen = useMediaQuery("(min-width: 992px)");
  const largeScreen = useMediaQuery("(min-width: 1200px)");
  const xlScreen = useMediaQuery("(min-width: 1400px)");

  return (
    <Card withBorder shadow="md" p={xlScreen ? "lg" : "xs"}>
      <Button onClick={() => props.setOpened(true)} variant="light" fullWidth mb={20}>
        Online Users
      </Button>
      {mediumScreen ? (
        <Text mb={10} weight={700} size={largeScreen ? "md" : "sm"}>
          Conversations
        </Text>
      ) : null}
      <ScrollArea sx={{ height: "74vh" }}>
        {props.allConversations.map((conversation) => (
          <ConversationCard
            key={conversation._id}
            conversation={conversation}
            userInfo={props.userInfo}
            selectedConversation={props.selectedConversation}
            setSelectedConversation={props.setSelectedConversation}
          />
        ))}
      </ScrollArea>
    </Card>
  );
};

export default Conversations;
