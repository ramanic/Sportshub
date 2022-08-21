import React, { useEffect, useState, useRef } from "react";
import { Card, Grid, Title } from "@mantine/core";
import { connect } from "react-redux";
import { io } from "socket.io-client";

import Conversations from "./Conversations/Conversations";
import Messages from "./Messages/Messages";
import SendMessage from "./SendMessage/SendMessage";
import Loading from "../common/Loading";
import OnlineUsers from "./OnlineUsers/OnlineUsers";
import { getAllConversations, setArrivedMessage } from "../../actions/chatActions";
import InputEmoji from "react-input-emoji";

const Chat = (props) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [gotMessage, setGotMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [opened, setOpened] = useState(false);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    props.getAllConversations();

    // Get a new message
    socket.current.on("getMessage", (data) => {
      setGotMessage({
        sender: data.senderInfo,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // when we get a new message, check if it is part of the current conversation
  useEffect(() => {
    let isMemberIndex = null;
    isMemberIndex =
      gotMessage &&
      selectedConversation?.members.findIndex((member) => member._id === gotMessage.sender._id);

    if (isMemberIndex >= 0 && isMemberIndex !== null) {
      props.setArrivedMessage(gotMessage);
    }
  }, [gotMessage, selectedConversation]);

  // Add user on list when he connects
  useEffect(() => {
    socket.current.emit("addUser", props.userInfo._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [props.userInfo]);

  let renderChat = <Loading />;

  if (props.allConversationsLoading) {
    renderChat = <Loading />;
  } else {
    renderChat = (
      <Grid columns={12}>
        <Grid.Col span={2} md={3}>
          <Conversations
            allConversations={props.allConversations}
            userInfo={props.userInfo}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            setOpened={setOpened}
          />
        </Grid.Col>
        <Grid.Col span={10} md={9}>
          <Messages
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
          />
          {/* <InputEmoji /> */}
          <SendMessage
            selectedConversation={selectedConversation}
            sendMessageLoading={props.sendMessageLoading}
            socket={socket}
            userInfo={props.userInfo}
            allConversations={props.allConversations}
          />
        </Grid.Col>
      </Grid>
    );
  }

  return (
    <Card withBorder shadow="lg">
      {renderChat}
      <OnlineUsers
        opened={opened}
        setOpened={setOpened}
        onlineUsers={onlineUsers}
        userInfo={props.userInfo}
        setSelectedConversation={setSelectedConversation}
      />
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    allConversations: state.chat.allConversations,
    allConversationsLoading: state.chat.allConversationsLoading,
    userInfo: state.auth.userInfo,
    sendMessageLoading: state.chat.sendMessageLoading,
  };
};

export default connect(mapStateToProps, { getAllConversations, setArrivedMessage })(Chat);
