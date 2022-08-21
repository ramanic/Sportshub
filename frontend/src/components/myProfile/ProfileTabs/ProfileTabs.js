import React, { useState } from "react";
import { Tabs, Card } from "@mantine/core";

import OverviewTab from "./OverviewTab/OverviewTab";
import PostsTab from "./PostsTab/PostsTab";
import BookingsTab from "./BookingsTab/BookingsTab";
import Orders from "./OrdersTab/Orders";

const ProfileTabs = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabChangeHandler = (active, tabKey) => {
    setActiveTab(active);
  };

  return (
    <Card mt={10}>
      <Tabs color="secondary" active={activeTab} onTabChange={tabChangeHandler}>
        <Tabs.Tab label="Overview">
          <OverviewTab
            myProfile={props.myProfile}
            completeMyProfileLoading={props.completeMyProfileLoading}
          />
        </Tabs.Tab>
        <Tabs.Tab label="Posts">
          <PostsTab myPosts={props.myPosts} />
        </Tabs.Tab>
        <Tabs.Tab label="Bookings">
          <BookingsTab />
        </Tabs.Tab>
        <Tabs.Tab label="My Orders">
          <Orders />
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};

export default ProfileTabs;
