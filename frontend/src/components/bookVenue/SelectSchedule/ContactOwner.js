import React from "react";
import { Card, Group, Avatar, Text, Box, Button } from "@mantine/core";

const ContactOwner = (props) => {
  return (
    <Card withBorder shadow="md" mt={16}>
      <Group align="flex-start" position="center" sx={{ textAlign: "center" }}>
        <Avatar src={props.venueOwner.profile.photo} radius="xl" size="lg" />
        <Box>
          <Text weight={600}>Contact directly with the owner</Text>
          <Text size="sm" mt={4}>
            Call the Owner at{" "}
            <span style={{ fontWeight: 600, fontSize: 15 }}>{props.venueOwner.profile.phone}</span>{" "}
            or email him at{" "}
            <span style={{ fontWeight: 600, fontSize: 15 }}>{props.venueOwner.email}</span> to talk
            to him directly and enquire about the venue.
          </Text>
          <Button size="xs" variant="outline" mt={12}>
            Chat with Owner
          </Button>
        </Box>
      </Group>
    </Card>
  );
};

export default ContactOwner;
