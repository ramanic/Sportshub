import React from "react";
import { Group, ActionIcon } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";

const EditProfilePicture = (props) => {
  return (
    <Dropzone
      accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.gif, MIME_TYPES.webp]}
      radius="xl"
      onDrop={props.onProfilePictureDrop}
      onReject={props.onProfilePictureReject}
      sx={{
        borderRadius: "50%",
        height: 100,
        width: 100,
        margin: "8px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {(status) => {
        if (props.prevImageLink && !props.profilePicture) {
          return (
            <img
              alt="Profile Picture"
              src={props.prevImageLink}
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          );
        }
        if (!props.profilePicture) {
          return (
            <div>
              <Group align="center" position="center">
                <ActionIcon variant="hover" color={status.rejected ? "red" : "primary"}>
                  {status.rejected ? <IoCloseOutline size={26} /> : <IoImageOutline size={26} />}
                </ActionIcon>
              </Group>
            </div>
          );
        } else {
          const url = URL.createObjectURL(props.profilePicture[0]);
          return (
            <img
              alt="Profile Picture"
              src={url}
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          );
        }
      }}
    </Dropzone>
  );
};

export default EditProfilePicture;
