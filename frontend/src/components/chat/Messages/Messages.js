import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Card, Text, ScrollArea } from "@mantine/core";

import MessagesList from "./MessagesList";
import Loading from "../../common/Loading";
import { getConversationMessages } from "../../../actions/chatActions";

const Messages = (props) => {
  const scrollRef = useRef();

  // Get current conversation messages
  useEffect(() => {
    if (props.selectedConversation) {
      props.getConversationMessages(props.selectedConversation._id);
    }
  }, [props.selectedConversation]);

  // Scroll message list to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.conversationMessages, props.selectedConversation]);

  let renderMessages = <Loading />;

  if (props.conversationMessagesLoading) {
    renderMessages = <Loading />;
  } else if (!props.selectedConversation) {
    renderMessages = (
      <Text size="xl" color="dimmed">
        Please select a conversation
      </Text>
    );
  } else {
    renderMessages = (
      <MessagesList
        innerRef={scrollRef}
        conversationMessages={props.conversationMessages}
        userInfo={props.userInfo}
      />
    );
  }

  return (
    <Card withBorder shadow="md" sx={(theme) => ({})}>
      <ScrollArea offsetScrollbars sx={{ height: "69vh" }}>
        {renderMessages}
      </ScrollArea>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    conversationMessages: state.chat.conversationMessages,
    conversationMessagesLoading: state.chat.conversationMessagesLoading,
    userInfo: state.auth.userInfo,
  };
};

export default connect(mapStateToProps, { getConversationMessages })(Messages);
