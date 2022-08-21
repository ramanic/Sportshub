import React from "react";
import { Box, Text } from "@mantine/core";
import { connect } from "react-redux";

import Loading from "../../common/Loading";
import CartItem from "./CartItem";
import {
  removeFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from "../../../actions/cartActions";

const CartItems = (props) => {
  let renderCartItems = <Loading />;

  if (props.cart.cartItems.length === 0) {
    renderCartItems = <Text>Cart is empty</Text>;
  } else {
    renderCartItems = props.cart.cartItems.map((item) => (
      <CartItem
        key={item._id}
        cartItem={item}
        removeFromCart={props.removeFromCart}
        increaseCartItemQuantity={props.increaseCartItemQuantity}
        decreaseCartItemQuantity={props.decreaseCartItemQuantity}
      />
    ));
  }

  return <Box>{renderCartItems}</Box>;
};

export default connect(null, {
  removeFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
})(CartItems);
