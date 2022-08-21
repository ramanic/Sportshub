import React from "react";
import { Card, Title, Text, Box, Checkbox, NumberInput, Group } from "@mantine/core";
import DaysTimingList from "./DaysTimingList";
import DefaultTimingList from "./DefaultTimingList";

const VenueSchedule = (props) => {
  // console.log(props.venueSchedule);
  return (
    <Card withBorder>
      <Box>
        <Title order={4}>Manage Your venue Schedule</Title>
      </Box>
      <Box>
        <Card withBorder mt={14}>
          <Group>
            <Checkbox
              checked={props.venueSchedule.bookingAllowed}
              onChange={(event) => props.allowBookingHandler(event.currentTarget.checked)}
              label={<Text color="secondary">Allow booking of this venue</Text>}
              color="secondary"
            />
          </Group>
        </Card>
      </Box>
      <Box>
        <Card withBorder mt={14}>
          <Text weight={600}>Check this box if you want the same schedule for whole week</Text>
          <Checkbox
            checked={props.venueSchedule.sameEveryday}
            onChange={(event) => props.sameTimingHandler(event.currentTarget.checked)}
            label={<Text color="secondary">Same Timing Whole Week</Text>}
            color="secondary"
          />
        </Card>
      </Box>
      <Box>
        <Card withBorder mt={14}>
          <Text weight={600}>
            Set the number of days ahead you want the user to book your venue
          </Text>
          <NumberInput
            value={props.venueSchedule.bookingGaps}
            onChange={(value) => props.bookingGapHandler(value)}
            min={1}
            max={7}
          />
        </Card>
      </Box>
      <Box>
        {props.venueSchedule.sameEveryday ? (
          <DefaultTimingList
            defaultTiming={props.venueSchedule.default_timing}
            changeDefaultTimingRateHandler={props.changeDefaultTimingRateHandler}
            changeDefaultTimingTimeHandler={props.changeDefaultTimingTimeHandler}
            newDefaultTimingItemHandler={props.newDefaultTimingItemHandler}
            deleteDefaultTimingHandler={props.deleteDefaultTimingHandler}
          />
        ) : (
          <DaysTimingList
            daysTiming={props.venueSchedule.days}
            changeDaysTimingRateHandler={props.changeDaysTimingRateHandler}
            changeDaysTimingTimeHandler={props.changeDaysTimingTimeHandler}
            newDaysTimingItemHandler={props.newDaysTimingItemHandler}
            deleteDaysTimingHandler={props.deleteDaysTimingHandler}
          />
        )}
      </Box>
    </Card>
  );
};

export default VenueSchedule;
