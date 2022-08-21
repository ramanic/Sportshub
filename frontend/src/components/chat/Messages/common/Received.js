import React from "react";
import { Avatar, Text, Box, Group } from "@mantine/core";

import timeSince from "../../../../utils/timeSince";

const Received = (props) => {
  return (
    <Group position="right" mb={12} ref={props.innerRef}>
      <Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[1],
            borderRadius: 10,
            fontSize: "90%",
          })}
          px={16}
          py={12}
        >
          {props.message.text}
        </Box>
        <Text size="xs" color="dimmed" sx={{ textAlign: "right" }}>
          {timeSince(new Date(props.message.createdAt))}
        </Text>
      </Box>

      <Avatar radius="xl" src={props.message.sender.profile.photo} />
    </Group>
  );
};

export default Received;
