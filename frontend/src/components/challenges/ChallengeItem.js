import React from "react";
import { connect } from "react-redux";
import { Card, Text, Badge, Avatar, Title, Group, Box, Button } from "@mantine/core";
import { TbSwords } from "react-icons/tb";

import { acceptChallenge } from "../../actions/challengeActions";

const ChallengeItem = (props) => {
  console.log(props.challenge);

  const acceptChallengeHandler = () => {
    props.acceptChallenge(props.challenge._id);
  };

  return (
    <Card withBorder mb={18} sx={{ maxWidth: 700, margin: "auto" }}>
      <Text mb={18} sx={{ textAlign: "center" }}>
        This challenge is held on {props.challenge.venue.name} located in{" "}
        {props.challenge.venue.address.city}, {props.challenge.venue.address.district}
      </Text>
      <Group position="apart">
        <Group direction="column" position="center">
          <Badge radius="sm">Challenger</Badge>
          <Avatar src={props.challenge.challenger.profile.photo} radius="xl" size="lg" />
          <Text mt={-14} size="sm">
            {props.challenge.challenger.name}
          </Text>
          <Text mt={-16} size="sm">
            {props.challenge.challenger.email}
          </Text>
        </Group>
        <Group direction="column" position="center">
          <Box>
            <Text size="sm">
              Venue :{" "}
              <Badge color="dark" radius="sm">
                {props.challenge.venue.name.length > 15
                  ? props.challenge.venue.name.substr(0, 14) + "..."
                  : props.challenge.venue.name}
              </Badge>
            </Text>
          </Box>
          <Box>
            <Text size="sm">
              Sports :{" "}
              <Badge color="dark" radius="sm">
                {props.challenge.venue.category}
              </Badge>
            </Text>
          </Box>
          <Box>
            <Text size="sm">
              Status :{" "}
              {props.challenge.accepted ? (
                <Badge color="green" radius="sm">
                  Accepted
                </Badge>
              ) : (
                <Badge color="red" radius="sm">
                  Pending
                </Badge>
              )}
            </Text>
          </Box>
          {props.challenge.accepted ? (
            <Box>
              <Text size="sm">
                Accepted At :{" "}
                <Badge color="dark" radius="sm">
                  {new Date(props.challenge.acceptedAt).toLocaleDateString()}
                </Badge>
              </Text>
            </Box>
          ) : null}

          <Box>
            <Text size="sm">
              Date :{" "}
              <Badge color="dark" radius="sm">
                {new Date(props.challenge.details.date).toLocaleDateString()}
              </Badge>
            </Text>
          </Box>
          <Box>
            <Text size="sm">
              Time :{" "}
              <Badge color="dark" radius="sm">
                {props.challenge.details.startTime + " - " + props.challenge.details.endTime}
              </Badge>
            </Text>
          </Box>
        </Group>
        {props.challenge.accepted ? (
          <Group direction="column" position="center">
            <Badge radius="sm">Acceptor</Badge>
            <Avatar src={props.challenge.acceptedBy.profile.photo} radius="xl" size="lg" />
            <Text mt={-14} size="sm">
              {props.challenge.acceptedBy.name}
            </Text>
            <Text mt={-16} size="sm">
              {props.challenge.acceptedBy.email}
            </Text>
          </Group>
        ) : (
          <Group direction="column" position="center">
            <Badge radius="sm">Acceptor</Badge>
            <Button
              leftIcon={<TbSwords />}
              loading={props.acceptingChallengeId === props.challenge._id}
              onClick={acceptChallengeHandler}
            >
              Accept
            </Button>
          </Group>
        )}
      </Group>
    </Card>
  );
};

export default connect(null, { acceptChallenge })(ChallengeItem);
