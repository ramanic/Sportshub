import React from "react";
import { useState } from "react";
import { Modal, Button, Group, Select, Text } from "@mantine/core";
const roles = [
  {
    value: "user",
    label: "User",
  },
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "venueOwner",
    label: "Venue Owner",
  },
];

const UserRoleChangeModal = (props) => {
  return (
    <Modal
      centered
      title={<Text weight={600}>Change user role</Text>}
      opened={props.opened}
      onClose={() => props.setOpened(false)}
    >
      <Select
        data={roles}
        placeholder="Pick a role"
        label="Pick a new role"
        value={props.roleValue}
        onChange={props.setRoleValue}
      />
      <Button
        fullWidth
        mt={20}
        onClick={props.changeRoleHandler}
        loading={props.changeUserRoleLoading}
      >
        Apply
      </Button>
    </Modal>
  );
};

export default UserRoleChangeModal;
