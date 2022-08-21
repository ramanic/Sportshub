import React from "react";

import CommentsList from "./CommentsList";

const PostComments = (props) => {
  return <CommentsList comments={props.comments} />;
};

export default PostComments;
