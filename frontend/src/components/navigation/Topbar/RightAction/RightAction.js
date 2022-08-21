import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Group, ActionIcon, Badge, Box } from "@mantine/core";
import { IoChatbubbleOutline, IoCartOutline } from "react-icons/io5";

import Notifications from "../../../notifications/Notifications";
import Cart from "../../../cart/Cart";

const RightAction = (props) => {
  const [cartOpened, setCartOpened] = useState(false);

  let cartItemsCount = 0;
  props.cart.cartItems.forEach((el) => {
    cartItemsCount = cartItemsCount + Number(el.quantity);
  });

  return (
    <>
      <Group
        sx={{
          "@media(max-width:320px)": {
            gap: 0,
          },
        }}
      >
        <ActionIcon
          variant="hover"
          size={26}
          mx={10}
          color="primary"
          onClick={() => setCartOpened(true)}
          sx={{
            position: "relative",
          }}
        >
          <IoCartOutline size={26} />

          <Box
            sx={(theme) => ({
              position: "absolute",
              top: -5,
              right: -9,
              height: 19,
              width: 19,
              borderRadius: "50%",
              backgroundColor: theme.colors.primary[6],
              color: "white",
            })}
          >
            <span style={{ fontSize: "70%" }}>{cartItemsCount}</span>
          </Box>
        </ActionIcon>

        <ActionIcon
          variant="hover"
          size={26}
          mx={10}
          color="primary"
          component={Link}
          to="/chat"
          sx={{
            position: "relative",
          }}
        >
          <IoChatbubbleOutline size={26} />
        </ActionIcon>
        <Notifications />
      </Group>
      <Cart cartOpened={cartOpened} setCartOpened={setCartOpened} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(RightAction);
