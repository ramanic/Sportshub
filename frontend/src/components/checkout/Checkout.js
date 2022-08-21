import React, { useState } from "react";
import { Stepper, Box, Title, Card, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IoCardOutline, IoCheckmarkOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { connect } from "react-redux";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import KhaltiCheckout from "khalti-checkout-web";

import Summary from "./Summary/Summary";
import PaymentComplete from "./PaymentComplete/PaymentComplete";
import {
  completePurchase,
  completePurchaseSuccess,
  completePurchaseError,
} from "../../actions/cartActions";

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
  name: Joi.string().required().messages({
    "string.empty": "Your name is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City is required",
  }),
  phoneNumber: Joi.string().min(10).max(10).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Invalid phone number",
    "string.max": "Invalid phone number",
  }),
  saveDetails: Joi.boolean(),
  couponCode: Joi.any(),
});

const Checkout = (props) => {
  const mediumScreen = useMediaQuery("(min-width: 900px)");
  const largeScreen = useMediaQuery("(min-width: 1200px)");
  const xlScreen = useMediaQuery("(min-width: 1400px)");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentPayload, setPaymentPayload] = useState(null);

  const onPaymentSuccess = async (payload) => {
    console.log("payment success");
    try {
      await props.completePurchase(form.values, props.cart.cartItems, payload);
      stepChangeHandler();
      props.completePurchaseSuccess();
    } catch (err) {
      props.completePurchaseError(err);
    }
  };
  let config = {
    // replace this key with yours
    publicKey: "test_public_key_e731c60354e4417ea7cc07f38086cc17",
    productIdentity: "1234567890",
    productName: "Drogon",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      onSuccess(payload) {
        setPaymentLoading(false);
        console.log("Success");
        setPaymentPayload(payload);
        console.log(payload);
        onPaymentSuccess(payload);
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        setPaymentLoading(false);

        props.completePurchaseError(error);
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
        setPaymentLoading(false);
      },
    },
    paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
  };
  let checkout = new KhaltiCheckout(config);

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      email: "",
      name: "",
      address: "",
      city: "",
      phoneNumber: "",
      saveDetails: false,
      couponCode: "",
    },
  });

  const [activeStep, setActiveStep] = useState(0);

  // Change stepper step
  const stepChangeHandler = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // Proceed to payment section
  const proceedToPaymentHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    console.log(hasErrors);
    console.log(errors);
    if (!hasErrors) {
      setPaymentLoading(true);
      checkout.show({ amount: props.cart.totalPrice * 100 });
    }
  };

  return (
    <Card withBorder shadow="lg" sx={{ minHeight: 850 }}>
      <Stepper size="lg" mt={20} active={activeStep}>
        <Stepper.Step
          label={
            mediumScreen ? (
              <Text size={xlScreen ? "lg" : "md"} color={activeStep === 1 ? "primary" : null}>
                Delivery Details
              </Text>
            ) : (
              ""
            )
          }
          description={
            mediumScreen ? (
              <Text size={largeScreen ? "sm" : "xs"} color={activeStep === 1 ? "primary" : null}>
                Enter your delivery details
              </Text>
            ) : (
              ""
            )
          }
          icon={<TbTruckDelivery size={24} />}
        >
          <Summary
            proceedToPaymentHandler={proceedToPaymentHandler}
            form={form}
            cart={props.cart}
            userInfo={props.userInfo}
            paymentLoading={paymentLoading}
            completePurchaseLoading={props.cart.completePurchaseLoading}
          />
        </Stepper.Step>

        <Stepper.Step
          label={
            mediumScreen ? (
              <Text size={xlScreen ? "lg" : "md"} color={activeStep === 3 ? "primary" : null}>
                Success
              </Text>
            ) : (
              ""
            )
          }
          description={
            mediumScreen ? (
              <Text size={largeScreen ? "sm" : "xs"} color={activeStep === 3 ? "primary" : null}>
                Your transaction was successful
              </Text>
            ) : (
              ""
            )
          }
          icon={<IoCheckmarkOutline size={24} />}
        >
          <PaymentComplete paymentPayload={paymentPayload} />
        </Stepper.Step>
      </Stepper>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    userInfo: state.auth.userInfo,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  completePurchase,
  completePurchaseError,
  completePurchaseSuccess,
})(Checkout);
