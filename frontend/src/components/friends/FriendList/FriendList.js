import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Box, Avatar, Title, Text, Badge, Button } from "@mantine/core";

import FriendItem from "./FriendItem";
import Loading from "../../common/Loading";
import { getFriends } from "../../../actions/friendActions";

const FriendList = (props) => {
  useEffect(() => {
    props.getFriends();
  }, []);

  let renderFriends = <Loading />;

  if (props.friendsLoading && props.friends.length === 0) {
    renderFriends = <Loading />;
  } else if (props.friends.length === 0) {
    renderFriends = <Text>You currently have no friends</Text>;
  } else if (props.friends.length > 0) {
    renderFriends = props.friends.map((friend) => <FriendItem key={friend._id} friend={friend} />);
  }

  return (
    <Card withBorder shadow="md">
      {renderFriends}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    friends: state.friend.friends,
    friendsLoading: state.friend.friendsLoading,
  };
};

export default connect(mapStateToProps, { getFriends })(FriendList);
