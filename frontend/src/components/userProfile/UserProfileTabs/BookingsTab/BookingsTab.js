import React from "react";
import { Box, Grid } from "@mantine/core";

import BookedItem from "./BookedItem";

const BookingsTab = () => {
  return (
    <Box mt={16} gutter={36}>
      <Grid columns={2}>
        <Grid.Col xs={2} md={1}>
          <BookedItem />
        </Grid.Col>
        <Grid.Col xs={2} md={1}>
          <BookedItem />
        </Grid.Col>
        <Grid.Col xs={2} md={1}>
          <BookedItem />
        </Grid.Col>
        <Grid.Col xs={2} md={1}>
          <BookedItem />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default BookingsTab;
