import React, { useState, useRef } from "react";
import { Text, Card, TextInput, Avatar, Group } from "@mantine/core";
import { connect } from "react-redux";
import { useMantineColorScheme } from "@mantine/core";
import CreatePostModal from "./CreatePostModal";
import { createAPost } from "../../actions/postActions";

const CreatePost = (props) => {
  const [inputFocused, setInputFocused] = useState(false);
  const { colorScheme } = useMantineColorScheme();

  // let renderCreatePost = <Loading />;
  // if (!props.isAuthenticated || isEmpty(props.userInfo)) {
  //   renderCreatePost = <></>;
  // } else {
  //   renderCreatePost = (

  //   );
  // }

  return (
    <Card
      withBorder={colorScheme === "light"}
      shadow="xl"
      radius="md"
      mb={12}
      sx={(style) => ({
        backgroundColor: style.colorScheme === "dark" ? style.colors.dark[6] : "",
      })}
    >
      <Group>
        <Avatar radius="xl" src={props.userInfo.profile.photo} />

        <Text
          variant="filled"
          sx={(style) => ({
            backgroundColor: style.colorScheme === "dark" ? style.colors.dark[10] : "",
            flexGrow: 1,
            caretColor: "transparent",
            border: "none",
            outline: "none",
          })}
          onClick={() => setInputFocused(true)}
          placeholder=""
        >
          What's on your mind ?
        </Text>
        <CreatePostModal
          inputFocused={inputFocused}
          setInputFocused={setInputFocused}
          userInfo={props.userInfo}
          createAPost={props.createAPost}
          createPostLoading={props.createPostLoading}
        />
      </Group>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userInfo: state.auth.userInfo,
    createPostLoading: state.post.createPostLoading,
  };
};

export default connect(mapStateToProps, { createAPost })(CreatePost);
