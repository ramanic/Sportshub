import React, { useState } from "react";
import { Card, Title, Text, Group, Box, Badge, Button, NumberInput } from "@mantine/core";

import DaysTimingListItem from "./DaysTimingListItem";

const DaysTimingList = (props) => {
  console.log("AAAA", props.daysTiming);
  return props.daysTiming.map((day) => (
    <Card withBorder mt={20} key={day._id}>
      <Box mb={10}>
        <Text weight={600}>Timings for {day.day.toUpperCase()}</Text>
      </Box>
      {day.timing.map((el) => (
        <DaysTimingListItem
          key={el._id || el.endTime}
          timing={el}
          dayId={day._id}
          changeDaysTimingRateHandler={props.changeDaysTimingRateHandler}
          changeDaysTimingTimeHandler={props.changeDaysTimingTimeHandler}
          deleteDaysTimingHandler={props.deleteDaysTimingHandler}
        />
      ))}

      <Button
        size="xs"
        variant="outline"
        mt={20}
        onClick={() => props.newDaysTimingItemHandler(day._id)}
      >
        Add New Timing
      </Button>
    </Card>
  ));
};

export default DaysTimingList;
