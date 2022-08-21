import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card } from "@mantine/core";

import OrderItem from "./OrderItem";
import Loading from "../../../common/Loading";
import { getMyOrders } from "../../../../actions/orderActions";

const Orders = (props) => {
  useEffect(() => {
    props.getMyOrders();
  }, []);

  let renderMyOrders = <Loading />;

  if (props.myOrdersLoading && props.myOrders.length === 0) {
    renderMyOrders = <Loading />;
  } else {
    renderMyOrders = props.myOrders.map((order) => <OrderItem key={order._id} order={order} />);
  }

  return (
    <Card withBorder shadow="lg">
      {renderMyOrders}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    myOrders: state.order.myOrders,
    myOrdersLoading: state.order.myOrdersLoading,
  };
};

export default connect(mapStateToProps, { getMyOrders })(Orders);
