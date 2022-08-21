import React from "react";
import { connect } from "react-redux";
import { Card, Group, TextInput, Button, Input, useMantineTheme } from "@mantine/core";
import { BiSend } from "react-icons/bi";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import InputEmoji from "react-input-emoji";

import { sendMessage } from "../../../actions/chatActions";

const schema = Joi.object({
  message: Joi.string().required().messages({
    "string.empty": "Cannot send an empty message",
  }),
});

const SendMessage = (props) => {
  const theme = useMantineTheme();

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      message: "",
    },
  });

  // Function to submit send message form
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      const message = {
        text: form.values.message,
        conversationId: props.selectedConversation,
      };
      props.sendMessage(message);

      const receiverInfo = props.selectedConversation?.members.find(
        (member) => member._id !== props.userInfo._id
      );
      props.socket.current.emit("sendMessage", {
        senderInfo: props.userInfo,
        receiverInfo: receiverInfo,
        text: form.values.message,
      });
      form.setFieldValue("message", "");
    }
  };

  if (props.selectedConversation) {
    return (
      <form onSubmit={formSubmitHandler} style={{ marginTop: 40 }}>
        <Group align="center">
          <Input
            placeholder="Enter your message"
            style={{ flex: 1 }}
            variant="filled"
            value={form.values.message}
            onChange={(val) => form.setFieldValue("message", val)}
            error={form.errors.message}
            component={InputEmoji}
            borderRadius={3}
            borderColor={theme.colors.primary[6]}
            styles={{ fontWeight: 600 }}
            height={100}
            fontFamily={"'Montserrat', sans-serif"}
          />
          {/* <TextInput
              placeholder="Enter your message"
              style={{ flex: 1 }}
              variant="filled"
              value={form.values.message}
              onChange={(event) => form.setFieldValue("message", event.currentTarget.value)}
              error={form.errors.message}
            /> */}
          <Button type="submit" rightIcon={<BiSend size={18} />} loading={props.sendMessageLoading}>
            Send
          </Button>
        </Group>
      </form>
    );
  } else {
    return <p></p>;
  }
};

export default connect(null, { sendMessage })(SendMessage);
