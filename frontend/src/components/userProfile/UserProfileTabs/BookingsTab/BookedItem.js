import React from "react";
import { Box, Card, Group, Text, Image, Title, Button, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IoStar } from "react-icons/io5";

const BookedItem = () => {
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
          src="https://picsum.photos/200"
          height={smallScreen ? 110 : 90}
          width={smallScreen ? 150 : 120}
          radius="sm"
        />
        <Box sx={{ flexGrow: 1, alignSelf: "stretch" }}>
          <Group position="apart">
            <Title order={smallScreen ? 4 : 5}>Maitidevi Futsal</Title>
            <Text size={smallScreen ? "sm" : "xs"}>7 days ago</Text>
          </Group>
          <Text size="xs">Maitidevi, Kathamandu</Text>
          <Group position="apart" sx={{ marginTop: smallScreen ? 30 : 15, alignItems: "end" }}>
            <Text size="sm">
              <IoStar size={14} color={theme.colors.primary[6]} style={{ marginRight: 10 }} />
              4.2
            </Text>
            <Button variant="outline" color="secondary" size={smallScreen ? "sm" : "xs"}>
              View Venue
            </Button>
          </Group>
        </Box>
      </Group>
    </Card>
  );
};

export default BookedItem;
