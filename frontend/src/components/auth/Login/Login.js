import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  TextInput,
  PasswordInput,
  Card,
  Container,
  Title,
  Button,
  Group,
  Text,
  Divider,
  Anchor,
} from "@mantine/core";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import { IoLogoGoogle } from "react-icons/io5";

import { loginUser } from "../../../actions/authActions";

const schema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username or email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      username: "",
      password: "",
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      props.loginUser(form.values, navigate, from);
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
        <Title order={4}>Login to your account</Title>

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

        <Divider label="or login with email" labelPosition="center" my="lg" />

        <form onSubmit={formSubmitHandler}>
          <Group direction="column" grow>
            <TextInput
              label="Username or Email"
              placeholder="Your username or email"
              value={form.values.username}
              onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
              error={form.errors.username}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
              error={form.errors.password}
            />
          </Group>
          <Button mt={30} fullWidth type="submit" loading={props.auth.userLoading}>
            Login
          </Button>
          <Group mt="xs" spacing={4}>
            <Text size="sm">Don't have an account?</Text>

            <Anchor
              component={Link}
              type="button"
              color="primary"
              to="/register"
              size="sm"
              weight={600}
            >
              Register
            </Anchor>
          </Group>
          <Group mt="xs" spacing={4}>
            <Text size="sm">Forgot your password?</Text>

            <Anchor
              component={Link}
              type="button"
              color="primary"
              to="/reset-password"
              size="sm"
              weight={600}
            >
              Reset Password
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

export default connect(mapStateToProps, { loginUser })(Login);
