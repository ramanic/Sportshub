import React from "react";
import { Card, Title } from "@mantine/core";

import AddVenueForm from "./AddVenueForm";

const AddVenue = (props) => {
  return (
    <Card withBorder shadow="lg">
      <AddVenueForm />
    </Card>
  );
};

export default AddVenue;
