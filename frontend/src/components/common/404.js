import React from "react";
import { Link } from "react-router-dom";

import { createStyles, Title, Text, Button, Container, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 120,
    // backgroundColor: theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background,
    backgroundColor: theme.colors.primary[5],
    height: "100%",
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][3],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,
    color: theme.white,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][1],
  },
}));

const NotFound = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Requested content not found...</Title>
        <Text size="lg" align="center" className={classes.description}>
          You have reached a page that was not intended to be reached. Please click on one of the
          links below to go to the respoective sections of the app.
        </Text>
        <Group position="center" spacing="xl">
          <Button variant="white" size="lg" component={Link} to="/home">
            Home
          </Button>
          <Button variant="white" size="lg" component={Link} to="/venues">
            Venues
          </Button>
          <Button variant="white" size="lg" component={Link} to="/shop">
            Shop
          </Button>
        </Group>
      </Container>
    </div>
  );
};

export default NotFound;
