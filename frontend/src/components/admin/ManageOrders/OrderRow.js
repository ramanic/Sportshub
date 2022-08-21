import React, { useState } from "react";
import { Group, Text, Badge, ActionIcon } from "@mantine/core";
import { IoPencilOutline, IoCloseOutline } from "react-icons/io5";

import OrderItemModal from "./OrderItemModal";

const OrderRow = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <tr style={{ textAlign: "center" }}>
      <td style={{ textAlign: "left" }}>
        <Text onClick={() => setOpened(true)} sx={{ cursor: "pointer" }}>
          {props.orderItem._id}
        </Text>
      </td>
      <td>
        <Text>{props.orderItem.buyer.name}</Text>
        <Text size="sm" color="dimmed">
          {props.orderItem.buyer.email}
        </Text>
      </td>
      <td>
        <Badge radius="sm">Khalti</Badge>
      </td>
      <td>
        <Text>Rs. {props.orderItem.totalCost}</Text>
      </td>
      <td>
        <Text>{props.orderItem.products.length}</Text>
      </td>
      {/* <td>
        <Group position="right">
          <ActionIcon color="primary" variant="light">
            <IoPencilOutline size={16} />
          </ActionIcon>
          <ActionIcon color="red" variant="light">
            <IoCloseOutline color="red" size={20} />
          </ActionIcon>
        </Group>
      </td> */}
      <OrderItemModal opened={opened} setOpened={setOpened} orderItem={props.orderItem} />
    </tr>
  );
};

export default OrderRow;
