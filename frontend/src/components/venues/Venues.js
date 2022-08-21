import React from "react";

import VenuesFilter from "./VenuesFilter/VenuesFilter";
import BrowseVenues from "./BrowseVenues/BrowseVenues";

const Events = (props) => {
  return (
    <>
      <VenuesFilter />
      <BrowseVenues />
    </>
  );
};

export default Events;
