import React from "react";
import { Card, Title } from "@mantine/core";

import VenuesSummary from "./VenuesSummary/VenuesSummary";
import VenueStats from "./VenueStats/VenueStats";

const VenuesStats = (props) => {
  return (
    <Card withBorder shadow="md">
      <VenuesSummary />
      <Title order={4} mt={24} mb={16}>
        All Venues Summary
      </Title>
      <VenueStats />
      <VenueStats />
      <VenueStats />
    </Card>
  );
};

export default VenuesStats;
