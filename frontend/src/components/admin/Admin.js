import React, { useState } from "react";
import { Tabs, Card, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import ManageUsers from "./ManageUsers/ManageUsers";
import ManageProducts from "./ManageProducts/ManageProducts";
import ManageOrders from "./ManageOrders/ManageOrders";
import ManageVenues from "./ManageVenues/ManageVenues";

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const mediumScreen = useMediaQuery("(min-width: 992px)");

  return (
    <Card sx={{ overflowX: "scroll", minWidth: 850 }}>
      <Title order={3}>Admin Panel</Title>
      <Tabs
        active={activeTab}
        onTabChange={setActiveTab}
        position={mediumScreen ? "center" : "left"}
      >
        <Tabs.Tab label="Products">
          <ManageProducts />
        </Tabs.Tab>
        <Tabs.Tab label="Users">
          <ManageUsers />
        </Tabs.Tab>
        <Tabs.Tab label="Orders">
          <ManageOrders />
        </Tabs.Tab>
        <Tabs.Tab label="Venues">
          <ManageVenues />
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};

export default Admin;
