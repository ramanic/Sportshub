import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Text } from "@mantine/core";

import OnlineUser from "./OnlineUser";
import Loading from "../../common/Loading";
import { getFollowedUsers, getCreateConversation } from "../../../actions/chatActions";

const OnlineUsers = (props) => {
  useEffect(() => {
    props.getFollowedUsers();
  }, []);

  let renderFollowedUsers = <Loading />;
  if (props.followedUsersLoading) {
    renderFollowedUsers = <Loading />;
  } else {
    renderFollowedUsers = props.followedUsers.map((user) => (
      <OnlineUser
        key={user._id}
        followedUser={user.user}
        onlineUsers={props.onlineUsers}
        getCreateConversation={props.getCreateConversation}
        userInfo={props.userInfo}
        setOpened={props.setOpened}
      />
    ));
  }
  return (
    <Modal
      opened={props.opened}
      onClose={() => props.setOpened(false)}
      title={<Text weight={600}>Currently Online Users</Text>}
    >
      {renderFollowedUsers}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    followedUsers: state.chat.followedUsers,
    followedUsersLoading: state.chat.followedUsersLoading,
  };
};

export default connect(mapStateToProps, { getFollowedUsers, getCreateConversation })(OnlineUsers);
