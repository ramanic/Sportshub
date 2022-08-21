import React from "react";

import PostCard from "./PostCard";

const PostContent = (props) => {
  return <PostCard postItem={props.currentPost} user={props.user} from={props.from} />;
};

export default PostContent;
