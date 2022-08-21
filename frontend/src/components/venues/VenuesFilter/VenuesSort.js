import React from "react";
import { Select } from "@mantine/core";
import { IoArrowDownOutline } from "react-icons/io5";

const data = [
  { label: "Name", value: "name" },
  { label: "Rating", value: "rating" },
];

const VenuesSort = (props) => {
  return (
    <Select
      placeholder="Sort By"
      rightSection={<IoArrowDownOutline size={14} />}
      value={props.sortBy}
      onChange={props.venuesSortByHandler}
      data={data}
      transition="pop-top-left"
      transitionDuration={150}
      transitionTimingFunction="ease"
    />
  );
};

export default VenuesSort;
