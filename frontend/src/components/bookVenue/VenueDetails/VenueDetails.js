import React from "react";
import { Card, Image, Text, Group, Box, Title, Badge, ActionIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IoHeartOutline } from "react-icons/io5";

const VenueDetails = (props) => {
  const xsScreen = useMediaQuery("(min-width: 500px)");
  const smallScreen = useMediaQuery("(min-width: 700px)");
  const mediumScreen = useMediaQuery("(min-width: 992px)");
  const largeScreen = useMediaQuery("(min-width: 1200px)");
  const xlScreen = useMediaQuery("(min-width: 1400px)");

  return (
    <Card withBorder shadow="md" p={"xs"}>
      <Group align="flex-start" spacing={mediumScreen ? "md" : "xs"}>
        <Image src={props.currentVenue.images[0]} height={85} width={120} radius="sm" />
        <Box>
          <Title order={mediumScreen ? 4 : 5}>{props.currentVenue.name}</Title>
          <Text size={smallScreen ? "sm" : "xs"}>
            {props.currentVenue.address.city + " ," + props.currentVenue.address.district}
          </Text>
          <Badge radius="sm" color="secondary" my={10}>
            {props.currentVenue.category}
          </Badge>
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
            <Text weight={700} size={largeScreen ? "md" : "sm"}>
              Rs. 1600
            </Text> */}
            <ActionIcon
              size={mediumScreen ? "md" : "sm"}
              variant="light"
              ml={largeScreen ? 16 : 0}
              color="secondary"
            >
              <IoHeartOutline size={mediumScreen ? 18 : 16} />
            </ActionIcon>
          </Group>
        </Box>
      </Group>
    </Card>
  );
};

export default VenueDetails;
