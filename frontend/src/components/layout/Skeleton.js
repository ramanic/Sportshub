import React, { useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import Topbar from "../navigation/Topbar/Topbar";
import Sidebar from "../navigation/Sidebar/Sidebar";

const Skeleton = (props) => {
  const { height } = useViewportSize();
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      fixed
      padding="md"
      height={height}
      navbarOffsetBreakpoint="sm"
      header={<Topbar opened={opened} setOpened={setOpened} />}
      navbar={<Sidebar opened={opened} />}
    >
      {props.children}
    </AppShell>
  );
};

export default Skeleton;
