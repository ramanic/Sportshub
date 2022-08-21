import React from "react";
import { Loader, Box } from "@mantine/core";

const Loading = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Loader size="md" />
    </Box>
  );
};

export default Loading;
