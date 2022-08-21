import React from "react";
import { Card, Text, Divider, Box, Badge, Group, Button, useMantineTheme } from "@mantine/core";
import { IoTimerOutline, IoCheckboxOutline } from "react-icons/io5";

const ScheduleSummary = (props) => {
  const theme = useMantineTheme();

  return (
    <Card withBorder shadow="md">
      <Group position="apart">
        <Text weight={600}>Schedule Summary</Text>
        <Button size="xs" variant="light" onClick={props.clearBookingSelection}>
          Clear
        </Button>
      </Group>
      <Divider my={8} />
      <Box mb={16}>
        <Text size="sm" weight={600} color="dimmed">
          Booked Events
        </Text>
        {props.selectedBookingTime && (
          <Group mb={2}>
            <IoCheckboxOutline size={18} color={theme.colors.primary[6]} />
            <Text size="sm" weight={600} ml={-10}>
              1 hour session
            </Text>
            <Text weight={700} size="sm" sx={{ marginLeft: "auto" }}>
              Rs. {props.selectedBookingTime.price}
            </Text>
          </Group>
        )}
      </Box>
      <Box mb={16}>
        <Text size="sm" weight={600} color="dimmed">
          Date and Time
        </Text>
        {props.selectedBookingTime && props.selectedBookingDate && (
          <Group mb={2}>
            <IoTimerOutline size={18} color={theme.colors.primary[6]} />
            <Text size="sm" weight={600} ml={-10}>
              {props.selectedBookingTime.startTime} - {props.selectedBookingTime.endTime},{" "}
              {props.selectedBookingDate.name.toUpperCase()}
            </Text>
          </Group>
        )}
      </Box>
      <Box>
        <Text size="sm" weight={600} color="dimmed" mb={4}>
          Booked For
        </Text>
        <Badge radius="sm">{props.venueType}</Badge>
      </Box>
      <Divider mb={30} mt={16} />
      <Box>
        <Group position="apart">
          <Text weight={600}>Total Amount</Text>
          <Text weight={800} size="lg">
            Rs. {props.selectedBookingTime ? props.selectedBookingTime.price : 0}
          </Text>
        </Group>
      </Box>
      <Box>
        <Button
          fullWidth
          mt={30}
          size="lg"
          onClick={props.proceedToPaymentHandler}
          loading={props.paymentLoading || props.bookVenueLoading}
        >
          Proceed to Payment
        </Button>
      </Box>
    </Card>
  );
};

export default ScheduleSummary;
