import React from "react";
import { Navbar, ScrollArea } from "@mantine/core";
import { connect } from "react-redux";

import MainLinks from "./MainLinks/MainLinks";
import AuthButtons from "./AuthButtons/AuthButtons";
import UserInfo from "./UserInfo/UserInfo";
import isEmpty from "../../../utils/isEmpty";

const Sidebar = (props) => {
  return (
    <Navbar width={{ sm: 200, lg: 300 }} p="xs" hiddenBreakpoint="sm" hidden={!props.opened}>
      <Navbar.Section grow mt="xs" component={ScrollArea} mx="-xs" px={0}>
        <MainLinks userInfo={props.userInfo} isAuthenticated={props.isAuthenticated} />
      </Navbar.Section>
      <Navbar.Section>
        {props.isAuthenticated && !isEmpty(props.userInfo) ? (
          <UserInfo userInfo={props.userInfo} />
        ) : (
          <AuthButtons />
        )}
      </Navbar.Section>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userInfo: state.auth.userInfo,
  };
};

export default connect(mapStateToProps)(Sidebar);
