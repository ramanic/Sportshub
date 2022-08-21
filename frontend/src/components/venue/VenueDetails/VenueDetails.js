import React from "react";
import { Card, Text, Title, Grid, Box, Group, Button, useMantineTheme } from "@mantine/core";
import { IoCheckmarkOutline } from "react-icons/io5";

import VenueLocation from "./VenueLocation";

const VenueDetails = (props) => {
  const theme = useMantineTheme();

  return (
    <Card withBorder shadow="md" mt={20}>
      <Grid columns={12}>
        <Grid.Col xs={12} md={7}>
          <Title order={5} mb={8}>
            Description
          </Title>
          <Text size="sm">{props.currentVenue.description}</Text>
          <Title order={5} mb={8} mt={30}>
            Highlights
          </Title>
          {props.currentVenue.highlights.map((highlight) => (
            <Group mb={8} key={highlight}>
              <IoCheckmarkOutline size={18} color={theme.colors.primary[6]} />
              <Text>{highlight}</Text>
            </Group>
          ))}
        </Grid.Col>
        <Grid.Col xs={12} md={5}>
          <Title order={5} mb={8}>
            Location
          </Title>
          <VenueLocation location={props.currentVenue.location} />
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default VenueDetails;
