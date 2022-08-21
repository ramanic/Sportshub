import React, { useState, useEffect } from "react";
import { Text } from "@mantine/core";
import { useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoCalendarOutline,
  IoCardOutline,
  IoPersonCircleOutline,
  IoCompassOutline,
  IoGitCommitOutline,
} from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { TbSwords } from "react-icons/tb";

import MainLink from "./MainLink";

const linkData = [
  {
    icon: <IoHomeOutline size={16} />,
    label: "Home",
    to: "/home",
    tabName: "home",
  },
  {
    icon: <IoCalendarOutline size={16} />,
    label: "Venues",
    to: "/venues",
    tabName: "venues",
  },
  {
    icon: <IoCardOutline size={16} />,
    label: "Shop",
    to: "/shop",
    tabName: "shop",
  },
  {
    icon: <TbSwords size={16} />,
    label: "Challenges",
    to: "/challenges",
    tabName: "challenges",
  },

  {
    icon: <IoCompassOutline size={16} />,
    label: "My Venues",
    to: "/my-venues",
    tabName: "my-venues",
  },
  {
    icon: <RiAdminLine size={16} />,
    label: "Admin",
    to: "/admin",
    tabName: "admin",
  },
];

// List of links on sidebar
const MainLinks = (props) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");

  // Check current page url to set active tab on sidebar
  useEffect(() => {
    if (location.pathname.includes("/home") || location.pathname.includes("/post")) {
      setActiveTab("home");
    } else if (location.pathname.includes("/venues") || location.pathname.includes("/venue")) {
      setActiveTab("venues");
    } else if (location.pathname.includes("/shop")) {
      setActiveTab("shop");
    } else if (location.pathname.includes("/admin")) {
      setActiveTab("admin");
    } else if (location.pathname.includes("/my-venues")) {
      setActiveTab("my-venues");
    } else if (location.pathname.includes("/challenges")) {
      setActiveTab("challenges");
    }
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const sidebarLinkClickHandler = (tabName) => {
    setActiveTab(tabName);
  };

  // Create the list of links from the data
  const links = linkData.map((link) => {
    if (
      props.userInfo.role === "user" &&
      (link.tabName === "admin" || link.tabName === "my-venues")
    ) {
      return null;
    } else if (props.userInfo.role === "venueOwner" && link.tabName === "admin") {
      return null;
    } else if (props.userInfo.role === "admin" && link.tabName === "my-venues") {
      return null;
    } else {
      return (
        <MainLink
          sidebarLinkClickHandler={sidebarLinkClickHandler}
          activeTab={activeTab}
          key={link.label}
          {...link}
        />
      );
    }
  });
  return <div>{props.isAuthenticated ? links : <Text></Text>}</div>;
};

export default MainLinks;
