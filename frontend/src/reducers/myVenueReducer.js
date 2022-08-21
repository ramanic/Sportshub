import {
  GET_MY_VENUES,
  SET_MY_VENUES_LOADING,
  GET_VENUE_HISTORY,
  SET_VENUE_HISTORY_LOADING,
  GET_MY_VENUE_AGGREGATES,
  SET_MY_VENUE_AGGREGATES_LOADING,
} from "../actions/types";

const initialState = {
  myVenues: [],
  myVenuesLoading: false,
  venueHistory: [],
  currentVenue: {},
  venueHistoryLoading: false,
  venueAggregates: null,
  venueAggregatesLoading: false,
};

const myVenueReducer = (state = initialState, action) => {
  switch (action.type) {
    // ## Get all my venues
    case GET_MY_VENUES:
      return {
        ...state,
        myVenues: action.payload,
        myVenuesLoading: false,
      };

    // ## Set loading while fetching my venues
    case SET_MY_VENUES_LOADING:
      return {
        ...state,
        myVenuesLoading: action.payload,
      };

    // ## Get venue history
    case GET_VENUE_HISTORY:
      return {
        ...state,
        venueHistoryLoading: false,
        currentVenue: action.payload.venue,
        venueHistory: action.payload.venueBookings,
      };

    // ## Set loading while fetching venue history
    case SET_VENUE_HISTORY_LOADING:
      return {
        ...state,
        venueHistoryLoading: action.payload,
      };
    case GET_MY_VENUE_AGGREGATES:
      return {
        ...state,
        venueAggregates: action.payload,
        venueAggregatesLoading: false,
      };
    case SET_MY_VENUE_AGGREGATES_LOADING:
      return {
        ...state,
        venueAggregatesLoading: action.payload,
      };
    default:
      return state;
  }
};

export default myVenueReducer;
