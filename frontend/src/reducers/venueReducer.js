import {
  GET_ALL_VENUES,
  REMOVE_ALL_VENUES,
  SET_VENUES_LOADING,
  SET_CREATE_VENUE_LOADING,
  SORT_VENUE_BY_NAME,
  GET_VENUE,
  SET_VENUE_LOADING,
  SET_EDIT_VENUE_LOADING,
  GET_VENUE_AVAILABILITY,
  SET_VENUE_AVAILABILITY_LOADING,
  UPDATE_VENUE_SCHEDULE,
  SET_UPDATE_VENUE_SCHDULE_LOADING,
  VERIFY_VENUE,
  SET_VERIFY_VENUE_LOADING,
  REVIEW_VENUE,
  SET_REVIEW_VENUE_LOADING,
  SAVE_VENUE_FROM_LIST,
  SAVE_VENUE_FROM_SINGLE,
  SET_BOOK_VENUE_LOADING,
  GET_MY_BOOKINGS,
  SET_MY_BOOKINGS_LOADING,
} from "../actions/types";

const initialState = {
  allVenues: [],
  totalPages: null,
  createVenueLoading: false,
  venuesLoading: false,
  currentVenue: null,
  venueLoading: false,
  editVenueLoading: false,
  venueAvailability: null,
  venueAvailabilityLoading: false,
  updateVenueScheduleLoading: false,
  verifyVenueLoading: false,
  reviewVenueLoading: false,
  bookVenueLoading: false,
  myBookings: [],
  myBookingsLoading: false,
};

const venueReducer = (state = initialState, action) => {
  switch (action.type) {
    // ## Fetch all venues
    case GET_ALL_VENUES:
      return {
        ...state,
        venuesLoading: false,
        allVenues: [...state.allVenues, ...action.payload.venues],
        totalPages: action.payload.totalPages,
      };

    // ## Set loading while fetching venues
    case SET_VENUES_LOADING:
      return {
        ...state,
        venuesLoading: action.payload,
      };

    // ## Remove all venues when component unmounts
    case REMOVE_ALL_VENUES:
      return {
        ...state,
        allVenues: [],
      };
    // ## Set loading while creating a venue
    case SET_CREATE_VENUE_LOADING:
      return {
        ...state,
        createVenueLoading: action.payload,
      };

    // ## Sort venues by their names
    case SORT_VENUE_BY_NAME:
      return {
        ...state,
        allVenues: state.allVenues.sort((a, b) => a.name.localeCompare(b.name)),
      };
    // ## Get a single venue
    case GET_VENUE:
      return {
        ...state,
        currentVenue: action.payload,
        venueLoading: false,
      };
    // ## Set loading while fetching a venue
    case SET_VENUE_LOADING:
      return {
        ...state,
        venueLoading: action.payload,
      };
    // ## Set loading while editin a venue
    case SET_EDIT_VENUE_LOADING:
      return {
        ...state,
        editVenueLoading: action.payload,
      };
    // ## Get venue availability schedule
    case GET_VENUE_AVAILABILITY:
      return {
        ...state,
        venueAvailabilityLoading: false,
        venueAvailability: action.payload,
      };
    // ## Set loading while checking day availability
    case SET_VENUE_AVAILABILITY_LOADING:
      return {
        ...state,
        venueAvailabilityLoading: action.payload,
      };
    // ## Set loading while updating venue schedule
    case SET_UPDATE_VENUE_SCHDULE_LOADING:
      return {
        ...state,
        updateVenueScheduleLoading: action.payload,
      };
    // ## Verify a venue
    case VERIFY_VENUE:
      let newVenuesData = [...state.allVenues];
      let updateIndex = newVenuesData.findIndex((el) => el._id === action.payload._id);
      newVenuesData[updateIndex] = action.payload;
      return {
        ...state,
        verifyVenueLoading: false,
        allVenues: newVenuesData,
      };
    // ## Set loading while verifying a venue
    case SET_VERIFY_VENUE_LOADING:
      return {
        ...state,
        verifyVenueLoading: action.payload,
      };
    // ## Review a venue
    case REVIEW_VENUE:
      return {
        ...state,
        reviewVenueLoading: false,
        currentVenue: {
          ...state.currentVenue,
          reviews: action.payload.reviews,
        },
      };

    // ## Set loading while reviewing a venue
    case SET_REVIEW_VENUE_LOADING:
      return {
        ...state,
        reviewVenueLoading: action.payload,
      };

    // ## Save venue from list
    case SAVE_VENUE_FROM_LIST:
      const oldVenueIndex = state.allVenues.findIndex(
        (venueItem) => venueItem._id === action.payload._id
      );
      const updatedVenues = [...state.allVenues];
      updatedVenues[oldVenueIndex] = action.payload;
      return {
        ...state,
        allVenues: updatedVenues,
      };

    // ## Save venue from single
    case SAVE_VENUE_FROM_SINGLE:
      return {
        ...state,
        currentVenue: action.payload,
      };

    // ## Set loading while booking venue
    case SET_BOOK_VENUE_LOADING:
      return {
        ...state,
        bookVenueLoading: action.payload,
      };

    // ## Get my bookings
    case GET_MY_BOOKINGS:
      return {
        ...state,
        myBookingsLoading: false,
        myBookings: action.payload,
      };

    // ## Set loading while fetching my bookings
    case SET_MY_BOOKINGS_LOADING:
      return {
        ...state,
        myBookingsLoading: action.payload,
      };

    default:
      return state;
  }
};

export default venueReducer;
