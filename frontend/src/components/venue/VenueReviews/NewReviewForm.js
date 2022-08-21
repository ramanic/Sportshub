import React, { useState } from "react";
import { Modal, Box, Slider, Text, Textarea, Button } from "@mantine/core";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import { connect } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";

import { reviewVenue } from "../../../actions/venueActions";

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

const NewReviewForm = (props) => {
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
    props.reviewVenue(props.venueId, newReview, props.setOpened);
    form.setFieldValue("reviewText", "");
    setReviewNumber(3);
  };

  return (
    <Modal
      centered
      opened={props.opened}
      onClose={() => props.setOpened(false)}
      title="Write a Review"
    >
      <Box mt={4}>
        <Text>Review value</Text>
        <Slider
          marks={sliderMarks}
          min={1}
          max={5}
          mt={8}
          mb={40}
          step={0.5}
          value={reviewNumber}
          onChange={setReviewNumber}
          size="xl"
          label={null}
        />
        <Text>Review text</Text>
        <Textarea
          mt={4}
          minRows={2}
          autosize
          maxRows={4}
          value={form.values.reviewText}
          onChange={(event) => form.setFieldValue("reviewText", event.currentTarget.value)}
          error={form.errors.reviewText}
        />
        <Button mt={20} onClick={newReviewHandler} loading={props.reviewVenueLoading}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default connect(null, { reviewVenue })(NewReviewForm);
