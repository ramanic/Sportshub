import React from "react";
import { Grid, Box } from "@mantine/core";

import PostCard from "./PostCard";

const PostsTab = (props) => {
  return (
    <Box mt={16}>
      <Grid columns={12} gutter={36}>
        {props.myPosts.map((post) => (
          <Grid.Col xs={12} md={6} xl={4} key={post._id}>
            <PostCard post={post} from="my-profile" />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default PostsTab;
