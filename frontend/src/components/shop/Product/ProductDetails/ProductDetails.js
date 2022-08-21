import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Title,
  Group,
  Card,
  Text,
  Button,
  Box,
  Image,
  Badge,
  ActionIcon,
  ColorSwatch,
  Progress,
} from "@mantine/core";
import { IoAddOutline, IoRemoveOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";

import { addToCart } from "../../../../actions/cartActions";
import { saveShopItem } from "../../../../actions/shopActions";

const ProductDetails = (props) => {
  const largeScreen = useMediaQuery("(min-width: 1100px)");

  const [productQuantity, setProductQuantity] = useState(1);
  const [productColor, setProductColor] = useState(null);

  const sumValues = props.shopItem.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
  const averageRating =
    props.shopItem.reviews.length === 0 ? 0 : sumValues / props.shopItem.reviews.length;

  const quantityChangeHandler = (type) => {
    let newQuantity = productQuantity;
    if (type === "minus") {
      if (productQuantity !== 1) {
        newQuantity = productQuantity - 1;
      }
    } else if (type === "plus") {
      newQuantity = productQuantity + 1;
    }
    setProductQuantity(newQuantity);
  };

  const addToCartHandler = () => {
    const cartItem = {
      _id: props.shopItem._id,
      image: props.shopItem.image,
      name: props.shopItem.name,
      price: props.shopItem.price,
      category: props.shopItem.category,
      tags: props.shopItem.tags,
    };
    props.addToCart(cartItem);
  };

  // Check if the user has already saved this product
  const isSaved = () => {
    if (props.shopItem.saves.filter((save) => save._id === props.user.user_id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Handle saving of products
  const onSaveHandler = () => {
    props.saveShopItem(props.shopItem._id, "single");
  };

  return (
    <>
      <Group position="apart" mb={16}>
        <Title order={2} mb={0}>
          Details
        </Title>
        <div>
          <Button
            mr={20}
            variant="outline"
            component={Link}
            to={`/shop/${props.shopItem._id}/edit`}
          >
            Edit
          </Button>
          <Button variant="outline" color="red">
            Delete
          </Button>
        </div>
      </Group>
      <Group sx={{ alignItems: "flex-start" }} spacing="xl">
        <Box sx={{ width: largeScreen ? "50%" : "100%" }}>
          <Image
            radius="sm"
            src={props.shopItem.image}
            fit="cover"
            height={largeScreen ? 500 : 400}
            alt={props.shopItem.name}
          />
        </Box>
        <Box>
          <Title order={3}>{props.shopItem.name}</Title>
          <Box mt={8}>
            <Badge radius="sm" size="lg" color="secondary" mr={8}>
              {props.shopItem.category}
            </Badge>
          </Box>
          <Box mt={20}>
            <Text weight={700} size="lg" mb={4} color="primary">
              Rating
            </Text>
            <Progress
              value={(averageRating * 20).toFixed(2)}
              label={`${averageRating.toFixed(2)} / 5`}
              size="xl"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box mt={20}>
            <Text weight={700} size="lg" mb={4} color="primary">
              Available Colors
            </Text>
            <Group spacing="xl">
              <ColorSwatch
                color="#219ebc"
                size={28}
                component="button"
                sx={{ cursor: "pointer" }}
              />
              <ColorSwatch
                color="#ccd5ae"
                size={28}
                component="button"
                sx={{ cursor: "pointer" }}
              />
              <ColorSwatch
                color="#e76f51"
                size={28}
                component="button"
                sx={{ cursor: "pointer" }}
              />
              <ColorSwatch
                color="#b5838d"
                size={28}
                component="button"
                sx={{ cursor: "pointer" }}
              />
            </Group>
          </Box>
          <Box mt={20}>
            <Text weight={700} size="lg" mb={4} color="primary">
              Quantity
            </Text>
            <Group>
              <ActionIcon
                variant="filled"
                color="primary"
                onClick={() => quantityChangeHandler("minus")}
                disabled={productQuantity === 1 ? true : false}
              >
                <IoRemoveOutline size={20} />
              </ActionIcon>
              <Text weight={600} size="xl" mx={8}>
                {productQuantity}
              </Text>
              <ActionIcon
                variant="filled"
                color="primary"
                onClick={() => quantityChangeHandler("plus")}
              >
                <IoAddOutline size={20} />
              </ActionIcon>
            </Group>
          </Box>
          <Box mt={20}>
            <Text weight={700} size="lg" color="primary">
              Price
            </Text>
            <Title order={3}>Rs. {props.shopItem.price}</Title>
          </Box>
          <Box mt={56}>
            {isSaved() ? (
              <Button
                size="lg"
                mr={26}
                variant="outline"
                color="secondary"
                rightIcon={<IoHeart />}
                onClick={onSaveHandler}
              >
                Saved
              </Button>
            ) : (
              <Button
                size="lg"
                mr={26}
                variant="outline"
                color="secondary"
                rightIcon={<IoHeartOutline />}
                onClick={onSaveHandler}
              >
                Save
              </Button>
            )}

            <Button size="lg" rightIcon={<BsCartPlus />} onClick={addToCartHandler}>
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Group>
    </>
  );
};

export default connect(null, { addToCart, saveShopItem })(ProductDetails);
