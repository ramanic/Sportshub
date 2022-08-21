import React, { useState } from "react";
import { Card, Tabs, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import FriendList from "./FriendList/FriendList";
import FriendRequest from "./FriendRequest/FriendRequest";
import SentRequest from "./SentRequest/SentRequest";

const Friends = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const mediumScreen = useMediaQuery("(min-width: 992px)");

  return (
    <Card withBorder shadow="lg">
      <Title order={3}>Your Friends</Title>
      <Tabs
        active={activeTab}
        onTabChange={setActiveTab}
        position={mediumScreen ? "center" : "left"}
      >
        <Tabs.Tab label="Friends">
          <FriendList />
        </Tabs.Tab>
        <Tabs.Tab label="Friend Requests">
          <FriendRequest />
        </Tabs.Tab>
        <Tabs.Tab label="Sent Requests">
          <SentRequest />
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};

export default Friends;
