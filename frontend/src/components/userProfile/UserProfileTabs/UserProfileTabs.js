import React, { useState } from "react";
import { Tabs, Card } from "@mantine/core";

import OverviewTab from "./OverviewTab/OverviewTab";
import PostsTab from "./PostsTab/PostsTab";
import BookingsTab from "./BookingsTab/BookingsTab";

const UserProfileTabs = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabChangeHandler = (active, tabKey) => {
    setActiveTab(active);
  };

  return (
    <Card mt={10}>
      <Tabs color="secondary" active={activeTab} onTabChange={tabChangeHandler}>
        <Tabs.Tab label="Overview">
          <OverviewTab userProfile={props.userProfile} />
        </Tabs.Tab>
        <Tabs.Tab label="Posts">
          <PostsTab userPosts={props.userPosts} user={props.user} />
        </Tabs.Tab>
        <Tabs.Tab label="Bookings">
          <BookingsTab />
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};

export default UserProfileTabs;
