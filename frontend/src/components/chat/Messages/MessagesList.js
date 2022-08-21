import React from "react";
import { Box, Text } from "@mantine/core";

import Sent from "./common/Sent";
import Received from "./common/Received";

const MessagesList = (props) => {
  if (props.conversationMessages.length === 0) {
    return (
      <Box>
        <Text>Your messages are empty</Text>
      </Box>
    );
  } else {
    return (
      <Box>
        {props.conversationMessages.map((message) => {
          if (message.sender._id === props.userInfo._id) {
            return <Sent innerRef={props.innerRef} key={message._id} message={message} />;
          } else {
            return <Received innerRef={props.innerRef} key={message._id} message={message} />;
          }
        })}
      </Box>
    );
  }
};

export default MessagesList;
