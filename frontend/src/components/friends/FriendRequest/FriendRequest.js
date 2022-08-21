import React, { useEffect } from "react";
import { Card, Text } from "@mantine/core";
import { connect } from "react-redux";

import RequestItem from "./RequestItem";
import Loading from "../../common/Loading";
import { getFriendRequests } from "../../../actions/friendActions";

const FriendRequest = (props) => {
  useEffect(() => {
    props.getFriendRequests();
  }, []);

  let renderFriendRequests = <Loading />;

  if (props.friendRequestsLoading && props.friendRequests.length === 0) {
    renderFriendRequests = <Loading />;
  } else if (props.friendRequests.length === 0) {
    renderFriendRequests = <Text>You have no friend requests</Text>;
  } else if (props.friendRequests.length > 0) {
    renderFriendRequests = props.friendRequests.map((request) => (
      <RequestItem
        key={request._id}
        request={request}
        acceptFriendRequestLoading={props.acceptFriendRequestLoading}
      />
    ));
  }

  return (
    <Card withBorder shadow="md">
      {renderFriendRequests}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    friendRequests: state.friend.friendRequests,
    friendRequestsLoading: state.friend.friendRequestsLoading,
    acceptFriendRequestLoading: state.friend.acceptFriendRequestLoading,
  };
};

export default connect(mapStateToProps, { getFriendRequests })(FriendRequest);
