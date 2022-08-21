import React, { useState, useEffect } from "react";
import { Tabs, Card, Grid, ScrollArea, Box, MediaQuery } from "@mantine/core";
import { IoGlobeOutline, IoCompassOutline } from "react-icons/io5";
import { connect } from "react-redux";

import GlobalFeed from "./GlobalFeed/GlobalFeed";
import LocalFeed from "./LocalFeed/LocalFeed";
import RightContent from "./RightContent/RightContent";
import CreatePost from "../createPost/CreatePost";
import isEmpty from "../../utils/isEmpty";

const PostFeed = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabChangeHandler = (active, tabKey) => {
    setActiveTab(active);
  };

  return (
    <Grid gutter={16}>
      <Grid.Col lg={8} xl={8} sx={{ position: "relative" }}>
        {!(!props.isAuthenticated || isEmpty(props.userInfo)) ? <CreatePost /> : null}

        <Card
          sx={(style) => ({
            position: "sticky",
            backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
          })}
          shadow="md"
          className="right-content-sticky-mt"
        >
          <Tabs
            grow
            position="center"
            color="primary"
            active={activeTab}
            onTabChange={tabChangeHandler}
          >
            <Tabs.Tab label="My Feed" icon={<IoCompassOutline size={20} />} tabKey="my-feed">
              {/* {!(!props.isAuthenticated || isEmpty(props.userInfo)) ? <MyFeed /> : null} */}
              {!(!props.isAuthenticated || isEmpty(props.userInfo)) ? <LocalFeed /> : null}
            </Tabs.Tab>
            <Tabs.Tab label="Global Feed" icon={<IoGlobeOutline size={20} />} tabKey="global-feed">
              <GlobalFeed />
            </Tabs.Tab>
          </Tabs>
        </Card>
      </Grid.Col>
      <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
        <Grid.Col md={4} lg={4} xl={4} sx={{ position: "relative" }}>
          <RightContent />
        </Grid.Col>
      </MediaQuery>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userInfo: state.auth.userInfo,
  };
};

export default connect(mapStateToProps)(PostFeed);
