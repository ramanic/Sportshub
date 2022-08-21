import React from "react";
import { Title, Card } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import UserContentItem from "./UserContentItem";
import Loading from "../../../common/Loading";

const UserContent = (props) => {
  const xl = useMediaQuery("(min-width: 1400px)");

  let renderUsers = <Loading />;

  if (props.recommendedUsers.length === 0 && props.recommendedUsersLoading) {
    renderUsers = <Loading />;
  } else {
    let newRenderUsers = props.recommendedUsers.filter((user) => user._id !== props.user.user_id);
    renderUsers = newRenderUsers.map((user) => <UserContentItem key={user._id} user={user} />);
  }

  return (
    <Card withBorder shadow="md" py={xl ? "sm" : "xs"} px={xl ? "sm" : "xs"}>
      <Title order={5} mb={16}>
        Recommended people
      </Title>
      {renderUsers}
    </Card>
  );
};

export default UserContent;
