import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import UserProfileInfo from "./UserProfileInfo/UserProfileInfo";
import UserProfileTabs from "./UserProfileTabs/UserProfileTabs";
import Loading from "../common/Loading";
import { getUserProfile } from "../../actions/profileActions";
import isEmpty from "../../utils/isEmpty";

const UserProfile = (props) => {
  const params = useParams();

  useEffect(() => {
    props.getUserProfile(params.username);
  }, []);

  let renderUserProfile = <Loading />;

  if (props.userProfileLoading || isEmpty(props.userProfile)) {
    renderUserProfile = <Loading />;
  } else if (!isEmpty(props.userProfile)) {
    renderUserProfile = (
      <>
        <UserProfileInfo
          userProfile={props.userProfile}
          sendFriendRequestLoading={props.sendFriendRequestLoading}
          user={props.user}
        />
        <UserProfileTabs
          userProfile={props.userProfile}
          userPosts={props.userPosts}
          user={props.user}
        />
      </>
    );
  }

  return <>{renderUserProfile}</>;
};

const mapStateToProps = (state) => {
  return {
    userProfile: state.profile.userProfile.user,
    userPosts: state.profile.userProfile.posts,
    userProfileLoading: state.profile.userProfileLoading,
    user: state.auth.user,
    sendFriendRequestLoading: state.friend.sendFriendRequestLoading,
  };
};

export default connect(mapStateToProps, { getUserProfile })(UserProfile);
