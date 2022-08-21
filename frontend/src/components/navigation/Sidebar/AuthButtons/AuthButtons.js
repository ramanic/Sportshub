import React from "react";
import { Link } from "react-router-dom";
import { Group, Button, Text } from "@mantine/core";
import { IoPersonAddOutline, IoLogInOutline } from "react-icons/io5";

const AuthButtons = () => {
  return (
    <Group p="xs" direction="column">
      <Button component={Link} to="/register" fullWidth leftIcon={<IoPersonAddOutline size={15} />}>
        Register
      </Button>
      <Button
        component={Link}
        to="/login"
        fullWidth
        variant="outline"
        leftIcon={<IoLogInOutline size={16} />}
      >
        Login
      </Button>
    </Group>
  );
};

export default AuthButtons;
