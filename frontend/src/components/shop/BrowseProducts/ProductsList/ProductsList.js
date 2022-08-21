import React, { useState } from "react";
import { Title, Grid, Box, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import ProductCard from "./ProductCard";
import ProductsSort from "../../ProductsFilter/ProductsSort";

const ProductsList = (props) => {
  const smallScreen = useMediaQuery("(min-width: 768px)");

  let { shopItems } = props;

  if (props.sortBy === "rating") {
    let oldProducts = [...props.shopItems];
    let newShopItems = oldProducts.sort((a, b) => {
      let sumValuesa = a.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
      let averageRatinga = a.reviews.length === 0 ? 0 : sumValuesa / a.reviews.length;
      let sumValuesb = b.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
      let averageRatingb = b.reviews.length === 0 ? 0 : sumValuesb / b.reviews.length;
      return averageRatingb - averageRatinga;
    });
    shopItems = newShopItems;
  }

  return (
    <Box>
      <Group position="apart" sx={{ alignItems: "flex-start" }}>
        <Title order={smallScreen ? 3 : 4} mb={30}>
          Browse Products
        </Title>
        <ProductsSort sortBy={props.sortBy} productSortByHandler={props.productSortByHandler} />
      </Group>

      <Grid columns={12} gutter={36}>
        {shopItems.map((item, index) => {
          if (shopItems.length === index + 1) {
            return (
              <Grid.Col xs={12} md={6} xl={4} key={item._id}>
                <ProductCard product={item} innerRef={props.innerRef} user={props.user} />
              </Grid.Col>
            );
          } else {
            return (
              <Grid.Col xs={12} md={6} xl={4} key={item._id}>
                <ProductCard product={item} user={props.user} />
              </Grid.Col>
            );
          }
        })}
      </Grid>
    </Box>
  );
};

export default ProductsList;
