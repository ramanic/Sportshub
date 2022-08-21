import React, { useState } from "react";
import { Menu, Text, useMantineTheme } from "@mantine/core";
import {
  IoEllipsisHorizontal,
  IoHeartOutline,
  IoChatbubbleEllipsesOutline,
  IoBookmarkOutline,
} from "react-icons/io5";
import ContentModal from "./ContentModal";

const PostMenu = (props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [contentTitle, setContentTitle] = useState("");
  const [content, setContent] = useState(null);

  const likersClickHandler = () => {
    setContentTitle("Likers");
    setContent(props.likers);
    setOpened(true);
  };
  const commentersClickHandler = () => {
    setContentTitle("Commenters");
    setContent(props.commenters);
    setOpened(true);
  };

  const saversClickHandler = () => {
    setContentTitle("Savers");
    setContent(props.savers);
    setOpened(true);
  };

  return (
    <Menu
      control={
        <Text sx={{ color: theme.colors.primary[6], cursor: "pointer" }}>
          <IoEllipsisHorizontal size={18} />
        </Text>
      }
      closeOnItemClick={false}
    >
      <Menu.Item icon={<IoHeartOutline />} onClick={likersClickHandler}>
        Likers
      </Menu.Item>
      <Menu.Item icon={<IoChatbubbleEllipsesOutline />} onClick={commentersClickHandler}>
        Commenters
      </Menu.Item>
      <Menu.Item icon={<IoBookmarkOutline />} onClick={saversClickHandler}>
        Savers
      </Menu.Item>
      <ContentModal opened={opened} setOpened={setOpened} title={contentTitle} content={content} />
    </Menu>
  );
};

export default PostMenu;
