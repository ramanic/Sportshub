import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "@mantine/core";

import VenueItem from "./common/VenueItem";
import VenueSchedule from "./VenueSchedule/VenueSchedule";
import Loading from "../common/Loading";
import { getVenue, updateVenueSchedule } from "../../actions/venueActions";

const ManageVenue = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const [venueSchedule, setVenueSchedule] = useState();

  // Get venue details
  useEffect(() => {
    props.getVenue(params.venueId);
  }, []);

  // Load schedule in state
  useEffect(() => {
    if (props.currentVenue) setVenueSchedule(props.currentVenue.venueSchedule);
  }, [props.currentVenue]);

  // Handle same timing checkbox
  const sameTimingHandler = (checked) => {
    setVenueSchedule({ ...venueSchedule, sameEveryday: checked });
  };

  // Handle booking gap change
  const bookingGapHandler = (value) => {
    setVenueSchedule({ ...venueSchedule, bookingGaps: value });
  };

  // Handle same timing checkbox
  const allowBookingHandler = (checked) => {
    setVenueSchedule({ ...venueSchedule, bookingAllowed: checked });
  };

  // Change default timing rate handler
  const changeDefaultTimingRateHandler = (value, _id) => {
    let defaultTiming = [...venueSchedule.default_timing];
    let newTiming = defaultTiming.map((el) => {
      if (el._id === _id) return { ...el, price: value };
      else return el;
    });
    setVenueSchedule({ ...venueSchedule, default_timing: newTiming });
  };

  // Change  days timing rate handler
  const changeDaysTimingRateHandler = (value, _id, dayId) => {
    let daysTiming = [...venueSchedule.days];
    let daysTimingIndex = daysTiming.findIndex((day) => day._id === dayId);

    let newTiming = daysTiming[daysTimingIndex].timing.map((el) => {
      if (el._id === _id) return { ...el, price: value };
      else return el;
    });
    daysTiming[daysTimingIndex].timing = newTiming;
    setVenueSchedule({ ...venueSchedule, days: daysTiming });
  };

  // Change default timing time handler
  const changeDefaultTimingTimeHandler = (value, _id, type) => {
    let date = new Date(value);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (String(hours).length === 1) {
      hours = `0${hours}`;
    }
    if (String(minutes).length === 1) {
      minutes = `0${minutes}`;
    }
    let defaultTiming = [...venueSchedule.default_timing];
    let newTiming = defaultTiming.map((el) => {
      if (el._id === _id) return { ...el, [type]: `${hours}:${minutes}` };
      else return el;
    });
    setVenueSchedule({ ...venueSchedule, default_timing: newTiming });
  };
  // Change days timing time handler
  const changeDaysTimingTimeHandler = (value, _id, type, dayId) => {
    let date = new Date(value);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (String(hours).length === 1) {
      hours = `0${hours}`;
    }
    if (String(minutes).length === 1) {
      minutes = `0${minutes}`;
    }
    let daysTiming = [...venueSchedule.days];

    let daysTimingIndex = daysTiming.findIndex((day) => day._id === dayId);

    let newTiming = daysTiming[daysTimingIndex].timing.map((el) => {
      if (el._id === _id) return { ...el, [type]: `${hours}:${minutes}` };
      else return el;
    });

    daysTiming[daysTimingIndex].timing = newTiming;

    setVenueSchedule({ ...venueSchedule, default_timing: daysTiming });
  };

  // If owner clicks default add new timing button
  const newDefaultTimingItemHandler = () => {
    // const newTimingItem
    let newItem = {
      startTime: "00:00",
      endTime: "00:00",
      price: "0",
    };
    let newTiming = [...venueSchedule.default_timing];
    newTiming.push(newItem);
    setVenueSchedule({ ...venueSchedule, default_timing: newTiming });
  };

  // If owner clicks days add new timing button
  const newDaysTimingItemHandler = (dayId) => {
    // const newTimingItem
    let newItem = {
      startTime: "00:00",
      endTime: "00:00",
      price: "0",
    };
    let daysTiming = [...venueSchedule.days];
    let daysTimingIndex = daysTiming.findIndex((day) => day._id === dayId);
    daysTiming[daysTimingIndex].timing.push(newItem);

    setVenueSchedule({ ...venueSchedule, days: daysTiming });
  };

  // Delete default timing handler
  const deleteDefaultTimingHandler = (id) => {
    let newTiming = [...venueSchedule.default_timing];
    console.log(newTiming);
    let toDeleteIndex = newTiming.findIndex((el) => el._id === id || el.endTime === id);
    console.log(toDeleteIndex);
    newTiming.splice(toDeleteIndex, 1);
    setVenueSchedule({ ...venueSchedule, default_timing: newTiming });
  };

  // Delete day timing handler
  const deleteDaysTimingHandler = (id, dayId) => {
    let daysTiming = [...venueSchedule.days];
    let daysTimingIndex = daysTiming.findIndex((day) => day._id === dayId);
    let toDeleteIndex = daysTiming[daysTimingIndex].timing.findIndex(
      (el) => el._id === id || el.endTime === id
    );

    daysTiming[daysTimingIndex].timing.splice(toDeleteIndex, 1);
    setVenueSchedule({ ...venueSchedule, days: daysTiming });
  };

  // Handler function for updating a venue schedule
  const updateScheduleHandler = () => {
    let updateData = {
      sameEveryday: venueSchedule.sameEveryday,
      bookingAllowed: venueSchedule.bookingAllowed,
      bookingGaps: venueSchedule.bookingGaps,
      default_timing: venueSchedule.default_timing,
      days: venueSchedule.days,
    };
    props.updateVenueSchedule(props.currentVenue._id, updateData, navigate);
  };

  let renderManageVenue = <Loading />;

  if (props.venueLoading || !props.currentVenue || !venueSchedule) {
    renderManageVenue = <Loading />;
  } else if (venueSchedule) {
    renderManageVenue = (
      <>
        <VenueItem currentVenue={props.currentVenue} />
        <VenueSchedule
          venueSchedule={venueSchedule}
          sameTimingHandler={sameTimingHandler}
          allowBookingHandler={allowBookingHandler}
          changeDefaultTimingRateHandler={changeDefaultTimingRateHandler}
          changeDefaultTimingTimeHandler={changeDefaultTimingTimeHandler}
          newDefaultTimingItemHandler={newDefaultTimingItemHandler}
          changeDaysTimingRateHandler={changeDaysTimingRateHandler}
          changeDaysTimingTimeHandler={changeDaysTimingTimeHandler}
          newDaysTimingItemHandler={newDaysTimingItemHandler}
          bookingGapHandler={bookingGapHandler}
          deleteDefaultTimingHandler={deleteDefaultTimingHandler}
          deleteDaysTimingHandler={deleteDaysTimingHandler}
        />
        <Button
          mt={20}
          fullWidth
          loading={props.updateVenueScheduleLoading}
          onClick={updateScheduleHandler}
        >
          Save
        </Button>
      </>
    );
  }

  return (
    <Card withBorder shadow="lg">
      {renderManageVenue}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    currentVenue: state.venue.currentVenue,
    venueLoading: state.venue.venueLoading,
    updateVenueScheduleLoading: state.venue.updateVenueScheduleLoading,
  };
};

export default connect(mapStateToProps, { getVenue, updateVenueSchedule })(ManageVenue);
