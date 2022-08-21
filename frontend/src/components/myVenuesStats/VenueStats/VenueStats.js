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
    title: "Venue Name",
    value: "Maitidevi Futsal Ground",
  },
  {
    title: "Total Bookings",
    value: 423,
  },
  {
    title: "Revenue Generated",
    value: "Rs. 4,200",
  },
  {
    title: "Average Rating",
    value: 4.6,
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
    <Card withBorder shadow="md" mb={16}>
      <Group position="apart">
        <Text weight={600}>Report for Maitidevi Futsal Ground</Text>
      </Group>
      <Box sx={{ height: 200, width: "100%" }}>
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
      <Box mt={10}>
        <Group mt={20} spacing="xl" position="apart">
          {summaryData.map((item) => (
            <Card
              key={item.title}
              withBorder
              shadow="lg"
              sx={(theme) => ({
                textAlign: "center",
                backgroundColor: theme.colors.gray[3],
                transition: "all .3s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.colors.gray[4],
                  scale: "1.02",
                },
              })}
            >
              <Text weight={500} sx={{ opacity: "0.8" }}>
                {item.title}
              </Text>
              <Text weight={700} sx={{}}>
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
