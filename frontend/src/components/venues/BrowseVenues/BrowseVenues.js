import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, Text, Grid, MediaQuery } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { connect } from "react-redux";

import Loading from "../../common/Loading";
import VenuesList from "./VenuesList/VenuesList";
import RightContent from "../RightContent/RightContent";
import { getVenues, removeAllVenues, sortVenues } from "../../../actions/venueActions";
import { getRecommendedVenues } from "../../../actions/userActions";

const BrowseVenues = (props) => {
  const smallScreen = useMediaQuery("(min-width: 650px)");
  const [sortBy, setSortBy] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (props.venueLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageNumber < props.totalPages) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [props.venueLoading]
  );

  const venuesSortByHandler = (newSortBy) => {
    setSortBy(newSortBy);
    props.sortVenues(newSortBy);
  };

  useEffect(() => {
    props.getVenues(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    props.getRecommendedVenues();
  }, []);

  useEffect(() => {
    return () => {
      props.removeAllVenues();
    };
  }, []);

  let renderVenues = <Loading />;

  if (props.venuesLoading && props.allVenues.length === 0) {
    renderVenues = <Loading />;
  } else {
    renderVenues = (
      <VenuesList
        allVenues={props.allVenues}
        sortBy={sortBy}
        venuesSortByHandler={venuesSortByHandler}
        user={props.user}
        userInfo={props.userInfo}
      />
    );
  }
  return (
    <Card withBorder shadow="md" p={smallScreen ? "md" : "xs"}>
      <Grid columns={12}>
        <Grid.Col xl={8}>
          {renderVenues}
          {props.venuesLoading && props.allVenues.length > 0 ? <Loading /> : null}
        </Grid.Col>
        <MediaQuery smallerThan="xl" styles={{ display: "none" }}>
          <Grid.Col xl={4}>
            <Card withBorder shadow="md" p="sm">
              <RightContent
                recommendedVenues={props.recommendedVenues}
                recommendedVenuesLoading={props.recommendedVenuesLoading}
                userInfo={props.userInfo}
              />
            </Card>
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    venuesLoading: state.venue.venuesLoading,
    allVenues: state.venue.allVenues,
    user: state.auth.user,
    userInfo: state.auth.userInfo,
    recommendedVenues: state.user.recommendedVenues,
    recommendedVenuesLoading: state.user.recommendedVenuesLoading,
  };
};

export default connect(mapStateToProps, {
  getVenues,
  removeAllVenues,
  sortVenues,
  getRecommendedVenues,
})(BrowseVenues);
