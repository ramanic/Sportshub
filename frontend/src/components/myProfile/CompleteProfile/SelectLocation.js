import React from "react";
import Map, { GeolocateControl } from "react-map-gl";

const SelectLocation = (props) => {
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
      <GeolocateControl
        trackUserLocation
        showUserHeading
        positionOptions={{ enableHighAccuracy: true }}
        fitBoundsOptions={{
          minZoom: 14,
          maxZoom: 14,
        }}
      />
    </Map>
  );
};

export default SelectLocation;
