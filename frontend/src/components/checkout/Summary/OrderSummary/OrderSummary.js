import React from "react";
import { Box, Title, Card, ScrollArea, Group, Text, Button } from "@mantine/core";
import { connect } from "react-redux";

import {
  removeFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from "../../../../actions/cartActions";

import CartItem from "../../../cart/CartItems/CartItem";

const OrderSummary = (props) => {
  return (
    <Box mt={20} sx={{ flex: 1 }}>
      <Box>
        <Title order={4} mb={8}>
          Order Summary
        </Title>
        <Card
          withBorder
          shadow="lg"
          mb={20}
          sx={(style) => ({
            backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
          })}
        >
          <ScrollArea sx={{ height: "400px" }}>
            {props.cart.cartItems.map((item) => (
              <CartItem
                key={item._id}
                cartItem={item}
                removeFromCart={props.removeFromCart}
                increaseCartItemQuantity={props.increaseCartItemQuantity}
                decreaseCartItemQuantity={props.decreaseCartItemQuantity}
              />
            ))}
          </ScrollArea>
        </Card>
        <Card
          withBorder
          shadow="lg"
          sx={(style) => ({
            backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
          })}
        >
          <Group grow position="apart" mb={8}>
            <Text weight={600} size="lg">
              Subtotal :
            </Text>
            <Text weight={600} color="primary" size="lg" sx={{ textAlign: "right" }}>
              Rs {props.cart.totalPrice}
            </Text>
          </Group>
          <Group grow mb={16}>
            <Text weight={600} size="lg">
              Shipping Fee :
            </Text>
            <Text weight={600} color="primary" size="lg" sx={{ textAlign: "right" }}>
              Rs 0
            </Text>
          </Group>
          <Group grow mb={8}>
            <Text weight={800} size="xl">
              TOTAL :
            </Text>
            <Text weight={800} color="primary" size="xl" sx={{ textAlign: "right" }}>
              Rs {props.cart.totalPrice}
            </Text>
          </Group>
        </Card>
        <Button
          fullWidth
          size="lg"
          mt={16}
          onClick={props.proceedToPaymentHandler}
          loading={props.paymentLoading || props.completePurchaseLoading}
        >
          Proceed to Payment
        </Button>
      </Box>
    </Box>
  );
};

export default connect(null, {
  removeFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
})(OrderSummary);
