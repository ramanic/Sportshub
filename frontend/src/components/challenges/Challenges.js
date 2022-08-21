import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Title } from "@mantine/core";

import Loading from "../common/Loading";
import ChallengeItem from "./ChallengeItem";
import { getChallenges } from "../../actions/challengeActions";

const Challenges = (props) => {
  useEffect(() => {
    props.getChallenges();
  }, []);

  let renderChallenges = <Loading />;

  if (props.challengesLoading && props.challenges.length === 0) {
    renderChallenges = <Loading />;
  } else {
    renderChallenges = props.challenges.map((challenge) => (
      <ChallengeItem
        key={challenge._id}
        challenge={challenge}
        acceptingChallengeId={props.acceptingChallengeId}
      />
    ));
  }

  return (
    <Card withBorder shadow="lg">
      <Title order={3} mb={12}>
        Challenges
      </Title>
      {renderChallenges}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    challenges: state.challenge.challenges,
    challengesLoading: state.challenge.challengesLoading,
    acceptingChallengeId: state.challenge.acceptingChallengeId,
  };
};

export default connect(mapStateToProps, { getChallenges })(Challenges);
