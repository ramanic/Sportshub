import React, { useEffect, useState } from "react";
import { Box } from "@mantine/core";
import { connect } from "react-redux";

import PostCard from "../common/PostCard";
import Loading from "../../common/Loading";
import { getLocalPosts } from "../../../actions/postActions";

const LocalFeed = (props) => {
  useEffect(() => {
    props.getLocalPosts();
  }, []);

  let renderLocalPostsList = <Loading />;
  if (props.localPostItemsLoading && props.localPostItems.length === 0) {
    renderLocalPostsList = <Loading />;
  } else {
    renderLocalPostsList = props.localPostItems.map((item) => (
      <PostCard key={item._id} postItem={item} user={props.user} from="local-list" />
    ));
  }

  return <Box>{renderLocalPostsList}</Box>;
};

const mapStateToProps = (state) => {
  return {
    localPostItems: state.post.localPostItems,
    localPostItemsLoading: state.post.localPostItemsLoading,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getLocalPosts })(LocalFeed);
