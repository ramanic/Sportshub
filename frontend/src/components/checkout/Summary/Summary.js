import React, { useEffect } from "react";
import { Group, Text, Grid } from "@mantine/core";

import CheckoutDetails from "./CheckoutDetails/CheckoutDetails";
import OrderSummary from "./OrderSummary/OrderSummary";
import Loading from "../../common/Loading";
import isEmpty from "../../../utils/isEmpty";

const Summary = (props) => {
  useEffect(() => {
    props.form.setValues({
      ...props.form.values,
      email: props.userInfo.email,
      name: props.userInfo.name,
    });
  }, [props.userInfo]);

  let renderSummary = <Loading />;

  if (isEmpty(props.userInfo)) {
    renderSummary = <Loading />;
  } else if (props.cart.cartItems.length === 0) {
    renderSummary = <Text>Cart is empty</Text>;
  } else if (props.cart.cartItems.length > 0 && !isEmpty(props.userInfo)) {
    renderSummary = (
      <Grid columns={12}>
        <Grid.Col lg={6} xl={7}>
          <CheckoutDetails userInfo={props.userInfo} form={props.form} />
        </Grid.Col>
        <Grid.Col lg={6} xl={5}>
          <OrderSummary
            proceedToPaymentHandler={props.proceedToPaymentHandler}
            cart={props.cart}
            paymentLoading={props.paymentLoading}
            completePurchaseLoading={props.completePurchaseLoading}
          />
        </Grid.Col>
      </Grid>
    );
  }

  return <>{renderSummary}</>;
};

export default Summary;
