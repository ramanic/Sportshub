import axiosInstance from "../utils/axios/axiosInstance";
import {
  GET_CHALLENGES,
  SET_CHALLENGES_LOADING,
  SET_ACCEPT_CHALLENGE_LOADING,
  ACCEPT_CHALLENGE,
  SET_ACCEPTING_CHALLENGE_ID,
} from "./types";
import { setErrors } from "./errorActions";

// Action to fetch challenges
export const getChallenges = () => async (dispatch) => {
  dispatch(setChallengesLoading(true));
  try {
    const response = await axiosInstance.get("/challenge");
    dispatch({
      type: GET_CHALLENGES,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch(setChallengesLoading(false));

    dispatch(setErrors(err.response.data));
  }
};

// Action to accept a challenge
export const acceptChallenge = (challengeId) => async (dispatch) => {
  dispatch({
    type: SET_ACCEPTING_CHALLENGE_ID,
    payload: challengeId,
  });
  dispatch(setAcceptChallengeLoading(true));
  try {
    const response = await axiosInstance.post(`/challenge/accept/${challengeId}`);
    dispatch({
      type: ACCEPT_CHALLENGE,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: SET_ACCEPTING_CHALLENGE_ID,
      payload: null,
    });
    dispatch(setAcceptChallengeLoading(false));
    dispatch(setErrors(err.response.data));
  }
};

const setChallengesLoading = (data) => {
  return {
    type: SET_CHALLENGES_LOADING,
    payload: data,
  };
};
const setAcceptChallengeLoading = (data) => {
  return {
    type: SET_ACCEPT_CHALLENGE_LOADING,
    payload: data,
  };
};
