import React from "react";
import { connect } from "react-redux";
import { TextInput, Button, Group, Text, Card, Title } from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";

import { resetPassword } from "../../../actions/authActions";

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
});

const ResetPassword = (props) => {
  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      email: "",
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      props.resetPassword(form.values);
      // props.registerUser(form.values, navigate);
    }
  };

  return (
    <Card
      withBorder
      mx="auto"
      p={26}
      sx={{
        maxWidth: 600,
      }}
    >
      <form onSubmit={formSubmitHandler}>
        <Title order={4} mb={14}>
          Reset your password
        </Title>
        <Group direction="column" grow>
          <TextInput
            label="Email"
            placeholder="Your email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email}
          />
          <Text size="sm">
            If this email belongs to you, you will get a password reset link in your mail box
          </Text>
          <Button mt={10} type="submit" loading={props.resetPasswordLoading}>
            Send Link
          </Button>
        </Group>
      </form>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    resetPasswordLoading: state.auth.resetPasswordLoading,
  };
};

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
