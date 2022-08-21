import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Text,
  Image,
  Box,
  Title,
  Badge,
  ActionIcon,
  Group,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { IoCheckmarkCircle } from "react-icons/io5";
import { propTypes } from "react-input-emoji";

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
        {/* <Card withBorder p="xs">
          <Group align="flex-start">
            <Image src="https://picsum.photos/200" height={85} width={120} radius="sm" />
            <Box>
              <Text weight={600}>Maitidevi Futsal Ground</Text>
              <Text size="xs">Maitidevi, Kathmandu</Text>
              <Badge radius="sm" color="secondary" my={10}>
                Cricket
              </Badge>
            </Box>
          </Group>
        </Card> */}
        <Text>Thank you for booking with us!</Text>
        <Button color="secondary" mt={12} component={Link} to="/venues">
          Complete
        </Button>
      </Group>
    </Card>
  );
};

export default PaymentComplete;
