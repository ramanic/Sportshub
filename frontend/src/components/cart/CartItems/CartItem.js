import React from "react";
import {
  Box,
  Group,
  Text,
  Image,
  ActionIcon,
  ColorSwatch,
  Card,
  useMantineTheme,
} from "@mantine/core";
import { IoRemoveOutline, IoAddOutline, IoTrashBinOutline } from "react-icons/io5";

const CartItem = (props) => {
  // const removeFromCartHandler = () => {
  //   props.removeFromCart(props.cartItem._id);
  // };

  // const increaseQuantityHandler = () => {
  //   props.increaseCartItemQuantity(props.cartItem._id);
  // };

  // const decreaseQuantityHandler = () => {
  //   props.decreaseCartItemQuantity(props.cartItem._id);
  // };

  const theme = useMantineTheme();

  return (
    <Card
      withBorder
      shadow="md"
      mb={15}
      sx={(style) => ({
        backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
      })}
    >
      <Group sx={{ alignItems: "flex-start" }}>
        <Box>
          <Image
            src={props.cartItem.image}
            fit="cover"
            radius="xs"
            alt="Product image"
            width={100}
            height={85}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Text>{props.cartItem.name}</Text>
            <Text weight={600}>Rs. {props.cartItem.price}</Text>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Text color="primary" size="sm">
              Color :
            </Text>
            <ColorSwatch color="#219ebc" size={18} ml={10} />
          </Box>
          <Box mt={10} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Group>
              <ActionIcon
                variant="light"
                color="primary"
                size="sm"
                onClick={() => props.decreaseCartItemQuantity(props.cartItem._id)}
                disabled={props.cartItem.quantity === 1 ? true : false}
              >
                <IoRemoveOutline />
              </ActionIcon>
              <Text size="xs" mx={8}>
                {props.cartItem.quantity}
              </Text>
              <ActionIcon
                variant="light"
                color="primary"
                size="sm"
                onClick={() => props.increaseCartItemQuantity(props.cartItem._id)}
              >
                <IoAddOutline />
              </ActionIcon>
            </Group>
            <Group>
              <ActionIcon
                color="red"
                variant="hover"
                onClick={() => props.removeFromCart(props.cartItem._id)}
              >
                <IoTrashBinOutline color={theme.colors.red[6]} size={22} />
              </ActionIcon>
            </Group>
          </Box>
        </Box>
      </Group>
    </Card>
  );
};

export default CartItem;
