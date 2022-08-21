import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Menu, Text, ActionIcon, ScrollArea, Group, Button, Badge, Box } from "@mantine/core";
import { IoNotificationsOutline } from "react-icons/io5";

import NotificationItem from "./NotificationItem";
import Loading from "../common/Loading";
import { getAllNotifications, readAllNotifications } from "../../actions/notificationActions";

const Notifications = (props) => {
  let SECONDS_MS = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      props.getAllNotifications();
    }, SECONDS_MS);

    return () => clearInterval(interval);
  }, []);

  let renderNotifications = <Loading />;

  if (props.notificationsLoading && props.notifications.length === 0) {
    renderNotifications = <Loading />;
  } else {
    renderNotifications = props.notifications.map((notification) => (
      <Menu.Item sx={{ padding: 0 }} key={notification._id}>
        <NotificationItem notification={notification} />
      </Menu.Item>
    ));
  }

  let unreadNotificationsCount = 0;
  props.notifications.forEach((el) => {
    if (!el.read) {
      unreadNotificationsCount = unreadNotificationsCount + 1;
    }
  });

  const readAllNotificationsHandler = () => {
    props.readAllNotifications();
  };

  return (
    <Menu
      placement="end"
      size={400}
      gutter={20}
      control={
        <ActionIcon
          variant="hover"
          size={26}
          color="primary"
          sx={{
            position: "relative",
          }}
        >
          <IoNotificationsOutline size={26} />
          <Box
            sx={(theme) => ({
              position: "absolute",
              top: -5,
              right: -9,
              height: 19,
              width: 19,
              borderRadius: "50%",
              backgroundColor: theme.colors.primary[6],
              color: "white",
            })}
          >
            <span style={{ fontSize: "70%" }}>{unreadNotificationsCount}</span>
          </Box>
        </ActionIcon>
      }
      px={10}
      styles={(theme) => ({ itemLabel: { flex: 1 } })}
    >
      <ScrollArea style={{ height: 350 }} scrollbarSize={5}>
        <Menu.Label
          pl={0}
          sx={(theme) => ({
            fontSize: 16,
            color: theme.colors.primary[5],
          })}
        >
          <Group position="apart">
            <span>
              Notifications
              <Badge size="sm" radius="sm" ml={8}>
                {props.notifications.length}
              </Badge>
            </span>
            <Button size="xs" variant="outline" onClick={readAllNotificationsHandler}>
              Read all
            </Button>
          </Group>
        </Menu.Label>

        {renderNotifications}
      </ScrollArea>
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications,
    notificationsLoading: state.notification.notificationsLoading,
  };
};

export default connect(mapStateToProps, { getAllNotifications, readAllNotifications })(
  Notifications
);
