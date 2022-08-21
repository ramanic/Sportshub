import React, { useState } from "react";
import { Card, Title, Text, Group, Button } from "@mantine/core";

import ReviewCard from "./ReviewCard";
import NewReviewForm from "./NewReviewForm";

const VenueReviews = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <Card withBorder shadow="md" mt={20}>
      <Group align="center" position="apart" mb={16}>
        <Title order={5}>Reviews</Title>
        <Button size="xs" variant="outline" onClick={() => setOpened(true)}>
          Write a Review
        </Button>
      </Group>

      {props.reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}

      <NewReviewForm
        opened={opened}
        setOpened={setOpened}
        reviewVenueLoading={props.reviewVenueLoading}
        venueId={props.venueId}
      />
    </Card>
  );
};

export default VenueReviews;
