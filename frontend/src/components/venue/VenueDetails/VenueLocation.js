import React from "react";
import Map, { Marker } from "react-map-gl";
import { IoLocation } from "react-icons/io5";
import { useMantineTheme } from "@mantine/core";

const VenueLocation = (props) => {
  const theme = useMantineTheme();
  return (
    <Map
      initialViewState={{
        longitude: Number(props.location.longitude),
        latitude: Number(props.location.latitude),
        zoom: 13,
      }}
      style={{ width: "100%", height: 300 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        longitude={Number(props.location.longitude)}
        latitude={Number(props.location.latitude)}
        anchor="bottom"
      >
        <IoLocation size={36} color={theme.colors.primary[6]} />
      </Marker>
    </Map>
  );
};

export default VenueLocation;
