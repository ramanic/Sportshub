import React, { useEffect } from "react";
import { connect } from "react-redux";

import MyProfileInfo from "./MyProfileInfo/MyProfileInfo";
import ProfileTabs from "./ProfileTabs/ProfileTabs";
import Loading from "../common/Loading";
import { getMyProfile } from "../../actions/profileActions";
import isEmpty from "../../utils/isEmpty";

const MyProfile = (props) => {
  useEffect(() => {
    props.getMyProfile();
  }, []);

  let renderProfile = <Loading />;

  if (props.profile.myProfileLoading || isEmpty(props.profile.myProfile)) {
    renderProfile = <Loading />;
  } else if (!isEmpty(props.profile.myProfile)) {
    renderProfile = (
      <>
        <MyProfileInfo myProfile={props.profile.myProfile} />
        <ProfileTabs
          myProfile={props.profile.myProfile}
          myPosts={props.profile.myPosts}
          completeMyProfileLoading={props.profile.completeMyProfileLoading}
        />
      </>
    );
  }
  return <>{renderProfile}</>;
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getMyProfile })(MyProfile);
