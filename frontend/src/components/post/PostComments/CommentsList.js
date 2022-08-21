import React from "react";
import { Box, Card, Title } from "@mantine/core";

import CommentItem from "./CommentItem";

const CommentsList = (props) => {
  // Sort comments by newest first
  const comments = props.comments.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <>
      <Card
        withBorder
        radius="md"
        shadow="md"
        sx={(style) => ({
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
        })}
      >
        <Title order={3} mb={16}>
          Recent Comments
        </Title>
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </Card>
    </>
  );
};

export default CommentsList;
