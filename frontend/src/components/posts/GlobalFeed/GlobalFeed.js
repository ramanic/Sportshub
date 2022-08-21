import React, { useEffect, useState, useRef, useCallback } from "react";
import { Box } from "@mantine/core";
import { connect } from "react-redux";

import Loading from "../../common/Loading";
import PostCard from "../common/PostCard";
import { getAllPosts, removeAllPosts } from "../../../actions/postActions";

const GlobalFeed = (props) => {
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (props.postItemsLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageNumber < props.totalPages) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [props.postItemsLoading]
  );

  useEffect(() => {
    props.getAllPosts(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    return () => {
      props.removeAllPosts();
    };
  }, []);

  let renderPostsList = <Loading />;

  if (props.postItemsLoading && props.postItems.length === 0) {
    renderPostsList = <Loading />;
  } else if (props.postItems.length > 0) {
    // Sort posts according to user preferences
    // let newPosts = [...props.postItems];
    // let matchedPosts = [];
    // let unmatchedPosts = [];

    // if (props.userInfo?.profile?.preferences?.length > 0) {
    //   console.log(props.postItems);
    //   const userPreferences = props.userInfo.profile.preferences;

    //   props.postItems.forEach((post, index) => {
    //     if (post.tags.length === 0) {
    //       unmatchedPosts.push(post);
    //     } else {
    //       const postTags = post.tags;

    //       let found = userPreferences.some((el) => postTags.includes(el));
    //       if (found) {
    //         matchedPosts.push(post);
    //       } else {
    //         unmatchedPosts.push(post);
    //       }
    //     }
    //   });

    //   console.log("MATCHED", matchedPosts);
    //   console.log("UNMATCHED", unmatchedPosts);

    //   newPosts = [...matchedPosts, ...unmatchedPosts];
    // }

    renderPostsList = props.postItems.map((item, index) => {
      if (props.postItems.length === index + 1) {
        return (
          <PostCard
            key={item._id}
            innerRef={lastPostElementRef}
            postItem={item}
            user={props.user}
            from="list"
          />
        );
      } else {
        return <PostCard key={item._id} postItem={item} user={props.user} from="list" />;
      }
    });
  }

  return (
    <Box>
      {renderPostsList}
      {props.postItemsLoading && props.postItems.length > 0 ? <Loading /> : null}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    postItems: state.post.postItems,
    postItemsLoading: state.post.postItemsLoading,
    totalPages: state.post.totalPages,
    user: state.auth.user,
    userInfo: state.auth.userInfo,
  };
};

export default connect(mapStateToProps, { getAllPosts, removeAllPosts })(GlobalFeed);
