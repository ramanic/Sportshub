import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, Group, Text, Image, Title, Button, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IoStar } from "react-icons/io5";

const BookedItem = (props) => {
  console.log(props.booking);
  const smallScreen = useMediaQuery("(min-width: 768px)");
  const theme = useMantineTheme();
  return (
    <Card
      withBorder
      shadow="md"
      sx={(style) => ({
        margin: smallScreen ? "4px auto" : "2px auto",
        backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
      })}
      p={smallScreen ? "md" : "xs"}
    >
      <Group spacing={smallScreen ? "md" : "xs"}>
        <Image
          src={props.booking.venue.images[0]}
          height={smallScreen ? 110 : 90}
          width={smallScreen ? 150 : 120}
          radius="sm"
        />
        <Box sx={{ flexGrow: 1, alignSelf: "stretch" }}>
          <Text weight={700} size="lg" component={Link} to={`/venue/${props.booking.venue._id}`}>
            {props.booking.venue.name}
          </Text>
          <Text size="xs">
            {props.booking.venue.address.city + ", " + props.booking.venue.address.district}
          </Text>
          <Box>
            <Text weight={600} mt={12}>
              {new Date(props.booking.date).toLocaleDateString()}
            </Text>
            <Text weight={600}>{props.booking.startTime + " - " + props.booking.endTime}</Text>
          </Box>
        </Box>
      </Group>
    </Card>
  );
};

export default BookedItem;
