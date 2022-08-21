import React, { memo } from "react";
import { Group, ActionIcon, Avatar } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";

const UploadPostImages = (props) => {
  return (
    <Dropzone
      accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.gif, MIME_TYPES.webp]}
      radius="sm"
      multiple
      onDrop={props.onPostImageDrop}
      onReject={props.onPostImageReject}
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
        if (!props.postImage) {
          return (
            <div>
              <Group align="center" position="center">
                <ActionIcon variant="hover" color={status.rejected ? "red" : "primary"}>
                  {status.rejected ? <IoCloseOutline size={20} /> : <IoImageOutline size={20} />}
                </ActionIcon>
                <p>Add some photos</p>
              </Group>
            </div>
          );
        } else {
          const url = props.postImage.map((pic) => URL.createObjectURL(pic));
          return url.map((picLink) => (
            <Avatar size="xl" key={picLink} src={picLink} mr={16} mb={16} />
          ));
        }
      }}
    </Dropzone>
  );
};

export default memo(UploadPostImages, (prevProps, nextProps) => {
  return nextProps.postImage === prevProps.postImage;
});
