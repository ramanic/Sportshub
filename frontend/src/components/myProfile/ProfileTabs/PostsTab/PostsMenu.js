import React from "react";
import { Menu, Text, useMantineTheme } from "@mantine/core";
import { IoTrashBinOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { connect } from "react-redux";

import { deletePost } from "../../../../actions/postActions";

const PostsMenu = (props) => {
  const theme = useMantineTheme();

  const deletePostHandler = () => {
    props.deletePost(props.postId);
  };

  return (
    <Menu
      control={
        <Text sx={{ color: theme.colors.primary[6] }}>
          <IoEllipsisHorizontal size={18} />
        </Text>
      }
      sx={{ marginLeft: "auto", cursor: "pointer" }}
    >
      <Menu.Item color="red" icon={<IoTrashBinOutline size={16} />} onClick={deletePostHandler}>
        Delete
      </Menu.Item>
    </Menu>
  );
};

export default connect(null, { deletePost })(PostsMenu);
