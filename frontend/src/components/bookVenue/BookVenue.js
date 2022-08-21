import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Stepper, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { IoCalendarOutline, IoCheckmarkOutline, IoCardOutline } from "react-icons/io5";
import { connect } from "react-redux";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import KhaltiCheckout from "khalti-checkout-web";

import VenueDetails from "./VenueDetails/VenueDetails";
import SelectSchedule from "./SelectSchedule/SelectSchedule";
import PaymentComplete from "./PaymentComplete/PaymentComplete";
import Loading from "../common/Loading";
import {
  getVenue,
  getVenueAvailability,
  completeVenueBooking,
  completeVenueBookingSuccess,
  completeVenueBookingError,
} from "../../actions/venueActions";

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
  phoneNumber: Joi.string().min(10).max(10).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Invalid phone number",
    "string.max": "Invalid phone number",
  }),
  challenge: Joi.boolean(),
});

const BookVenue = (props) => {
  const mediumScreen = useMediaQuery("(min-width: 900px)");
  const largeScreen = useMediaQuery("(min-width: 1200px)");
  const xlScreen = useMediaQuery("(min-width: 1400px)");

  const params = useParams();

  const [selectedBookingDate, setSelectedBookingDate] = useState(null);
  const [selectedBookingTime, setSelectedBookingTime] = useState(null);
  const [paymentPayload, setPaymentPayload] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const clearBookingSelection = () => {
    setSelectedBookingDate(null);
    setSelectedBookingTime(null);
  };

  const onPaymentSuccess = async (payload) => {
    console.log("venue payment success");
    try {
      await props.completeVenueBooking(
        {
          startTime: selectedBookingTime.startTime,
          endTime: selectedBookingTime.endTime,
          // date: `${year}-${month}-${day}`,
          date: props.bookingDate,
          address: form.values.address,
          email: form.values.email,
          name: form.values.name,
          phoneNumber: form.values.phoneNumber,
          challenge: form.values.challenge,
          payload: payload,
        },
        props.currentVenue._id
      );
      stepChangeHandler();
      props.completeVenueBookingSuccess();
    } catch (err) {
      props.completeVenueBookingError(err);
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

        props.completeVenueBookingError(error);
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

  useEffect(() => {
    if (!props.currentVenue) {
      props.getVenue(params.venueId);
    }
  }, []);

  useEffect(() => {
    if (selectedBookingDate) {
      let today = new Date();
      let actualDate = new Date(
        today.getTime() + Number(selectedBookingDate.index) * (1000 * 60 * 60 * 24)
      );
      const year = actualDate.getFullYear();
      const month = actualDate.getMonth() + 1;
      const day = actualDate.getDate();

      props.getVenueAvailability(params.venueId, `${year}-${month}-${day}`);
    }
  }, [selectedBookingDate]);

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      email: "",
      name: "",
      address: "",
      phoneNumber: "",
      challenge: false,
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

    if (!hasErrors && selectedBookingDate && selectedBookingTime) {
      setPaymentLoading(true);
      checkout.show({ amount: Number(selectedBookingTime.price) * 100 });
    }
  };

  let renderVenueBooking = <Loading />;

  if (!props.currentVenue || props.venueLoading) {
    renderVenueBooking = <Loading />;
  } else {
    renderVenueBooking = (
      <>
        <VenueDetails currentVenue={props.currentVenue} />
        <Stepper size="lg" mt={26} active={activeStep}>
          <Stepper.Step
            label={
              mediumScreen ? (
                <Text size={xlScreen ? "lg" : "md"} color={activeStep === 1 ? "primary" : null}>
                  Schedule
                </Text>
              ) : (
                ""
              )
            }
            description={
              mediumScreen ? (
                <Text size={largeScreen ? "sm" : "xs"} color={activeStep === 1 ? "primary" : null}>
                  Select a date and time
                </Text>
              ) : (
                ""
              )
            }
            icon={<IoCalendarOutline size={24} />}
          >
            <SelectSchedule
              proceedToPaymentHandler={proceedToPaymentHandler}
              paymentLoading={paymentLoading}
              bookVenueLoading={props.bookVenueLoading}
              form={form}
              userInfo={props.userInfo}
              venueSchedule={props.currentVenue.venueSchedule}
              venueOwner={props.currentVenue.owner}
              selectedBookingDate={selectedBookingDate}
              setSelectedBookingDate={setSelectedBookingDate}
              selectedBookingTime={selectedBookingTime}
              setSelectedBookingTime={setSelectedBookingTime}
              venueType={props.currentVenue.category}
              clearBookingSelection={clearBookingSelection}
              venueAvailability={props.venueAvailability}
              venueAvailabilityLoading={props.venueAvailabilityLoading}
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
      </>
    );
  }

  return (
    <Card withBorder shadow="lg">
      {renderVenueBooking}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    currentVenue: state.venue.currentVenue,
    venueLoading: state.venue.venueLoading,
    venueAvailability: state.venue.venueAvailability?.availableTime,
    bookingDate: state.venue.venueAvailability?.bookingDate,
    venueAvailabilityLoading: state.venue.venueAvailabilityLoading,
    bookVenueLoading: state.venue.bookVenueLoading,
  };
};

export default connect(mapStateToProps, {
  getVenue,
  getVenueAvailability,
  completeVenueBookingSuccess,
  completeVenueBooking,
  completeVenueBookingError,
})(BookVenue);
