import React, { memo } from "react";
import { Group, ActionIcon, Avatar } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";

const UploadVenueImages = (props) => {
  return (
    <Dropzone
      accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.gif, MIME_TYPES.webp]}
      radius="sm"
      multiple
      onDrop={props.onVenueImageDrop}
      onReject={props.onVenueImageReject}
      sx={{
        width: "100%",
        margin: "2px auto",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {(status) => {
        if (!props.venueImages) {
          return (
            <div>
              <Group align="center" position="center">
                <ActionIcon variant="hover" color={status.rejected ? "red" : "primary"}>
                  {status.rejected ? <IoCloseOutline size={20} /> : <IoImageOutline size={20} />}
                </ActionIcon>
                <p>Add venue photos</p>
              </Group>
            </div>
          );
        } else {
          const url = props.venueImages.map((pic) => URL.createObjectURL(pic));
          return url.map((picLink) => (
            <Avatar size="xl" key={picLink} src={picLink} mr={16} mb={16} />
          ));
        }
      }}
    </Dropzone>
  );
};

export default memo(UploadVenueImages, (prevProps, nextProps) => {
  return nextProps.venueImages === prevProps.venueImages;
});
