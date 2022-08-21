import React from "react";
import { Link } from "react-router-dom";
import { Card, Text, Group, Button, useMantineTheme } from "@mantine/core";
import { IoCheckmarkCircle } from "react-icons/io5";

const PaymentComplete = (props) => {
  const theme = useMantineTheme();

  return (
    <Card
      withBorder
      radius="sm"
      shadow="xl"
      p={50}
      my={50}
      sx={(style) => ({
        backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
        maxWidth: 600,
        margin: "10px auto",
      })}
    >
      <Group direction="column" position="center">
        <IoCheckmarkCircle size={70} color={theme.colors.secondary[5]} />
        <Text
          weight={700}
          size="xl"
          variant="gradient"
          gradient={{ from: theme.colors.secondary[6], to: theme.colors.secondary[4], deg: 45 }}
        >
          Payment Success
        </Text>
        <Text size="sm" color="dimmed">
          Transaction Id: {props.paymentPayload?.idx}
        </Text>
        <Text>Thank you for purchasing with us!</Text>
        <Button color="secondary" mt={12} component={Link} to="/shop">
          Complete
        </Button>
      </Group>
    </Card>
  );
};

export default PaymentComplete;
