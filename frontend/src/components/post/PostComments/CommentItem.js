import React from "react";
import { Text, Avatar, Group, Paper, Card } from "@mantine/core";

import timeSince from "../../../utils/timeSince";

const CommentItem = (props) => {
  return (
    <Card withBorder radius="md" mb={16} p={10}>
      <Group>
        <Avatar src={props.comment.author.profile.photo} radius="xl" />
        <div>
          <Text>
            {props.comment.author.name}{" "}
            <span style={{ opacity: "65%", fontSize: "80%" }}>
              @{props.comment.author.username}
            </span>
          </Text>

          <Text size="xs" color="dimmed">
            {timeSince(new Date(props.comment.createdAt))}
          </Text>
        </div>
      </Group>
      <Text size="sm" mt={10}>
        {props.comment.comment}
      </Text>
    </Card>
  );
};

export default CommentItem;
