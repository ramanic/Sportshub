import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Image, Box, Text, Badge, Button, Group, ActionIcon, Progress } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IoHeartOutline, IoArrowForwardOutline, IoHeart } from "react-icons/io5";

import { saveVenue } from "../../../actions/venueActions";
const VenueCard = (props) => {
  const mediumScreen = useMediaQuery("(min-width: 992px)");
  const smallScreen = useMediaQuery("(min-width: 650px)");

  const sumValues = props.venue.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
  const averageRating =
    props.venue.reviews.length === 0 ? 0 : sumValues / props.venue.reviews.length;

  // Check if the user has already saved this product
  const isSaved = () => {
    if (props.venue.saves.filter((save) => save === props.user.user_id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Handle saving of products
  const onSaveHandler = () => {
    props.saveVenue(props.venue._id, "my-saved");
    window.location.reload();
  };

  return (
    <Card withBorder shadow="md" sx={{ width: "100%" }} p={mediumScreen ? "md" : "xs"}>
      <Group direction="row" align="stretch" spacing={mediumScreen ? "md" : "xs"}>
        <Image
          src={props.venue.images[0]}
          radius="sm"
          height={mediumScreen ? 130 : smallScreen ? 94 : 78}
          width={mediumScreen ? 190 : smallScreen ? 120 : 90}
        />
        <Box>
          <Text weight={600} size={mediumScreen ? "lg" : "md"}>
            {props.venue.name}
          </Text>
          <Text size={mediumScreen ? "sm" : "xs"} color="dimmed">
            {props.venue.address.city + " ," + props.venue.address.district}
          </Text>
          <Badge
            radius="sm"
            size={mediumScreen ? "md" : "xs"}
            color="secondary"
            my={mediumScreen ? 19 : 9}
            mr={14}
          >
            {props.venue.category}
          </Badge>

          <Progress
            value={(averageRating * 20).toFixed(2)}
            label={`${averageRating.toFixed(2)} / 5`}
            size={mediumScreen ? "xl" : "xl"}
            sx={{ width: 160, height: !mediumScreen ? "16px !important" : null }}
          />
        </Box>
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <Group>
            {/* <Text size="xs" color="dimmed">
              starts at
            </Text>
            <Text weight={700} size="md">
              Rs. 1600
            </Text> */}
            {isSaved() ? (
              <ActionIcon
                size="md"
                variant="light"
                ml={smallScreen ? 4 : 0}
                color="secondary"
                onClick={onSaveHandler}
              >
                <IoHeart size={18} />
              </ActionIcon>
            ) : (
              <ActionIcon
                size="md"
                variant="light"
                ml={smallScreen ? 4 : 0}
                color="secondary"
                onClick={onSaveHandler}
              >
                <IoHeartOutline size={18} />
              </ActionIcon>
            )}
          </Group>

          <Button
            component={Link}
            to={`/venue/${props.venue._id}`}
            rightIcon={<IoArrowForwardOutline size={16} sx={{ marginTop: "auto" }} />}
            size={mediumScreen ? "sm" : "xs"}
          >
            {smallScreen ? "Details" : ""}
          </Button>
        </Box>
      </Group>
    </Card>
  );
};

export default connect(null, { saveVenue })(VenueCard);
