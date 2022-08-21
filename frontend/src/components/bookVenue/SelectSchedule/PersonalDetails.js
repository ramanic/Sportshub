import React from "react";
import { Card, Box, Group, Title, TextInput, Checkbox, Text } from "@mantine/core";

const PersonalDetails = (props) => {
  const form = props.form;

  return (
    <Card withBorder shadow="md" mt={16}>
      <Box>
        <Title order={4} mb={8}>
          Personal Details
        </Title>
        <Group direction="column" grow>
          <TextInput
            label="Email"
            placeholder="Email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email}
          />
          <TextInput
            label="Fullname"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
            error={form.errors.name}
          />
          <TextInput
            label="Address"
            placeholder="Your address"
            value={form.values.address}
            onChange={(event) => form.setFieldValue("address", event.currentTarget.value)}
            error={form.errors.address}
          />
          <TextInput
            placeholder="Your phone number"
            label="Phone Number"
            value={form.values.phoneNumber}
            onChange={(event) => form.setFieldValue("phoneNumber", event.currentTarget.value)}
            error={form.errors.phoneNumber}
          />
          <Checkbox
            mt={8}
            checked={form.values.challenge}
            onChange={(event) => form.setFieldValue("challenge", event.currentTarget.checked)}
            label={<Text color="secondary">Add as a challenge</Text>}
            color="secondary"
          />
        </Group>
      </Box>
    </Card>
  );
};

export default PersonalDetails;
