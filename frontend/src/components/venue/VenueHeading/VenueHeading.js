import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Group, Box, Text, Title, ActionIcon, Badge, Button, Progress } from "@mantine/core";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

import { saveVenue } from "../../../actions/venueActions";

const VenueHeading = (props) => {
  const sumValues = props.currentVenue.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
  const averageRating =
    props.currentVenue.reviews.length === 0 ? 0 : sumValues / props.currentVenue.reviews.length;

  // Check if the user has already saved this product
  const isSaved = () => {
    if (props.currentVenue.saves.filter((save) => save._id === props.user.user_id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Handle saving of products
  const onSaveHandler = () => {
    props.saveVenue(props.currentVenue._id, "single");
  };

  return (
    <>
      <Group mt={16} position="apart">
        <Box>
          <Title order={3}>{props.currentVenue.name}</Title>
          <Text size="sm">
            {props.currentVenue.address.city + ", " + props.currentVenue.address.district}
          </Text>
          <Badge radius="sm" color="secondary" mr={10} mt={10}>
            {props.currentVenue.category}
          </Badge>
        </Box>
        <Group>
          {isSaved() ? (
            <ActionIcon size="md" variant="light" color="secondary" onClick={onSaveHandler}>
              <IoHeart size={18} />
            </ActionIcon>
          ) : (
            <ActionIcon size="md" variant="light" color="secondary" onClick={onSaveHandler}>
              <IoHeartOutline size={18} />
            </ActionIcon>
          )}

          <Button color="red" size="xs">
            Report
          </Button>
          {props.currentVenue.venueSchedule.bookingAllowed ? (
            <Button size="md" component={Link} to={`/venue/${props.currentVenue._id}/book`}>
              Book
            </Button>
          ) : (
            <Button size="md" disabled>
              Book
            </Button>
          )}
        </Group>
      </Group>
      <Group mt={20}>
        <Progress
          value={(averageRating * 20).toFixed(2)}
          label={`${averageRating.toFixed(2)} / 5`}
          size="xl"
          sx={{ width: 130 }}
        />
        <Badge variant="outline" radius="xs" color="green">
          {props.currentVenue.reviews.length} reviews
        </Badge>
        <Group sx={{ marginLeft: "auto" }}>
          <Text size="xs" color="dimmed">
            starts at
          </Text>
          <Text weight={700} size="md">
            Rs. 1600
          </Text>
        </Group>
      </Group>
    </>
  );
};

export default connect(null, { saveVenue })(VenueHeading);
