import React, { useState } from "react";
import { Card, Title, Badge, Text, Group, Box } from "@mantine/core";

import OrderItemModal from "./OrderItemModal";

const OrderItem = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <Card withBorder mb={16} shadow="md">
      <Group position="apart" align="flex-start">
        <Box sx={{ textAlign: "center" }}>
          <Text weight={600} mb={4} color="primary">
            Order Id
          </Text>
          <Text onClick={() => setOpened(true)} sx={{ cursor: "pointer" }}>
            {props.order._id}
          </Text>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Text weight={600} mb={4} color="primary">
            Amount
          </Text>
          <Text>Rs. {props.order.totalCost}</Text>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Text weight={600} mb={4} color="primary">
            Ordered At
          </Text>
          <Text>{new Date(props.order.createdAt).toLocaleString()}</Text>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Text weight={600} mb={4} color="primary">
            Products
          </Text>
          <Text>{props.order.products.length}</Text>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Text weight={600} mb={4} color="primary">
            Payment
          </Text>
          <Badge radius="sm" color="primary">
            Khalti
          </Badge>
        </Box>
      </Group>
      <OrderItemModal opened={opened} setOpened={setOpened} orderItem={props.order} />
    </Card>
  );
};

export default OrderItem;
