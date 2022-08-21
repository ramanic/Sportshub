import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Modal,
  Button,
  Group,
  TextInput,
  Radio,
  Textarea,
  RadioGroup,
  Text,
  Select,
  MultiSelect,
  PasswordInput,
} from "@mantine/core";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";

import { changePassword } from "../../../../actions/authActions";

const schema = Joi.object({
  newPassword: Joi.string().required().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password should have at least 6 letters",
  }),
});

const ChangePasswordModal = (props) => {
  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      newPassword: "",
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      console.log(form.values);
      props.changePassword(form.values, props.setPassModalOpened);
    }
  };

  return (
    <Modal
      centered
      opened={props.passModalOpened}
      onClose={() => props.setPassModalOpened(false)}
      title="Change your password"
    >
      <form onSubmit={formSubmitHandler}>
        <PasswordInput
          label="New Password"
          placeholder="Your new password"
          value={form.values.newPassword}
          onChange={(event) => form.setFieldValue("newPassword", event.currentTarget.value)}
          error={form.errors.newPassword}
        />
        <Button type="submit" mt={26} loading={props.changePasswordLoading}>
          Change
        </Button>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    changePasswordLoading: state.auth.changePasswordLoading,
  };
};

export default connect(mapStateToProps, { changePassword })(ChangePasswordModal);
