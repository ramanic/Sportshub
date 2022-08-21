import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, Button, Group, Text, Card, Title } from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";

import Loading from "../../common/Loading";
import { checkResetValidity, resetNewPassword } from "../../../actions/authActions";

const schema = Joi.object({
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password should have at least 6 letters",
  }),
  confirmPassword: Joi.string().required().min(6).messages({
    "string.empty": "Confirm password is required",
    "string.min": "Password should have at least 6 letters",
  }),
});

const NewPassword = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    props.checkResetValidity(params.passwordResetString, navigate);
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      if (form.values.password !== form.values.confirmPassword) {
        form.setFieldError("confirmPassword", "Passwords are not equal");
      } else {
        props.resetNewPassword(params.passwordResetString, form.values, navigate);
      }
    }
  };

  let renderNewPasswordForm = <Loading />;

  if (props.checkResetValidityLoading) {
    renderNewPasswordForm = <Loading />;
  } else {
    renderNewPasswordForm = (
      <form onSubmit={formSubmitHandler}>
        <Title order={4} mb={14}>
          Create a new password
        </Title>
        <Group direction="column" grow>
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
            error={form.errors.password}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm password"
            value={form.values.confirmPassword}
            onChange={(event) => form.setFieldValue("confirmPassword", event.currentTarget.value)}
            error={form.errors.confirmPassword}
          />

          <Button mt={10} type="submit" loading={props.resetNewPasswordLoading}>
            Change Password
          </Button>
        </Group>
      </form>
    );
  }

  return (
    <Card
      withBorder
      mx="auto"
      p={26}
      sx={{
        maxWidth: 600,
      }}
    >
      {renderNewPasswordForm}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    checkResetValidityLoading: state.auth.checkResetValidityLoading,
    resetNewPasswordLoading: state.auth.resetNewPasswordLoading,
  };
};

export default connect(mapStateToProps, { checkResetValidity, resetNewPassword })(NewPassword);
