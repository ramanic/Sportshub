import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Group, Text, Badge, ActionIcon } from "@mantine/core";
import { connect } from "react-redux";
import { IoSwapVerticalOutline } from "react-icons/io5";

import UserRoleChangeModal from "./UserRoleChangeModal";
import { changeUserRole } from "../../../actions/userActions";
import { showErrorNotification } from "../../../utils/notifications/showCustomNotification";

const roles = ["user", "admin", "venueOwner"];

const UserRow = (props) => {
  const [opened, setOpened] = useState(false);
  const [roleValue, setRoleValue] = useState("");

  useEffect(() => {
    setRoleValue(props.userItem.role);
  }, [props.userItem]);

  const changeRoleHandler = () => {
    if (roles.includes(roleValue)) {
      props.changeUserRole(props.userItem._id, roleValue, setOpened);
    } else {
      showErrorNotification({ title: "Error", message: "Please select a valid role" });
    }
  };

  return (
    <tr style={{ textAlign: "center" }}>
      <td>
        <Group>
          <Avatar
            component={Link}
            to={`/profile/${props.userItem.username}`}
            src={props.userItem.profile.photo}
          />
          <Text component={Link} to={`/profile/${props.userItem.username}`}>
            {props.userItem.name}
          </Text>
        </Group>
      </td>
      <td>
        <Text>{props.userItem.username}</Text>
      </td>
      <td>
        <Badge radius="sm">{props.userItem.role}</Badge>
      </td>
      <td>
        <Text>{props.userItem.email}</Text>
      </td>
      <td>
        <Group position="right">
          <ActionIcon color="primary" variant="light" onClick={() => setOpened(true)}>
            <IoSwapVerticalOutline size={16} />
          </ActionIcon>
        </Group>
      </td>
      <UserRoleChangeModal
        opened={opened}
        setOpened={setOpened}
        roleValue={roleValue}
        setRoleValue={setRoleValue}
        changeRoleHandler={changeRoleHandler}
        changeUserRoleLoading={props.changeUserRoleLoading}
      />
    </tr>
  );
};

export default connect(null, { changeUserRole })(UserRow);
