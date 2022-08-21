import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Group, Text, Badge, ActionIcon } from "@mantine/core";
import { connect } from "react-redux";
import { IoCheckmarkOutline } from "react-icons/io5";

import { verifyVenue } from "../../../actions/venueActions";

const VenueRow = (props) => {
  const verifyVenueHandler = () => {
    props.verifyVenue(props.venue._id);
  };

  const sumValues = props.venue.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
  const averageRating =
    props.venue.reviews.length === 0 ? 0 : sumValues / props.venue.reviews.length;

  return (
    <tr style={{ textAlign: "center" }}>
      <td>
        <Group>
          <Avatar
            component={Link}
            to={`/venue/${props.venue._id}`}
            src={props.venue.images[0]}
            radius="sm"
          />
          <Text component={Link} to={`/venue/${props.venue._id}`}>
            {props.venue.name}
          </Text>
        </Group>
      </td>
      <td>
        <Group direction="column" position="center">
          <Avatar src={props.venue.owner.profile.photo} radius="xl" />
          <Text mt={-10}>{props.venue.owner.name}</Text>
          <Text color="dimmed" size="sm" mt={-20}>
            {props.venue.owner.email}
          </Text>
        </Group>
      </td>
      <td>
        <Text>{props.venue.address.city + ", " + props.venue.address.district}</Text>
      </td>
      <td>
        <Text weight={600}>{averageRating.toFixed(2)}</Text>
        <Badge radius="sm">{props.venue.reviews.length} Reviews</Badge>
      </td>
      <td>
        {props.venue.verified ? (
          <Badge radius="sm" color="primary">
            Verified
          </Badge>
        ) : (
          <Badge radius="sm" color="red">
            Unverified
          </Badge>
        )}
      </td>
      <td>
        <Text>{new Date(props.venue.createdAt).toLocaleString()}</Text>
      </td>
      <td>
        <Group position="right">
          {props.venue.verified ? null : (
            <ActionIcon
              color="primary"
              variant="light"
              onClick={verifyVenueHandler}
              loading={props.verifyVenueLoading}
            >
              <IoCheckmarkOutline size={16} />
            </ActionIcon>
          )}

          {/* <ActionIcon
            color="red"
            variant="light"
            onClick={deleteItemHandler}
            loading={props.deleteItemLoading}
          >
            <IoCloseOutline color="red" size={20} />
          </ActionIcon> */}
        </Group>
      </td>
    </tr>
  );
};

export default connect(null, { verifyVenue })(VenueRow);
