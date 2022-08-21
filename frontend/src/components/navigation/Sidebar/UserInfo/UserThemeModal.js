import React, { useState } from "react";
import {
  Modal,
  Group,
  Box,
  Text,
  Card,
  SegmentedControl,
  Center,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { IoSunnyOutline, IoMoonOutline, IoCheckmarkOutline } from "react-icons/io5";
import { useMantineColorScheme } from "@mantine/core";

import themeColors from "../../../../utils/mantine/themeColors";

const UserThemeModal = (props) => {
  const theme = useMantineTheme();
  // const { colorScheme, toggleColorScheme, colorShade, setColorShade } = useMantineColorScheme();
  const { toggleColorScheme } = useMantineColorScheme();

  const colorShadeChangeHandler = (value) => {
    toggleColorScheme.toggleColorShade.toggleColorShade(value);
  };

  return (
    <Modal
      centered
      opened={props.themeMenuOpened}
      onClose={() => props.setThemeMenuOpened(false)}
      title={
        <Text weight={600} size="lg">
          Customize your theme
        </Text>
      }
    >
      <Box mb={16}>
        <Text weight={600} mb={6} color="primary" size="md">
          Color
        </Text>

        <Card
          withBorder
          shadow="xl"
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            borderColor: theme.colors.primary[2],
          })}
        >
          {Object.keys(themeColors).map((key) => {
            return (
              <Box
                key={key}
                sx={{
                  backgroundColor: themeColors[key][5],
                  height: 40,
                  width: 40,
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => colorShadeChangeHandler(key)}
              >
                {toggleColorScheme.colorShade.colorShade === key ? (
                  <IoCheckmarkOutline size={30} color="white" />
                ) : null}
              </Box>
            );
          })}
        </Card>
      </Box>
      <Box>
        <Text weight={600} mb={6} color="primary" size="md">
          Theme
        </Text>
        <Card
          withBorder
          shadow="xl"
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            borderColor: theme.colors.primary[2],
          })}
        >
          <SegmentedControl
            value={toggleColorScheme.colorScheme.colorScheme}
            onChange={toggleColorScheme.toggleColorScheme.toggleColorScheme}
            color="primary"
            size="md"
            sx={{ display: "flex", flexGrow: 1 }}
            data={[
              {
                value: "light",
                label: (
                  <Center>
                    <IoSunnyOutline size={22} />
                    <Box ml={10}>Light</Box>
                  </Center>
                ),
              },
              {
                value: "dark",
                label: (
                  <Center>
                    <IoMoonOutline size={20} />
                    <Box ml={10}>Dark</Box>
                  </Center>
                ),
              },
            ]}
          />
        </Card>
      </Box>
    </Modal>
  );
};

export default UserThemeModal;
