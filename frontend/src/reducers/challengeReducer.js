import {
  GET_CHALLENGES,
  SET_CHALLENGES_LOADING,
  ACCEPT_CHALLENGE,
  SET_ACCEPT_CHALLENGE_LOADING,
  SET_ACCEPTING_CHALLENGE_ID,
} from "../actions/types";

const inititalState = {
  challenges: [],
  challengesLoading: false,
  acceptChallengeLoading: false,
  acceptingChallengeId: null,
};

const challengeReducer = (state = inititalState, action) => {
  switch (action.type) {
    // ## Fetch all challenges
    case GET_CHALLENGES:
      return {
        ...state,
        challenges: action.payload,
        challengesLoading: false,
      };

    // ## Set loading while fetching challenges
    case SET_CHALLENGES_LOADING:
      return {
        ...state,
        challengesLoading: action.payload,
      };
    case SET_ACCEPTING_CHALLENGE_ID:
      return {
        ...state,
        acceptingChallengeId: action.payload,
      };
    // ## Accept a challenge
    case ACCEPT_CHALLENGE:
      const newChallenges = [...state.challenges];
      const foundIndex = newChallenges.findIndex((el) => el._id === action.payload._id);
      newChallenges[foundIndex] = action.payload;
      return {
        ...state,
        acceptChallengeLoading: action.payload,
        challenges: newChallenges,
        acceptingChallengeId: null,
      };
    // ## Set loading while accepting challenge
    case SET_ACCEPT_CHALLENGE_LOADING:
      return {
        ...state,
        acceptChallengeLoading: action.payload,
      };
    default:
      return state;
  }
};

export default challengeReducer;
