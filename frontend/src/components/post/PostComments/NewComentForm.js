import React from "react";
import { connect } from "react-redux";
import { Card, Title, Button, Textarea } from "@mantine/core";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";

import { addAComment } from "../../../actions/postActions";

const schema = Joi.object({
  comment: Joi.string().required().messages({
    "string.empty": "Cannot post an empty comment.",
  }),
});

const NewCommentForm = (props) => {
  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      comment: "",
    },
  });

  // Handle new comment addition
  const onCommentHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      props.addAComment(props.postId, form.values);
      form.setValues({ comment: "" });
    }
  };

  return (
    <Card
      withBorder
      radius="md"
      shadow="md"
      sx={(style) => ({
        maxWidth: "600px",
        margin: "20px auto",
        backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
      })}
    >
      <Title order={5} mb={10}>
        Post a new Comment
      </Title>
      <form onSubmit={onCommentHandler}>
        <Textarea
          placeholder="Comment text"
          minRows={1}
          autosize
          maxRows={4}
          mb={10}
          value={form.values.comment}
          onChange={(event) => form.setFieldValue("comment", event.currentTarget.value)}
          error={form.errors.comment}
        />
        <Button type="submit" sx={{ marginLeft: "auto" }} loading={props.addCommentLoading}>
          Comment
        </Button>
      </form>
    </Card>
  );
};

export default connect(null, { addAComment })(NewCommentForm);
