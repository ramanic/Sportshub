import React from "react";
import { Link } from "react-router-dom";
import { ThemeIcon, Button, Group, Text } from "@mantine/core";

const MainLink = (props) => {
  return (
    <Button
      component={Link}
      to={props.to}
      variant="subtle"
      mb={10}
      size="lg"
      radius={0}
      onClick={() => props.sidebarLinkClickHandler(props.tabName)}
      fullWidth
      sx={(theme) => {
        if (props.activeTab === props.tabName) {
          return {
            display: "flex",
            backgroundColor: theme.colors.secondary[5],
            color: theme.colors.gray[0],
            "&:hover": {
              backgroundColor: theme.colors.secondary[4],
            },
          };
        } else {
          return {
            display: "flex",
          };
        }
      }}
    >
      <Group>
        <ThemeIcon color="primary" variant="light">
          {props.icon}
        </ThemeIcon>
        <Text size="sm">{props.label}</Text>
      </Group>
    </Button>
  );
};

export default MainLink;
