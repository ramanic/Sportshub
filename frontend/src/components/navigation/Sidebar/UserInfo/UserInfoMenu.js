import React from "react";
import { Link } from "react-router-dom";
import { Text, useMantineTheme, Menu, Divider, Badge } from "@mantine/core";
import {
  IoEllipsisHorizontal,
  IoLogOutOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoColorPaletteOutline,
  IoRibbonOutline,
  IoBookOutline,
} from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { connect } from "react-redux";

import { logoutUser } from "../../../../actions/authActions";

const menus = [
  {
    name: "Profile",
    icon: <IoPersonOutline size={15} />,
    to: "/profile",
  },
  {
    name: "Saved",
    icon: <IoBookOutline size={15} />,
    to: "/saved",
  },
  {
    name: "Friends",
    icon: <AiOutlineUsergroupAdd size={16} />,
    to: "/friends",
  },
];

const UserInfoMenu = (props) => {
  const theme = useMantineTheme();

  return (
    <Menu
      control={
        <Text sx={{ color: theme.colors.primary[6] }}>
          <IoEllipsisHorizontal size={18} />
        </Text>
      }
      sx={{ marginLeft: "auto" }}
    >
      <Badge sx={{ width: "100%" }} radius="sm" mb={8}>
        {props.auth.userInfo.role}
      </Badge>
      {menus.map((menu) => (
        <Menu.Item component={Link} to={menu.to} key={menu.name} icon={menu.icon}>
          {menu.name}
        </Menu.Item>
      ))}

      <Divider />
      <Menu.Label>Actions</Menu.Label>
      <Menu.Item
        icon={<IoColorPaletteOutline size={16} />}
        onClick={() => props.setThemeMenuOpened(true)}
      >
        Theme
      </Menu.Item>
      <Menu.Item color="red" icon={<IoLogOutOutline size={16} />} onClick={props.logoutUser}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logoutUser })(UserInfoMenu);
