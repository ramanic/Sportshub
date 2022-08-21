import React from "react";
import { Card, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import ShopContentItem from "./ShopContentItem";
import Loading from "../../../common/Loading";

const ShopContent = (props) => {
  const xl = useMediaQuery("(min-width: 1400px)");

  let renderProducts = <Loading />;

  if (props.recommendedProducts.length === 0 && props.recommendedProductsLoading) {
    renderProducts = <Loading />;
  } else {
    renderProducts = props.recommendedProducts.map((product) => (
      <ShopContentItem key={product._id} product={product} />
    ));
  }

  return (
    <Card mt={12} withBorder shadow="md" py={xl ? "sm" : "xs"} px={xl ? "sm" : "xs"}>
      <Title order={5} mb={16}>
        Recommended Products
      </Title>
      {renderProducts}
    </Card>
  );
};

export default ShopContent;
