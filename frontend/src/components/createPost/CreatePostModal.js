import React, { useState } from "react";
import { Card, Modal, Text, Textarea, Avatar, Group, Button, MultiSelect } from "@mantine/core";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";

import UploadPostImages from "./UploadPostImages";
import isEmpty from "../../utils/isEmpty";

const schema = Joi.object({
  images: Joi.any().allow(null),
  caption: Joi.string().allow(""),
  tags: Joi.array().min(1).messages({
    "array.min": "Select at least one tag",
  }),
});

const CreatePostModal = (props) => {
  const [postTags, setPostTags] = useState([
    "Football",
    "Cricket",
    "Tennis",
    "Basketball",
    "Hockey",
  ]);

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      images: null,
      caption: "",
      tags: [],
    },
  });

  // Function to submit the form
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (isEmpty(form.values.images) && isEmpty(form.values.caption)) {
      form.setFieldError("caption", "Caption or image is required");
    } else {
      const { hasErrors, errors } = form.validate();
      if (!hasErrors) {
        let postData = new FormData();
        Object.keys(form.values).forEach((value) => {
          if (value === "images" && form.values.images) {
            for (let i = 0; i < form.values.images.length; i++) {
              postData.append("images", form.values.images[i]);
            }
          } else if (value === "tags") {
            postData.append([value], JSON.stringify(form.values[value]));
          } else {
            postData.append([value], form.values[value]);
          }
        });
        props.createAPost(postData, props.setInputFocused, form.setValues);
      }
    }
  };

  const onPostImageDrop = (images) => {
    form.setFieldValue("images", images);
  };

  const onPostImageReject = () => {
    console.log("File rejected");
  };

  return (
    <Modal
      opened={props.inputFocused}
      onClose={() => props.setInputFocused(false)}
      title={<Text weight={600}>Create a post</Text>}
    >
      <Group>
        <Avatar radius="xl" src={props.userInfo.profile.photo} />
        <Text size="sm">{props.userInfo.name}</Text>
      </Group>
      <form onSubmit={formSubmitHandler}>
        <Group grow mt={20}>
          <Textarea
            placeholder={`Type something ${props.userInfo.username}`}
            autosize
            minRows={2}
            maxRows={5}
            value={form.values.caption}
            onChange={(event) => form.setFieldValue("caption", event.currentTarget.value)}
            error={form.errors.caption}
          />
        </Group>
        <Group grow mt={20}>
          <UploadPostImages
            postImage={form.values.images}
            onPostImageDrop={onPostImageDrop}
            onPostImageReject={onPostImageReject}
          />
        </Group>
        <Group grow mt={20}>
          <MultiSelect
            label="Select some tags"
            placeholder="Select some tags"
            data={postTags}
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => setPostTags((current) => [...current, query])}
            onChange={(value) => form.setFieldValue("tags", value)}
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
            error={form.errors.tags}
          />
        </Group>
        <Group grow mt={30}>
          <Button type="submit" loading={props.createPostLoading}>
            Post
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CreatePostModal;
