import React from "react";
import { useMantineTheme } from "@mantine/core";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { IoLocation } from "react-icons/io5";

const SelectLocation = (props) => {
  const theme = useMantineTheme();
  return (
    <Map
      {...props.viewState}
      style={{
        width: "100%",
        height: "200px",
      }}
      onMove={(evt) => props.setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        latitude={props.viewState.latitude}
        longitude={props.viewState.longitude}
        anchor="bottom"
        // draggable
        // onDrag={(evt) => props.setViewState(evt.viewState)}
      >
        <IoLocation size={36} color={theme.colors.primary[6]} />
      </Marker>
    </Map>
  );
};

export default SelectLocation;
