import React from "react";
import { Header, Group, Title, MediaQuery, Burger, useMantineTheme } from "@mantine/core";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "./../../../assets/images/logo.svg";

import RightAction from "./RightAction/RightAction";

const Topbar = (props) => {
  const theme = useMantineTheme();
  return (
    <Header height={60}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={props.opened}
            onClick={() => props.setOpened((o) => !o)}
            size="sm"
            color={theme.colors.primary[5]}
          />
        </MediaQuery>

        <MediaQuery smallerThan="xs">
          <Group align="center" spacing={8}>
            <Logo width={40} fill={theme.colors.primary[6]} />
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Title order={2} sx={{ textTransform: "uppercase", color: theme.colors.primary[6] }}>
                Sports Hub
              </Title>
            </MediaQuery>
          </Group>
        </MediaQuery>

        {props.auth.isAuthenticated ? <RightAction /> : null}
      </Group>
    </Header>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Topbar);
