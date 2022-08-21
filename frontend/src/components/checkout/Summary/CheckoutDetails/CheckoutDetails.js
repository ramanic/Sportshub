import React from "react";
import { Box, Title, TextInput, Group, Checkbox, Text, Button } from "@mantine/core";

const CheckoutDetails = (props) => {
  const form = props.form;

  return (
    <Box mt={20} sx={{ flex: 1 }}>
      <Box>
        <Title order={4} mb={8}>
          Personal Information
        </Title>
        <Group direction="column" grow>
          <TextInput
            label="Email"
            placeholder="Email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email}
          />
        </Group>
      </Box>
      <Box mt={30}>
        <Title order={4} mb={8}>
          Shipping Address
        </Title>
        <Group direction="column" grow>
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
            label="City"
            placeholder="Your city"
            value={form.values.city}
            onChange={(event) => form.setFieldValue("city", event.currentTarget.value)}
            error={form.errors.city}
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
            checked={form.values.saveDetails}
            onChange={(event) => form.setFieldValue("saveDetails", event.currentTarget.checked)}
            label={<Text color="secondary">Save shipping details</Text>}
            color="secondary"
          />
        </Group>
      </Box>
      <Box mt={30}>
        <Title order={4} mb={8}>
          Apply Coupon
        </Title>
        <Group>
          <TextInput
            placeholder="Enter coupon code"
            sx={{ flexGrow: 1 }}
            value={form.values.couponCode}
            onChange={(event) => form.setFieldValue("couponCode", event.currentTarget.value)}
          />
          <Button color="secondary">Apply</Button>
        </Group>
      </Box>
    </Box>
  );
};

export default CheckoutDetails;
