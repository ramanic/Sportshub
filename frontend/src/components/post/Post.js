import React, { useEffect } from "react";
import { Card } from "@mantine/core";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import PostContent from "./PostContent/PostContent";
import NewCommentForm from "./PostComments/NewComentForm";
import PostComments from "./PostComments/PostComments";
import Loading from "../common/Loading";
import { getAPost } from "../../actions/postActions";

const Post = (props) => {
  const params = useParams();

  useEffect(() => {
    props.getAPost(params.postId);
  }, []);

  let renderPost = <Loading />;

  if (props.currentPostLoading || !props.currentPost) {
    renderPost = <Loading />;
  } else if (props.currentPost) {
    renderPost = (
      <>
        <PostContent currentPost={props.currentPost} user={props.user} from="single" />
        <NewCommentForm
          postId={props.currentPost._id}
          addCommentLoading={props.addCommentLoading}
        />
        <PostComments comments={props.currentPost.comments} />
      </>
    );
  }

  return (
    <Card withBorder shadow="md" radius="md">
      {renderPost}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPost: state.post.currentPost,
    currentPostLoading: state.post.currentPostLoading,
    addCommentLoading: state.post.addCommentLoading,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getAPost })(Post);
