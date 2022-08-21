import React from "react";
import {
  Card,
  Title,
  Text,
  Group,
  Box,
  Badge,
  Button,
  NumberInput,
  ActionIcon,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IoTimeOutline, IoCloseCircleOutline } from "react-icons/io5";

const DefaultTimingListItem = (props) => {
  // Format start and end time
  let newStartTime, newEndTime;
  if (props.timing.startTime.split(":")[0].length === 1) {
    newStartTime = new Date(`2011-04-20T0${props.timing.startTime}`);
  } else {
    newStartTime = new Date(`2011-04-20T${props.timing.startTime}`);
  }
  if (props.timing.endTime.split(":")[0].length === 1) {
    newEndTime = new Date(`2011-04-20T0${props.timing.endTime}`);
  } else {
    newEndTime = new Date(`2011-04-20T${props.timing.endTime}`);
  }

  return (
    <Group position="apart" mb={20}>
      <Group>
        <Box mr={20} sx={{ textAlign: "center" }}>
          <TimeInput
            clearable
            icon={<IoTimeOutline size={16} />}
            value={newStartTime}
            onChange={(value) =>
              props.changeDefaultTimingTimeHandler(value, props.timing._id, "startTime")
            }
          />
          <Badge radius="sm" mt={8}>
            Start Time
          </Badge>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <TimeInput
            clearable
            icon={<IoTimeOutline size={16} />}
            value={newEndTime}
            onChange={(value) =>
              props.changeDefaultTimingTimeHandler(value, props.timing._id, "endTime")
            }
          />
          <Badge radius="sm" mt={8}>
            End Time
          </Badge>
        </Box>
      </Group>
      <Group align="flex-start">
        <Box sx={{ textAlign: "center" }}>
          <NumberInput
            value={Number(props.timing.price)}
            onChange={(value) => props.changeDefaultTimingRateHandler(value, props.timing._id)}
            min={0}
          />
          <Badge radius="sm" mt={8}>
            Rate (Rs.)
          </Badge>
        </Box>
        <ActionIcon
          mt={4}
          ml={20}
          color="primary"
          onClick={() =>
            props.deleteDefaultTimingHandler(
              props.timing._id ? props.timing._id : props.timing.endTime
            )
          }
        >
          <IoCloseCircleOutline size={30} />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default DefaultTimingListItem;
