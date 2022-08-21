import React from "react";
import { Card, Title, Group, Box, Text, ActionIcon, Divider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const SelectDate = (props) => {
  const xsScreen = useMediaQuery("(min-width: 500px)");
  const mediumScreen = useMediaQuery("(min-width: 992px)");
  const largeScreen = useMediaQuery("(min-width: 1200px)");
  const xlScreen = useMediaQuery("(min-width: 1400px)");

  const date = new Date();
  const dateArray = [
    {
      name: days[date.getDay() % 7],
      value: date.getDate() % 30,
    },
    {
      name: days[(date.getDay() + 1) % 7],
      value: (date.getDate() + 1) % 30,
    },
    {
      name: days[(date.getDay() + 2) % 7],
      value: (date.getDate() + 2) % 30,
    },
    {
      name: days[(date.getDay() + 3) % 7],
      value: (date.getDate() + 3) % 30,
    },
    {
      name: days[(date.getDay() + 4) % 7],
      value: (date.getDate() + 4) % 30,
    },
    {
      name: days[(date.getDay() + 5) % 7],
      value: (date.getDate() + 5) % 30,
    },
    {
      name: days[(date.getDay() + 6) % 7],
      value: (date.getDate() + 6) % 30,
    },
    ,
  ];
  const availableTime =
    props.selectedBookingDate &&
    props.venueSchedule.days.find((el) => el.day === props.selectedBookingDate.name);

  return (
    <Card withBorder shadow="md">
      <Box>
        <Group mb={10}>
          <Text weight={600}>Select Date</Text>
          <Text size="sm" color="dimmed" weight={600}>
            - {months[new Date().getMonth()] + " " + new Date().getFullYear()}
          </Text>
        </Group>
        <Group>
          {dateArray.map((el, index) => (
            <Box
              key={el.value}
              sx={(style) => ({
                border: `2px solid transparent`,
                borderRadius: 5,
                padding: "2px 22px",
                cursor: "pointer",
                transition: "all .25s",
                textAlign: "center",
                marginRight: largeScreen ? 10 : 0,
                marginBottom: largeScreen ? 10 : 2,
                backgroundColor:
                  props.selectedBookingDate && props.selectedBookingDate.index === index
                    ? style.colors.primary[6]
                    : style.colors.gray[2],
                color:
                  props.selectedBookingDate && props.selectedBookingDate.index === index
                    ? "white"
                    : null,
                "&:hover": {
                  backgroundColor: style.colors.primary[6],
                  color: "white",
                  border: `2px solid ${style.colors.primary[6]}`,
                },
              })}
              onClick={() => props.setSelectedBookingDate({ ...el, index })}
            >
              <Text sx={{ opacity: "70%" }}>{el.name.toUpperCase()}</Text>
              <Text weight={600}>{el.value}</Text>
            </Box>
          ))}
        </Group>
      </Box>
      <Divider mt={20} />
      <Box mt={16}>
        <Group mb={10}>
          <Text weight={600}>Select Time</Text>
        </Group>
        <Group>
          {props.venueAvailability ? (
            props.venueAvailability.map((el, index) => {
              return el.available ? (
                <Box
                  key={el._id}
                  sx={(style) => ({
                    borderRadius: 5,
                    padding: "10px 22px",
                    cursor: "pointer",
                    transition: "all .25s",
                    textAlign: "center",
                    marginRight: largeScreen ? 10 : 0,
                    marginBottom: largeScreen ? 10 : 2,
                    backgroundColor:
                      props.selectedBookingTime && props.selectedBookingTime.index === index
                        ? style.colors.primary[6]
                        : style.colors.gray[2],
                    color:
                      props.selectedBookingTime && props.selectedBookingTime.index === index
                        ? "white"
                        : null,
                    "&:hover": {
                      backgroundColor: style.colors.primary[6],
                      color: "white",
                    },
                  })}
                  onClick={() => props.setSelectedBookingTime({ ...el, index })}
                >
                  <Text weight={600}>
                    {el.startTime} - {el.endTime}{" "}
                  </Text>
                </Box>
              ) : null;
            })
          ) : (
            <Text color="dimmed" size="sm">
              No time available for selected date
            </Text>
          )}
        </Group>
      </Box>
    </Card>
  );
};

export default SelectDate;
