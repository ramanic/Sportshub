import React from "react";
import { Card, Title, Text, Group, Box, Button } from "@mantine/core";

import DefaultTimingListItem from "./DefaultTimingListItem";

const DefaultTimingList = (props) => {
  return (
    <Card withBorder mt={20}>
      <Box mb={10}>
        <Text weight={600}>Default timings</Text>
      </Box>
      {props.defaultTiming.map((el) => (
        <DefaultTimingListItem
          key={el._id || el.endTime}
          timing={el}
          changeDefaultTimingRateHandler={props.changeDefaultTimingRateHandler}
          changeDefaultTimingTimeHandler={props.changeDefaultTimingTimeHandler}
          deleteDefaultTimingHandler={props.deleteDefaultTimingHandler}
        />
      ))}

      <Button size="xs" variant="outline" mt={20} onClick={props.newDefaultTimingItemHandler}>
        Add New Timing
      </Button>
    </Card>
  );
};

export default DefaultTimingList;
