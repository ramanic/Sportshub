import React from "react";
import { Link } from "react-router-dom";
import { Modal, Group, Text, Card, Avatar } from "@mantine/core";

const ContentModal = (props) => {
  if (props.title === "Likers") {
    return (
      <Modal
        opened={props.opened}
        onClose={() => props.setOpened(false)}
        title={<Text weight={600}>{props.title}</Text>}
        centered
      >
        <Group direction="column"></Group>
        {props.content &&
          props.content.map((el) => (
            <Card
              key={el._id}
              withBorder
              mb={12}
              component={Link}
              to={`/profile/${el.username}`}
              sx={(theme) => ({
                transition: "all .3s",
                "&:hover": {
                  backgroundColor: theme.colors.gray[3],
                },
              })}
            >
              <Group>
                <Avatar src={el.profile.photo} radius="xl" />
                <Group>
                  <Text>{el.name}</Text>
                </Group>
              </Group>
            </Card>
          ))}
      </Modal>
    );
  } else if (props.title === "Commenters") {
    return (
      <Modal
        opened={props.opened}
        onClose={() => props.setOpened(false)}
        title={<Text weight={600}>{props.title}</Text>}
        centered
      >
        <Group direction="column"></Group>
        {props.content &&
          props.content.map((el) => (
            <Card
              key={el._id}
              withBorder
              mb={12}
              component={Link}
              to={`/profile/${el.author.username}`}
              sx={(theme) => ({
                transition: "all .3s",
                "&:hover": {
                  backgroundColor: theme.colors.gray[3],
                },
              })}
            >
              <Group>
                <Avatar src={el.author.profile.photo} radius="xl" />
                <Group>
                  <Text>{el.author.name}</Text>
                </Group>
              </Group>
            </Card>
          ))}
      </Modal>
    );
  } else if (props.title === "Savers") {
    return (
      <Modal
        opened={props.opened}
        onClose={() => props.setOpened(false)}
        title={<Text weight={600}>{props.title}</Text>}
        centered
      >
        <Group direction="column"></Group>
        {props.content &&
          props.content.map((el) => (
            <Card
              key={el._id}
              withBorder
              mb={12}
              component={Link}
              to={`/profile/${el.username}`}
              sx={(theme) => ({
                transition: "all .3s",
                "&:hover": {
                  backgroundColor: theme.colors.gray[3],
                },
              })}
            >
              <Group>
                <Avatar src={el.profile.photo} radius="xl" />
                <Group>
                  <Text>{el.name}</Text>
                </Group>
              </Group>
            </Card>
          ))}
      </Modal>
    );
  } else {
    return <Text></Text>;
  }
};

export default ContentModal;
