import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Group, Text, Button, Box, Card, ActionIcon } from "@mantine/core";
import { IoPersonAddOutline } from "react-icons/io5";

const UserContentItem = (props) => {
  return (
    <Card
      withBorder
      mb={8}
      py="xs"
      px="xs"
      sx={(style) => ({
        backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
      })}
    >
      <Group spacing="xs">
        <Avatar src={props.user.profile.photo} radius="xl" />
        <Box>
          <Text
            variant="gradient"
            size="xs"
            weight={700}
            gradient={{ from: "primary", to: "secondary" }}
            component={Link}
            to={`/profile/${props.user.username}`}
          >
            {props.user.name}
          </Text>
          <Text size="xs" color="dimmed">
            @{props.user.username}
          </Text>
        </Box>
        {/* <ActionIcon variant="hover" color="primary" sx={{ marginLeft: "auto" }}>
          <IoPersonAddOutline />
        </ActionIcon> */}
      </Group>
    </Card>
  );
};

export default UserContentItem;
