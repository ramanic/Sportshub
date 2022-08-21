import React from "react";
import { Link } from "react-router-dom";
import { Text, useMantineTheme, Menu, Divider } from "@mantine/core";

import { IoEllipsisHorizontal, IoTrashOutline } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { MdHistory, MdSchedule } from "react-icons/md";

const VenueItemMenu = (props) => {
  const menus = [
    // {
    //   name: "Details",
    //   icon: <CgDetailsMore size={18} />,
    //   to: `/my-venues/${props.venueId}/details`,
    // },
    {
      name: "Booked History",
      icon: <MdHistory size={18} />,
      to: `/my-venues/${props.venueId}/history`,
    },
    {
      name: "Schedule",
      icon: <MdSchedule size={18} />,
      to: `/my-venues/${props.venueId}/manage`,
    },
  ];
  const theme = useMantineTheme();

  return (
    <Menu
      control={
        <Text sx={{ color: theme.colors.primary[6] }}>
          <IoEllipsisHorizontal size={18} />
        </Text>
      }
      sx={{ marginLeft: "auto", cursor: "pointer" }}
    >
      {menus.map((menu) => (
        <Menu.Item component={Link} to={menu.to} key={menu.name} icon={menu.icon}>
          {menu.name}
        </Menu.Item>
      ))}
      <Divider />
      <Menu.Label>Actions</Menu.Label>
      <Menu.Item
        icon={<FiEdit size={16} />}
        component={Link}
        to={`/my-venues/${props.venueId}/edit`}
      >
        Edit
      </Menu.Item>
      <Menu.Item color="red" icon={<IoTrashOutline size={18} />}>
        Delete
      </Menu.Item>
    </Menu>
  );
};

export default VenueItemMenu;
