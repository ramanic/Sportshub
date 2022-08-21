import React from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Text, Box, Button, Group, ScrollArea, Badge } from "@mantine/core";
import { connect } from "react-redux";

import CartItems from "./CartItems/CartItems";
import CartAction from "./CartAction/CartAction";
import { clearCart } from "../../actions/cartActions";

const Cart = (props) => {
  const navigate = useNavigate();

  const checkoutClickHandler = () => {
    props.setCartOpened(false);
    navigate("/shop/checkout", { replace: true });
  };

  let cartItemsCount = 0;
  props.cart.cartItems.forEach((el) => {
    cartItemsCount = cartItemsCount + Number(el.quantity);
  });

  const cartTitle = (
    <Text weight={600} size="xl">
      My Cart ({cartItemsCount})
      <Button ml={16} size="xs" variant="subtle" onClick={props.clearCart}>
        Clear cart
      </Button>
    </Text>
  );

  return (
    <Drawer
      opened={props.cartOpened}
      onClose={() => props.setCartOpened(false)}
      size={600}
      padding="sm"
      position="right"
      title={cartTitle}
    >
      <Group direction="column" grow position="apart" sx={{ height: "90%" }}>
        <ScrollArea sx={{ height: "40%" }}>
          <CartItems cart={props.cart} />
        </ScrollArea>
        <CartAction
          checkoutClickHandler={checkoutClickHandler}
          disabled={props.cart.cartItems.length === 0}
          totalPrice={props.cart.totalPrice}
        />
      </Group>
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { clearCart })(Cart);
