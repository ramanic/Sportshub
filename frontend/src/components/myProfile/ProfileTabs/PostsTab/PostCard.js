import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Divider,
  Badge,
  useMantineTheme,
} from "@mantine/core";
import {
  IoHeartOutline,
  IoHeart,
  IoChatbubbleEllipsesOutline,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";

import PostsMenu from "./PostsMenu";
import PostCardImageSwiper from "./PostCardImageSwiper";
import timeSince from "../../../../utils/timeSince";
import { toggleLike, togglePostSave } from "../../../../actions/postActions";

const PostCard = (props) => {
  const theme = useMantineTheme();

  // Check if the user has liked the post
  const isLiked = () => {
    if (props.post.likes.filter((like) => like._id === props.post.author._id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Check if the user has already saved this post
  const isSaved = () => {
    if (props.post.saves.filter((save) => save._id === props.post.author._id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Handle liking of posts
  const onLikeHandler = () => {
    props.toggleLike(props.post._id, props.from);
  };

  // Handle saving of posts
  const onSaveHandler = () => {
    props.togglePostSave(props.post._id, props.from);
  };

  return (
    <Card
      withBorder
      radius="md"
      shadow="md"
      sx={(style) => ({
        backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
      })}
    >
      <Card.Section mb={10} px="lg">
        <Group mt="lg">
          <Avatar
            src={props.post.author.profile.photo}
            radius="xl"
            component={Link}
            to={`/profile/${props.post.author.username}`}
          />
          <div>
            <Text
              weight={600}
              color="primary"
              component={Link}
              to={`/profile/${props.post.author.username}`}
            >
              {props.post.author.name}{" "}
              <span style={{ opacity: "50%", fontSize: "80%" }}>@{props.post.author.username}</span>
            </Text>

            <Text size="xs" color="dimmed">
              {timeSince(new Date(props.post.createdAt))}
            </Text>
          </div>
          <PostsMenu postId={props.post._id} />
        </Group>
      </Card.Section>
      <Divider />
      <Card.Section my={8} px="lg">
        {props.post.tags.length > 0 ? (
          <Text mt={4}>
            {props.post.tags.map((tag) => (
              <Badge key={tag} mb={8} color="secondary" radius="sm" mr={8}>
                {tag}
              </Badge>
            ))}
          </Text>
        ) : null}
        <Text size="sm">{props.post.caption}</Text>
        {props.post.images.length > 0 ? (
          <PostCardImageSwiper height={220} images={props.post.images} />
        ) : null}
      </Card.Section>
      {/* <Divider /> */}
      <Card.Section my={6} px="lg">
        <Group position="apart">
          <Group spacing={2}>
            <Text color="primary">{props.post.likes.length}</Text>
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
            <Text color="secondary">{props.post.comments.length}</Text>
            <ActionIcon
              size="lg"
              variant="hover"
              color="secondary"
              p={5}
              radius="xl"
              component={Link}
              to={`/post/${props.post._id}`}
            >
              <IoChatbubbleEllipsesOutline size={26} color={theme.colors.secondary[6]} />
            </ActionIcon>
          </Group>
          <Group spacing={2}>
            <Text color="pink">{props.post.saves.length}</Text>
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
