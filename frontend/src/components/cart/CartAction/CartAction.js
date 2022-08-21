import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Group, Button, Text, Select, Divider } from "@mantine/core";

const shippingValues = [
  { value: "free", label: "Free Shipping" },
  { value: "standard", label: "Standard Shipping" },
  { value: "express", label: "Express Shipping" },
];

const CartAction = (props) => {
  const [shippingType, setShippingType] = useState("free");
  return (
    <Box>
      <Group mb={26} position="apart">
        <Text weight={600} size="xl" color="primary">
          Total : Rs. {props.totalPrice}
        </Text>
        <Select data={shippingValues} value={shippingType} onChange={setShippingType} />
      </Group>
      <Button onClick={props.checkoutClickHandler} fullWidth size="lg" disabled={props.disabled}>
        Checkout
      </Button>
    </Box>
  );
};

export default CartAction;
