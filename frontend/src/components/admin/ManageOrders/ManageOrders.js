import React, { useEffect } from "react";
import { Card, Table, Text } from "@mantine/core";
import { connect } from "react-redux";

import Loading from "../../common/Loading";
import OrderRow from "./OrderRow";
import { getOrderItems } from "../../../actions/orderActions";

const ManageOrders = (props) => {
  useEffect(() => {
    props.getOrderItems();
  }, []);

  let renderOrderItems = <Loading />;
  if (!props.orders || props.getOrdersLoading) {
    renderOrderItems = <Loading />;
  } else if (props.orders.length === 0) {
    renderOrderItems = <Text>Orders are empty</Text>;
  } else {
    renderOrderItems = (
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Order Id</th>
            <th style={{ textAlign: "center" }}>Ordered By</th>
            <th style={{ textAlign: "center" }}>Payment</th>
            <th style={{ textAlign: "center" }}>Cost</th>
            <th style={{ textAlign: "center" }}>Items</th>
            {/* <th style={{ textAlign: "right" }}>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {props.orders.map((item) => (
            <OrderRow key={item._id} orderItem={item} />
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Card withBorder shadow="md" mt={10}>
      {renderOrderItems}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    getOrdersLoading: state.order.getOrdersLoading,
  };
};

export default connect(mapStateToProps, { getOrderItems })(ManageOrders);
