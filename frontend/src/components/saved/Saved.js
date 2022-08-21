import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Tabs, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import SavedPosts from "./SavedPosts/SavedPosts";
import SavedProducts from "./SavedProducts/SavedProducts";
import SavedVenues from "./SavedVenues/SavedVenues";
import Loading from "../common/Loading";
import isEmpty from "../../utils/isEmpty";
import { getSaved } from "../../actions/savedActions";

const Saved = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const mediumScreen = useMediaQuery("(min-width: 992px)");

  useEffect(() => {
    props.getSaved();
  }, []);

  let renderSaved = <Loading />;

  if (props.mySavedLoading && isEmpty(props.mySaved)) {
    renderSaved = <Loading />;
  } else if (!isEmpty(props.mySaved)) {
    renderSaved = (
      <Tabs
        active={activeTab}
        onTabChange={setActiveTab}
        position={mediumScreen ? "center" : "left"}
      >
        <Tabs.Tab label="Posts">
          <SavedPosts posts={props.mySaved.posts} user={props.user} />
        </Tabs.Tab>
        <Tabs.Tab label="Products" products={props.mySaved.products}>
          <SavedProducts products={props.mySaved.products} user={props.user} />
        </Tabs.Tab>
        <Tabs.Tab label="Venues">
          <SavedVenues venues={props.mySaved.venues} user={props.user} />
        </Tabs.Tab>
      </Tabs>
    );
  }

  return (
    <Card withBorder shadow="lg">
      <Title order={3}>Your Saved History</Title>
      {renderSaved}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    mySaved: state.saved.mySaved,
    mySavedLoading: state.saved.mySavedLoading,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getSaved })(Saved);
