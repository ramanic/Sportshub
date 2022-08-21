import React, { useState } from "react";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  Badge,
  useMantineTheme,
  MediaQuery,
} from "@mantine/core";

import UserInfoMenu from "./UserInfoMenu";
import UserThemeModal from "./UserThemeModal";

const UserInfo = (props) => {
  const theme = useMantineTheme();
  const [themeMenuOpened, setThemeMenuOpened] = useState(false);

  return (
    <Box
      sx={{
        borderTop: `1px solid ${theme.colors.gray[5]}`,
      }}
    >
      <UnstyledButton
        p="xs"
        radius="sm"
        sx={{
          display: "block",
          width: "100%",
        }}
      >
        <Group>
          <Avatar
            src={props.userInfo.profile.photo ? props.userInfo.profile.photo : null}
            color="primary"
            radius="xl"
          />
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {props.userInfo.name}
              </Text>
              <Text color="dimmed" size="xs">
                {props.userInfo.email}
              </Text>
            </Box>
          </MediaQuery>
          <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {props.userInfo.name}
              </Text>
              <Text color="dimmed" size="xs">
                {props.userInfo.email}
              </Text>
            </Box>
          </MediaQuery>

          <UserInfoMenu setThemeMenuOpened={setThemeMenuOpened} />
          <UserThemeModal
            themeMenuOpened={themeMenuOpened}
            setThemeMenuOpened={setThemeMenuOpened}
          />
        </Group>
      </UnstyledButton>
    </Box>
  );
};

export default UserInfo;
