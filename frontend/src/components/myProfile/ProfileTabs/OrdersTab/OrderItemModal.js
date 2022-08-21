import React from "react";
import { Link } from "react-router-dom";
import { Modal, Text, Box, Group, Card, Avatar, Image } from "@mantine/core";

const OrderItemModal = (props) => {
  return (
    <Modal
      opened={props.opened}
      onClose={() => props.setOpened(false)}
      title={
        <Text weight={700} size="lg">
          Order Details
        </Text>
      }
      centered
    >
      <Group direction="column">
        <Text weight={600}>Order Items</Text>
        {props.orderItem.products.map((product) => (
          <Card
            withBorder
            key={product._id}
            sx={{ width: "100%" }}
            p="xs"
            component={Link}
            to={`/shop/${product.product._id}`}
          >
            <Group>
              <Image width={100} height={70} radius="sm" src={product.product.image} />

              <Box>
                <Text weight={600}>{product.product.name}</Text>
                <Text>Quantity: {product.quantity}</Text>
              </Box>
            </Group>
          </Card>
        ))}
      </Group>
      <Group direction="column" mt={30}>
        <Text weight={600}>Shipping Details</Text>
        <Text>Name: {props.orderItem.name}</Text>
        <Text>Address: {props.orderItem.address + "," + props.orderItem.city}</Text>
        <Text>Phone: {props.orderItem.phone}</Text>
      </Group>
    </Modal>
  );
};

export default OrderItemModal;
