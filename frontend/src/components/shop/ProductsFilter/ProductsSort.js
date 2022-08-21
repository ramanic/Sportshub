import React from "react";
import { Select } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IoArrowDownOutline } from "react-icons/io5";
const data = [
  { label: "Name", value: "name" },
  { label: "Price", value: "price" },
  { label: "Rating", value: "rating" },
];

const ProductsSort = (props) => {
  const smallScreen = useMediaQuery("(min-width: 768px)");

  return (
    <Select
      placeholder="Sort By"
      rightSection={<IoArrowDownOutline size={14} />}
      value={props.sortBy}
      onChange={props.productSortByHandler}
      data={data}
      transition="pop-top-left"
      transitionDuration={150}
      transitionTimingFunction="ease"
      sx={{
        width: !smallScreen ? "40%" : null,
      }}
    />
  );
};

export default ProductsSort;
