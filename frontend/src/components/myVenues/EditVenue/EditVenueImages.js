import React from "react";
import { Group, ActionIcon, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";

const EditVenueImages = (props) => {
  return (
    <Dropzone
      accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.gif, MIME_TYPES.webp]}
      radius="md"
      multiple
      onDrop={props.onVenueImageDrop}
      onReject={props.onVenueImageReject}
      sx={{
        height: props.venueImage && props.venueImage.length > 5 ? 200 : 100,
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
        if (props.prevImageLink && !props.venueImage) {
          return props.prevImageLink.map((image) => (
            <img
              alt="Venue image"
              key={image}
              src={image}
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
        if (!props.venueImage) {
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
          const url = props.venueImage.map((pic) => URL.createObjectURL(pic));
          return url.map((picLink) => (
            <img
              key={picLink}
              alt="Venue Image"
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

export default EditVenueImages;
