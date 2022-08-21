import React from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Text,
  Anchor,
  Group,
  Title,
  Divider,
  Container,
  Card,
} from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { IoLogoGoogle } from "react-icons/io5";

import { registerUser } from "../../../actions/authActions";

const schema = Joi.object({
  username: Joi.string().min(4).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username should have at least 4 letters",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Your name is required",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password should have at least 6 letters",
  }),
  terms: Joi.boolean(),
});

const Register = (props) => {
  const navigate = useNavigate();

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      props.registerUser(form.values, navigate);
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
      <Container>
        <Title order={4}>Register your account</Title>

        <Group grow mb="md" mt="md">
          <Button
            component="a"
            rel="noopener noreferrer"
            color="red"
            href={process.env.REACT_APP_BASE_SERVER_URL + "/auth/google"}
          >
            <IoLogoGoogle size={20} />
            <Text ml={10} size="sm">
              Google
            </Text>
          </Button>
        </Group>

        <Divider label="or register with email" labelPosition="center" my="lg" />

        <form onSubmit={formSubmitHandler}>
          <Group direction="column" grow>
            <TextInput
              label="Username"
              placeholder="Username"
              value={form.values.username}
              onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
              error={form.errors.username}
            />
            <TextInput
              label="Fullname"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
              error={form.errors.name}
            />

            <TextInput
              label="Email"
              placeholder="Your email"
              value={form.values.email}
              onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
              error={form.errors.email}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
              error={form.errors.password}
            />

            <Checkbox
              label="I accept the terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
            />
          </Group>
          <Button mt={30} fullWidth type="submit" loading={props.auth.userLoading}>
            Register
          </Button>
          <Group mt="xs" spacing={4}>
            <Text size="sm">Already have an account?</Text>

            <Anchor
              component={Link}
              type="button"
              color="primary"
              to="/login"
              size="sm"
              weight={600}
            >
              Login
            </Anchor>
          </Group>
        </form>
      </Container>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { registerUser })(Register);
