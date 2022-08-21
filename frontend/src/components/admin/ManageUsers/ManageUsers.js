import React, { useEffect } from "react";
import { Card, Table, Text } from "@mantine/core";
import { connect } from "react-redux";

import Loading from "../../common/Loading";
import UserRow from "./UserRow";
import { getAllUsers } from "../../../actions/userActions";

const ManageUsers = (props) => {
  useEffect(() => {
    props.getAllUsers();
  }, []);

  let renderUserItems = <Loading />;
  if (!props.users || props.getAllUsersLoading) {
    renderUserItems = <Loading />;
  } else if (props.users.length === 0) {
    renderUserItems = <Text>Users are empty</Text>;
  } else {
    renderUserItems = (
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr style={{ textAlign: "centerd" }}>
            <th style={{ textAlign: "left" }}>User</th>
            <th style={{ textAlign: "center" }}>Username</th>
            <th style={{ textAlign: "center" }}>Role</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((item) => (
            <UserRow
              key={item._id}
              userItem={item}
              changeUserRoleLoading={props.changeUserRoleLoading}
            />
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Card withBorder shadow="md" mt={10}>
      {renderUserItems}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    getAllUsersLoading: state.user.getAllUsersLoading,
    changeUserRoleLoading: state.user.changeUserRoleLoading,
  };
};

export default connect(mapStateToProps, { getAllUsers })(ManageUsers);
