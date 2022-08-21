import React from "react";
import { Grid, Box } from "@mantine/core";

import ProductCard from "./ProductCard";

const ProductsList = (props) => {
  return (
    <Box mt={16}>
      <Grid columns={12} gutter={36}>
        {props.products.map((item, index) => (
          <Grid.Col xs={12} md={6} xl={4} key={item._id}>
            <ProductCard product={item} user={props.user} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsList;
