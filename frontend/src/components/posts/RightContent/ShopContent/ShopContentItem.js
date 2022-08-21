import React from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Group, Text, Button, Box, Badge } from "@mantine/core";

const ShopContentItem = (props) => {
  return (
    <Card
      withBorder
      mb={8}
      py="xs"
      px="xs"
      sx={(style) => ({
        backgroundColor: style.colorScheme === "dark" ? style.colors.dark[7] : "",
      })}
    >
      <Group spacing="xs">
        <Avatar src={props.product.image} radius="sm" size="md" />
        <Box>
          <Text
            size="xs"
            variant="gradient"
            weight={700}
            gradient={{ from: "primary", to: "secondary" }}
            component={Link}
            to={`/shop/${props.product._id}`}
          >
            {props.product.name}
          </Text>
          <Box>
            <Badge radius="sm" size="xs" color="secondary">
              {props.product.category}
            </Badge>
          </Box>
        </Box>
      </Group>
    </Card>
  );
};

export default ShopContentItem;
