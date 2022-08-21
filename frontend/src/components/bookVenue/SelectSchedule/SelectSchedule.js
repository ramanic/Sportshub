import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mantine/core";

import SelectDate from "./SelectDate";
import ScheduleSummary from "./ScheduleSummary";
import PersonalDetails from "./PersonalDetails";
import ContactOwner from "./ContactOwner";
import Loading from "../../common/Loading";
import isEmpty from "../../../utils/isEmpty";

const SelectSchedule = (props) => {
  // Set personal details of user
  useEffect(() => {
    if (!isEmpty(props.userInfo)) {
      props.form.setValues({
        ...props.form.values,
        email: props.userInfo.email,
        name: props.userInfo.name,
      });

      if (props.userInfo.profile.phone && props.userInfo.profile.address) {
        props.form.setValues({
          ...props.form.values,
          email: props.userInfo.email,
          name: props.userInfo.name,
          phoneNumber: props.userInfo.profile.phone,
          address: `${props.userInfo.profile.address.city}, ${props.userInfo.profile.address.district}`,
        });
      }
    }
  }, [props.userInfo]);

  let renderCheckout = <Loading />;

  if (isEmpty(props.userInfo)) {
    renderCheckout = <Loading />;
  } else {
    renderCheckout = (
      <Grid columns={12} mt={4}>
        <Grid.Col md={7}>
          <SelectDate
            venueSchedule={props.venueSchedule}
            selectedBookingDate={props.selectedBookingDate}
            setSelectedBookingDate={props.setSelectedBookingDate}
            selectedBookingTime={props.selectedBookingTime}
            setSelectedBookingTime={props.setSelectedBookingTime}
            venueAvailability={props.venueAvailability}
            venueAvailabilityLoading={props.venueAvailabilityLoading}
          />
          <PersonalDetails form={props.form} userInfo={props.userInfo} />
        </Grid.Col>
        <Grid.Col md={5}>
          <ScheduleSummary
            proceedToPaymentHandler={props.proceedToPaymentHandler}
            selectedBookingDate={props.selectedBookingDate}
            selectedBookingTime={props.selectedBookingTime}
            venueType={props.venueType}
            clearBookingSelection={props.clearBookingSelection}
            bookVenueLoading={props.bookVenueLoading}
            paymentLoading={props.paymentLoading}
          />
          <ContactOwner venueOwner={props.venueOwner} />
        </Grid.Col>
      </Grid>
    );
  }

  return <Box>{renderCheckout}</Box>;
};

export default SelectSchedule;
