import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Text, Title, Card, Box, Slider, Textarea } from "@mantine/core";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

import { reviewShopItem } from "../../../../actions/shopActions";

const sliderMarks = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

const schema = Joi.object({
  reviewText: Joi.string(),
  reviewNumber: Joi.number(),
});

const NewReview = (props) => {
  const smallScreen = useMediaQuery("(min-width: 768px)");

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      reviewText: "",
    },
  });

  const [reviewNumber, setReviewNumber] = useState(3);

  const newReviewHandler = () => {
    const newReview = {
      reviewText: form.values.reviewText,
      reviewNumber: reviewNumber,
    };
    props.reviewShopItem(props.shopItemId, newReview);
    form.setFieldValue("reviewText", "");
    setReviewNumber(3);
  };

  return (
    <Box>
      <Title order={4}>Write a Review</Title>
      <Card withBorder shadow="lg" mt={4}>
        <Text>Review value</Text>
        <Slider
          marks={sliderMarks}
          sx={{ width: smallScreen ? "50%" : "100%" }}
          min={1}
          max={5}
          mt={8}
          mb={25}
          step={0.5}
          value={reviewNumber}
          onChange={setReviewNumber}
          size="xl"
          label={null}
        />
        <Text>Review text</Text>
        <Textarea
          mt={4}
          minRows={1}
          autosize
          maxRows={3}
          value={form.values.reviewText}
          onChange={(event) => form.setFieldValue("reviewText", event.currentTarget.value)}
          error={form.errors.reviewText}
        />
        <Button mt={12} onClick={newReviewHandler} loading={props.reviewShopItemLoading}>
          Submit
        </Button>
      </Card>
    </Box>
  );
};

export default connect(null, { reviewShopItem })(NewReview);
