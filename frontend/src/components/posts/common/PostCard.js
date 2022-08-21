import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Card,
  Image,
  ActionIcon,
  Text,
  Avatar,
  Badge,
  Divider,
  Box,
  Group,
  useMantineTheme,
} from "@mantine/core";
import {
  IoHeartOutline,
  IoHeart,
  IoChatbubbleEllipsesOutline,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";

import PostCardImageSwiper from "./PostCardImageSwiper";
import timeSince from "../../../utils/timeSince";
import { toggleLike, togglePostSave } from "../../../actions/postActions";

const PostCard = (props) => {
  const theme = useMantineTheme();

  // Check if the user has liked the post
  const isLiked = () => {
    if (props.postItem.likes.filter((like) => like._id === props.user.user_id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Check if the user has already saved this post
  const isSaved = () => {
    if (props.postItem.saves.filter((save) => save._id === props.user.user_id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Handle liking of posts
  const onLikeHandler = () => {
    props.toggleLike(props.postItem._id, props.from);
  };

  // Handle saving of posts
  const onSaveHandler = () => {
    props.togglePostSave(props.postItem._id, props.from);
  };

  return (
    <Card
      ref={props.innerRef}
      withBorder
      radius="md"
      shadow="md"
      sx={(style) => ({
        maxWidth: 600,
        margin: "20px auto",
        backgroundColor: style.colorScheme === "dark" ? style.colors.dark[6] : "",
      })}
    >
      <Card.Section mb={10} px="lg">
        <Group mt="lg">
          <Avatar
            src={props.postItem.author.profile.photo}
            radius="xl"
            component={Link}
            to={`/profile/${props.postItem.author.username}`}
          />
          <div>
            <Text
              weight={600}
              color="primary"
              component={Link}
              to={`/profile/${props.postItem.author.username}`}
            >
              {props.postItem.author.name}{" "}
              <span style={{ opacity: "65%", fontSize: "80%" }}>
                @{props.postItem.author.username}
              </span>
            </Text>
            <Text size="xs" color="dimmed">
              {timeSince(new Date(props.postItem.createdAt))}
            </Text>
          </div>
        </Group>
      </Card.Section>
      <Divider />
      <Card.Section my={8} px="lg">
        {props.postItem.tags.length > 0 ? (
          <Text mt={4}>
            {props.postItem.tags.map((tag) => (
              <Badge key={tag} color="secondary" radius="sm" mr={8}>
                {tag}
              </Badge>
            ))}
          </Text>
        ) : null}
        <Text size="sm" mt={8}>
          {props.postItem.caption ? props.postItem.caption : null}
        </Text>

        {props.postItem.images.length > 0 ? (
          <PostCardImageSwiper height={280} images={props.postItem.images} />
        ) : null}
      </Card.Section>
      <Divider />
      <Card.Section my={6} px="lg">
        <Group position="apart">
          <Group spacing={2}>
            <Text color="primary">{props.postItem.likes.length}</Text>

            {isLiked() ? (
              <ActionIcon
                size="lg"
                variant="hover"
                color="primary"
                p={5}
                radius="xl"
                onClick={onLikeHandler}
              >
                <IoHeart size={26} color={theme.colors.primary[6]} />
              </ActionIcon>
            ) : (
              <ActionIcon
                size="lg"
                variant="hover"
                color="primary"
                p={5}
                radius="xl"
                onClick={onLikeHandler}
              >
                <IoHeartOutline size={26} color={theme.colors.primary[6]} />
              </ActionIcon>
            )}
          </Group>
          <Group spacing={4}>
            <Text color="secondary">{props.postItem.comments.length}</Text>
            <ActionIcon
              size="lg"
              variant="hover"
              color="secondary"
              p={5}
              radius="xl"
              component={Link}
              to={`/post/${props.postItem._id}`}
            >
              <IoChatbubbleEllipsesOutline size={26} color={theme.colors.secondary[6]} />
            </ActionIcon>
          </Group>
          <Group spacing={2}>
            <Text color="pink">{props.postItem.saves.length}</Text>
            {isSaved() ? (
              <ActionIcon
                size="lg"
                variant="hover"
                color="indigo"
                p={5}
                radius="xl"
                onClick={onSaveHandler}
              >
                <IoBookmark size={26} color={theme.colors.pink[7]} />
              </ActionIcon>
            ) : (
              <ActionIcon
                size="lg"
                variant="hover"
                color="indigo"
                p={5}
                radius="xl"
                onClick={onSaveHandler}
              >
                <IoBookmarkOutline size={26} color={theme.colors.pink[7]} />
              </ActionIcon>
            )}
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default connect(null, { toggleLike, togglePostSave })(PostCard);
