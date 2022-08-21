import React from "react";
import { Link } from "react-router-dom";
import { Card, Box, Group, Button, Text, useMantineTheme } from "@mantine/core";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

ChartJS.register(...registerables);

const labels = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
];

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
      text: "Your venues booking summary",
    },
    legend: {
      display: false,
    },
  },
};

const summaryData = [
  {
    title: "Owner",
    value: "John Smith",
  },
  {
    title: "Venues Owned",
    value: 3,
  },
  {
    title: "Total Bookings",
    value: 423,
  },
  {
    title: "Revenue Generated",
    value: "Rs. 12,430",
  },
  {
    title: "Average Rating",
    value: 4.4,
  },
];

const VenuesSummary = (props) => {
  const theme = useMantineTheme();

  const data = {
    labels,
    datasets: [
      {
        backgroundColor: theme.colors.primary[6],
        data: [
          2, 4, 7, 2, 1, 6, 4, 4, 6, 8, 4, 1, 5, 4, 5, 7, 0, 4, 6, 0, 1, 3, 2, 5, 6, 9, 2, 1, 6, 5,
        ],
      },
    ],
  };

  return (
    <Card withBorder shadow="md">
      <Group position="apart">
        <Text weight={600}>Your venues booking summary graph</Text>
      </Group>
      <Box sx={{ height: 260, width: "100%" }}>
        <Bar options={options} data={data} />
      </Box>
      <Group position="apart" align="center" mt={12} sx={{ color: theme.colors.primary[6] }}>
        <Group>
          <IoChevronBackOutline size={20} />
          <Text ml={-14}>July</Text>
        </Group>
        <Box>
          <Text size="lg">August 2022</Text>
        </Box>
        <Group>
          <Text mr={-14}>September</Text>
          <IoChevronForwardOutline size={20} />
        </Group>
      </Group>
      <Box mt={30}>
        <Text weight={600}>Your venues booking summary report</Text>
        <Group mt={20} spacing="xl" position="apart">
          {summaryData.map((item) => (
            <Card
              key={item.title}
              withBorder
              shadow="lg"
              sx={(theme) => ({
                textAlign: "center",
                backgroundColor: theme.colors.primary[5],
                color: "white",
                transition: "all .3s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.colors.primary[6],
                  scale: "1.02",
                },
              })}
            >
              <Text weight={600} size="lg" sx={{ opacity: "0.9" }}>
                {item.title}
              </Text>
              <Text weight={700} sx={{ fontSize: "2rem" }}>
                {item.value}
              </Text>
            </Card>
          ))}
        </Group>
      </Box>
    </Card>
  );
};

export default VenuesSummary;
