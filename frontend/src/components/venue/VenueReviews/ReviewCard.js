import React from "react";
import { Link } from "react-router-dom";
import { Card, Text, Avatar, Group, Progress } from "@mantine/core";

import timeSince from "../../../utils/timeSince";

const ReviewCard = (props) => {
  return (
    <Card withBorder shadow="md" mb={14}>
      <Group>
        <Avatar
          src={props.review.user.profile.photo}
          alt={props.review.user.username}
          radius="xl"
          component={Link}
          to={`/profile/${props.review.user.username}`}
        />
        <div>
          <Group>
            <Text component={Link} to={`/profile/${props.review.user.username}`}>
              {props.review.user.name}
            </Text>
            <Text
              component={Link}
              to={`/profile/${props.review.user.username}`}
              color="dimmed"
              size="xs"
              ml={-8}
            >
              @{props.review.user.username}
            </Text>
          </Group>
          <Text size="xs" color="dimmed">
            {timeSince(new Date(props.review.reviewedAt))}
          </Text>
        </div>
      </Group>
      <Group mt={16}>
        <Progress
          value={props.review.reviewNumber * 20}
          label={`${props.review.reviewNumber} / 5`}
          size="xl"
          sx={{ width: "50%" }}
        />
      </Group>
      <Group mt={16}>
        <Text>{props.review.reviewText}</Text>
      </Group>
    </Card>
  );
};

export default ReviewCard;
