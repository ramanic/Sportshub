import React from "react";
import { Group, ActionIcon, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";

const EditProductImages = (props) => {
  return (
    <Dropzone
      accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.gif, MIME_TYPES.webp]}
      radius="md"
      multiple
      onDrop={props.onProductImageDrop}
      onReject={props.onProductImageReject}
      sx={{
        height: props.productImage && props.productImage.length > 5 ? 200 : 100,
        width: "100%",
        margin: "2px auto",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
      }}
    >
      {(status) => {
        if (props.prevImageLink && !props.productImage) {
          return (
            <img
              alt="Product image"
              src={props.prevImageLink}
              style={{
                height: "60px",
                width: "75px",
                borderRadius: "5%",
                objectFit: "cover",
                marginRight: 20,
                marginBottom: 20,
              }}
            />
          );
        }
        if (!props.productImage) {
          return (
            <div>
              <Group align="center" position="center">
                <ActionIcon variant="hover" color={status.rejected ? "red" : "primary"}>
                  {status.rejected ? <IoCloseOutline size={20} /> : <IoImageOutline size={20} />}
                </ActionIcon>
              </Group>
            </div>
          );
        } else {
          const url = props.productImage.map((pic) => URL.createObjectURL(pic));
          return url.map((picLink) => (
            <img
              key={picLink}
              alt="Product Image"
              src={picLink}
              style={{
                height: "60px",
                width: "75px",
                borderRadius: "5%",
                objectFit: "cover",
                marginRight: 20,
                marginBottom: 20,
              }}
            />
          ));
        }
      }}
    </Dropzone>
  );
};

export default EditProductImages;
