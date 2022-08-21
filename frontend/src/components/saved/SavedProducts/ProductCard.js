import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Card,
  Image,
  Title,
  Text,
  Badge,
  Box,
  Button,
  Group,
  Progress,
  ActionIcon,
  Skeleton,
} from "@mantine/core";
import { IoArrowForwardOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";

import { addToCart } from "../../../actions/cartActions";
import { saveShopItem } from "../../../actions/shopActions";

const ProductCard = (props) => {
  const sumValues = props.product.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
  const averageRating =
    props.product.reviews.length === 0 ? 0 : sumValues / props.product.reviews.length;

  // Check if the user has already saved this product
  const isSaved = () => {
    if (props.product.saves.filter((save) => save === props.user.user_id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Handle saving of products
  const onSaveHandler = () => {
    props.saveShopItem(props.product._id, "my-saves");
    window.location.reload();
  };

  const addToCartHandler = () => {
    const cartItem = {
      _id: props.product._id,
      image: props.product.image,
      name: props.product.name,
      price: props.product.price,
      category: props.product.category,
      tags: props.product.tags,
    };
    props.addToCart(cartItem);
  };

  return (
    <Card
      ref={props.innerRef}
      withBorder
      shadow="md"
      sx={(style) => ({
        backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
      })}
    >
      <Card.Section>
        <Image
          src={props.product.image ? props.product.image : "https://picsum.photos/600"}
          height={250}
          alt={props.product.name}
        />
      </Card.Section>
      <Card.Section mt={6} px={12}>
        <Title order={4}>{props.product.name}</Title>
        <Box>
          <Badge radius="sm" color="secondary" mr={8}>
            {props.product.category}
          </Badge>
        </Box>
      </Card.Section>
      <Card.Section mt={10} px={12}>
        <Group position="apart">
          <Progress
            value={(averageRating * 20).toFixed(2)}
            label={`${averageRating.toFixed(2)} / 5`}
            size="xl"
            sx={{ width: "40%" }}
          />
          <Group>
            {isSaved() ? (
              <ActionIcon
                size="md"
                variant="light"
                mr={6}
                color="secondary"
                onClick={onSaveHandler}
              >
                <IoHeart size={18} />
              </ActionIcon>
            ) : (
              <ActionIcon
                size="md"
                variant="light"
                mr={6}
                color="secondary"
                onClick={onSaveHandler}
              >
                <IoHeartOutline size={18} />
              </ActionIcon>
            )}

            <ActionIcon size="md" variant="light" color="secondary" onClick={addToCartHandler}>
              <BsCartPlus size={20} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
      <Card.Section mt={16} mb={8} px={12}>
        <Group position="apart">
          <Title order={4}>Rs. {props.product.price}</Title>
          <Button
            component={Link}
            to={`/shop/${props.product._id}`}
            rightIcon={<IoArrowForwardOutline size={16} />}
          >
            Details
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default connect(null, { addToCart, saveShopItem })(ProductCard);
