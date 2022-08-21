import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Accordion,
  Text,
  Box,
  Title,
  Card,
  Input,
  Chips,
  Button,
  Group,
  Chip,
  useMantineTheme,
} from "@mantine/core";
import { IoSearchOutline, IoFilterOutline } from "react-icons/io5";

import { getFilteredVenues } from "../../../actions/venueActions";

const VenuesFilter = (props) => {
  const theme = useMantineTheme();

  const [sportsFilter, setSportsFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");

  const filteredSearchHandler = () => {
    const searchParams = {
      sportsFilter,
      ratingFilter,
      textFilter,
    };
    props.getFilteredVenues(searchParams);
  };

  const resetFilterHandler = () => {
    setSportsFilter([]);
    setRatingFilter("");
    setTextFilter("");
  };

  return (
    <Card withBorder shadow="md" mb={16}>
      <Accordion iconPosition="right" disableIconRotation>
        <Accordion.Item
          label={
            <Group>
              <Input
                variant="filled"
                placeholder="Search venues"
                rightSection={<IoSearchOutline color={theme.colors.primary[7]} />}
                sx={{ flex: 1 }}
                value={textFilter}
                onChange={(e) => setTextFilter(e.target.value)}
              />
              <Button size="xs" color="secondary" variant="subtle" onClick={resetFilterHandler}>
                Reset
              </Button>
            </Group>
          }
          icon={<IoFilterOutline size={26} color={theme.colors.primary[7]} />}
        >
          <Box>
            <Text weight={600} mb={4}>
              Sports
            </Text>
            <Chips
              radius="sm"
              spacing="xl"
              variant="filled"
              multiple
              value={sportsFilter}
              onChange={setSportsFilter}
            >
              <Chip value="cricket">Cricket</Chip>
              <Chip value="football">Football</Chip>
              <Chip value="basketball">Basketball</Chip>
              <Chip value="tennis">Tennis</Chip>
            </Chips>
          </Box>
          <Box mt={26}>
            <Text weight={600} mb={2}>
              Rating
            </Text>
            <Chips
              radius="sm"
              spacing="xl"
              variant="filled"
              value={ratingFilter}
              onChange={setRatingFilter}
            >
              <Chip value="4">4 and up</Chip>
              <Chip value="3">3 and up</Chip>
              <Chip value="2">2 and up</Chip>
              <Chip value="1">1 and up</Chip>
            </Chips>
          </Box>
          <Box mt={20}>
            <Button variant="outline" onClick={filteredSearchHandler}>
              Filter
            </Button>
          </Box>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
};

export default connect(null, { getFilteredVenues })(VenuesFilter);
