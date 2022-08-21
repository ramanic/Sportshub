import React from "react";
import { Title, Text, Card, Group, Box } from "@mantine/core";

import ReviewItem from "./ReviewItem";

const ProductReviews = (props) => {
  return (
    <>
      <Title order={4} mb={14}>
        Reviews
      </Title>
      {props.reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </>
  );
};

export default ProductReviews;
