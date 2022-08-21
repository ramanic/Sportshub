import React from "react";
import { Card, Box, Group, Avatar, Button, Title, Text, Badge } from "@mantine/core";

const SentItem = (props) => {
  return (
    <Card withBorder sx={{ maxWidth: 700, margin: "auto" }} mb={12}>
      <Group position="apart">
        <Group>
          <Avatar src={props.sent.user.profile.photo} radius="xl" size="lg" />
          <Box>
            <Text weight={600}>{props.sent.user.name}</Text>
            <Text size="sm">{props.sent.user.email}</Text>
          </Box>
        </Group>

        <Box>
          <Badge radius="sm">sent {new Date(props.sent.sent).toLocaleString()}</Badge>
        </Box>
        {/* <Box>
          <Button size="xs">Accept</Button>
        </Box> */}
      </Group>
    </Card>
  );
};

export default SentItem;
