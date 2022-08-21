import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Notification, Text, ActionIcon } from "@mantine/core";
import {
  IoHeartOutline,
  IoGlassesOutline,
  IoAlertOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { BsPersonPlus, BsArrowUpRight } from "react-icons/bs";

import { readANotification } from "../../actions/notificationActions";

const NotificationItem = (props) => {
  const readNotificationHandler = () => {
    props.readANotification(props.notification._id);
  };

  if (props.notification.type === "like") {
    return (
      <Notification
        icon={<IoHeartOutline size={16} />}
        disallowClose
        mb={10}
        sx={{ boxShadow: "none" }}
      >
        <Text
          size="sm"
          color={props.notification.read ? "dimmed" : null}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{props.notification.text}</span>
          {!props.notification.read ? (
            <ActionIcon onClick={readNotificationHandler}>
              <IoGlassesOutline size={16} />
            </ActionIcon>
          ) : null}
          <ActionIcon component={Link} to={`/post/${props.notification.link_id}`} ml={-4}>
            <BsArrowUpRight size={14} />
          </ActionIcon>
        </Text>
      </Notification>
    );
  } else if (props.notification.type === "comment") {
    return (
      <Notification
        icon={<IoChatbubbleEllipsesOutline size={16} />}
        disallowClose
        mb={10}
        sx={{ boxShadow: "none" }}
        color="dimmed"
      >
        <Text
          size="sm"
          color={props.notification.read ? "dimmed" : null}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{props.notification.text}</span>
          {!props.notification.read ? (
            <ActionIcon onClick={readNotificationHandler}>
              <IoGlassesOutline size={16} />
            </ActionIcon>
          ) : null}
          <ActionIcon component={Link} to={`/post/${props.notification.link_id}`}>
            <BsArrowUpRight size={14} />
          </ActionIcon>
        </Text>
      </Notification>
    );
  } else if (
    props.notification.type === "friend-accept" ||
    props.notification.type === "friend-request"
  ) {
    return (
      <Notification
        icon={<BsPersonPlus size={16} />}
        disallowClose
        mb={10}
        sx={{ boxShadow: "none" }}
        color="dimmed"
      >
        <Text
          size="sm"
          color={props.notification.read ? "dimmed" : null}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{props.notification.text}</span>
          {!props.notification.read ? (
            <ActionIcon onClick={readNotificationHandler}>
              <IoGlassesOutline size={16} />
            </ActionIcon>
          ) : null}
          <ActionIcon component={Link} to={`/friends`}>
            <BsArrowUpRight size={14} />
          </ActionIcon>
        </Text>
      </Notification>
    );
  } else {
    return (
      <Notification
        icon={<IoAlertOutline size={16} />}
        disallowClose
        mb={10}
        sx={{ boxShadow: "none" }}
        color="dimmed"
      >
        <Text
          size="sm"
          color={props.notification.read ? "dimmed" : null}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{props.notification.text}</span>
          {!props.notification.read ? (
            <ActionIcon onClick={readNotificationHandler}>
              <IoGlassesOutline size={16} />
            </ActionIcon>
          ) : null}
          <ActionIcon component={Link} to={`/post/${props.notification.link_id}`}>
            <BsArrowUpRight size={14} />
          </ActionIcon>
        </Text>
      </Notification>
    );
  }
};

export default connect(null, { readANotification })(NotificationItem);
