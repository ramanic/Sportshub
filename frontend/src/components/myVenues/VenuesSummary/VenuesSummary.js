import React from "react";
import { Link } from "react-router-dom";
import { Card, Box, Group, Button, Text, Avatar, useMantineTheme } from "@mantine/core";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CSVLink } from "react-csv";

import { IoArrowDownOutline } from "react-icons/io5";

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

const monthNames = [
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

const createdData = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const csvHeaders = [
  {
    label: "Day",
    key: "_id",
  },
  {
    label: "Bookings",
    key: "count",
  },
];

const VenuesSummary = (props) => {
  console.log(props);
  const theme = useMantineTheme();

  // Create data for chart
  props.venueAggregates.dailyBookings.forEach((el) => {
    createdData[el._id] = el.count;
  });

  // Csv report data
  const data = {
    labels,
    datasets: [
      {
        backgroundColor: theme.colors.primary[6],
        data: createdData,
      },
    ],
  };

  // CSV report file format and data
  const csvReport = {
    data: props.venueAggregates.dailyBookings,
    headers: csvHeaders,
    filename: "monthly_bookings.csv",
  };

  // Total revenue generated
  let totalRevenueGenerated = 0;
  props.venueAggregates.venueEarnings.forEach((el) => {
    totalRevenueGenerated += el.total;
  });

  // Total venue bookings
  let totalVenueBookings = 0;
  props.venueAggregates.dailyBookings.forEach((el) => {
    totalVenueBookings += el.count;
  });

  // Average rating of venues
  let averageVenueRating = 0;
  let unreviewedVenues = 0;
  props.myVenues.forEach((venue) => {
    const sumValues = venue.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
    const averageRating = venue.reviews.length === 0 ? 0 : sumValues / venue.reviews.length;
    if (averageRating === 0) {
      unreviewedVenues += 1;
    }
    averageVenueRating += averageRating;
  });

  return (
    <Card withBorder shadow="md">
      <Group position="apart">
        <Text weight={600}>Your venues booking summary report</Text>
        <Box>
          <Button variant="light" component={Link} to="/my-venues/stats" mr={20}>
            Details
          </Button>
          <Button variant="light" rightIcon={<IoArrowDownOutline />}>
            <CSVLink
              {...csvReport}
              style={{ textDecoration: "none", color: theme.colors.primary[5] }}
            >
              Export
            </CSVLink>
          </Button>
        </Box>
      </Group>
      <Box sx={{ height: 260, width: "100%" }}>
        <Bar options={options} data={data} />
      </Box>
      <Group position="center" align="center" mt={12} sx={{ color: theme.colors.primary[6] }}>
        <Box>
          <Text size="lg">{monthNames[new Date().getMonth()]} 2022</Text>
        </Box>
      </Group>

      <Box mt={30}>
        <Text weight={600}>Your venues booking summary report</Text>
        <Group mt={20} spacing="xl" position="apart">
          <Card
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
              Venues Owned
            </Text>
            <Text weight={700} sx={{ fontSize: "2rem" }}>
              {props.totalVenues}
            </Text>
          </Card>
          <Card
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
              This Month Bookings
            </Text>
            <Text weight={700} sx={{ fontSize: "2rem" }}>
              {totalVenueBookings}
            </Text>
          </Card>
          <Card
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
              Revenue Generated
            </Text>
            <Text weight={700} sx={{ fontSize: "2rem" }}>
              Rs. {totalRevenueGenerated}
            </Text>
          </Card>
          <Card
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
              Average Rating
            </Text>
            <Text weight={700} sx={{ fontSize: "2rem" }}>
              {(averageVenueRating / (props.myVenues.length - unreviewedVenues)).toFixed(2)}
            </Text>
          </Card>
        </Group>
      </Box>

      <Card
        mt={12}
        withBorder
        shadow="lg"
        sx={(theme) => ({
          textAlign: "center",
          backgroundColor: theme.colors.gray[3],
          transition: "all .3s",
          cursor: "pointer",
          width: "100%",
          position: "relative",
          "&:hover": {
            backgroundColor: theme.colors.gray[4],
          },
        })}
      >
        <Box>
          <Avatar
            src={props.userInfo.profile.photo}
            radius="xl"
            size="lg"
            sx={{ margin: "0 auto" }}
          />
          <Box mt={4}>
            <Text weight={700} size="lg">
              {props.userInfo.name}
            </Text>
            <Text sx={{ opacity: "0.8" }}>
              {props.userInfo.email} | {props.userInfo.profile.phone}
            </Text>
          </Box>
        </Box>
        <Button
          variant="outline"
          component={Link}
          to="/my-venues/add"
          sx={{ position: "absolute", top: 13, right: 13 }}
        >
          Add new Venue
        </Button>
      </Card>
    </Card>
  );
};

export default VenuesSummary;
