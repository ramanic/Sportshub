import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Card,
  Title,
  Accordion,
  ThemeIcon,
  Chips,
  Text,
  Chip,
  RangeSlider,
  Group,
  Button,
  Input,
  useMantineTheme,
} from "@mantine/core";
import { IoFilterOutline, IoSearchOutline } from "react-icons/io5";

import { getFilteredShopItems } from "../../../actions/shopActions";

const ProductsFilter = (props) => {
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
    console.log(searchParams);
    props.getFilteredShopItems(searchParams);
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
                placeholder="Search products"
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

          <Box mt={16}>
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
            <Button color="secondary" variant="outline" onClick={filteredSearchHandler}>
              Filter
            </Button>
          </Box>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
};

export default connect(null, { getFilteredShopItems })(ProductsFilter);
