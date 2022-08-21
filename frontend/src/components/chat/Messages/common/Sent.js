import React from "react";
import { Avatar, Text, Box, Group } from "@mantine/core";

import timeSince from "../../../../utils/timeSince";

const Sent = (props) => {
  return (
    <Group mb={12} ref={props.innerRef}>
      <Avatar radius="xl" src={props.message.sender.profile.photo} />
      <Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.primary[5],
            borderRadius: 10,
            color: "white",
            fontSize: "90%",
            maxWidth: 400,
          })}
          px={16}
          py={12}
        >
          {props.message.text}
        </Box>
        <Text size="xs" color="dimmed">
          {timeSince(new Date(props.message.createdAt))}
        </Text>
      </Box>
    </Group>
  );
};

export default Sent;
