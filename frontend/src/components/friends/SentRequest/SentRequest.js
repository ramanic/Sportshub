import React, { useEffect } from "react";
import { Card, Text } from "@mantine/core";
import { connect } from "react-redux";

import SentItem from "./SentItem";
import Loading from "../../common/Loading";
import { getSentRequests } from "../../../actions/friendActions";

const SentRequest = (props) => {
  useEffect(() => {
    props.getSentRequests();
  }, []);

  let renderSentRequests = <Loading />;

  if (props.sentRequestsLoading && props.sentRequests.length === 0) {
    renderSentRequests = <Loading />;
  } else if (props.sentRequests.length === 0) {
    renderSentRequests = <Text>You have no sent requests</Text>;
  } else if (props.sentRequests.length > 0) {
    renderSentRequests = props.sentRequests.map((sent) => <SentItem key={sent._id} sent={sent} />);
  }

  return (
    <Card withBorder shadow="md">
      {renderSentRequests}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    sentRequests: state.friend.sentRequests,
    sentRequestsLoading: state.friend.sentRequestsLoading,
  };
};

export default connect(mapStateToProps, { getSentRequests })(SentRequest);
