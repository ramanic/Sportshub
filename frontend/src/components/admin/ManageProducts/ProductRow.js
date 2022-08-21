import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Group, Text, Badge, ActionIcon } from "@mantine/core";
import { IoPencilOutline, IoCloseOutline } from "react-icons/io5";
import { connect } from "react-redux";

import { deleteShopItem } from "../../../actions/shopActions";

const ProductRow = (props) => {
  const navigate = useNavigate();

  const deleteItemHandler = () => {
    props.deleteShopItem(props.shopItem._id, navigate);
  };

  return (
    <tr style={{ textAlign: "center" }}>
      <td>
        <Group>
          <Avatar
            component={Link}
            to={`/shop/${props.shopItem._id}`}
            src={props.shopItem.image}
            radius="sm"
          />
          <Text component={Link} to={`/shop/${props.shopItem._id}`} sx={{ cursor: "pointer" }}>
            {props.shopItem.name}
          </Text>
        </Group>
      </td>
      <td>
        <Badge radius="sm">{props.shopItem.category}</Badge>
      </td>
      <td>
        <Text>Rs. {props.shopItem.price}</Text>
      </td>
      <td>
        <Text>{props.shopItem.availableQty}</Text>
      </td>
      <td>
        <Text>{new Date(props.shopItem.createdAt).toLocaleString()}</Text>
      </td>
      <td>
        <Group position="right">
          <ActionIcon
            color="primary"
            variant="light"
            component={Link}
            to={`/shop/${props.shopItem._id}/edit`}
          >
            <IoPencilOutline size={16} />
          </ActionIcon>
          <ActionIcon
            color="red"
            variant="light"
            onClick={deleteItemHandler}
            loading={props.deleteItemLoading}
          >
            <IoCloseOutline color="red" size={20} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  );
};

export default connect(null, { deleteShopItem })(ProductRow);
