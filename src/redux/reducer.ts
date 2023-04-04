import {
  BOOKING_DATES,
  DESTINATION_SEARCH,
  GET_HOTELS,
  GUESTS_LIST,
  GUESTS_LIST_DECREMENT,
  GUESTS_LIST_INCREMENT,
  SEARCH_RESULTS,
  TOGGLE_BACKGROUND_COLOR,
} from "./actionType";

const initialState = {
  background: "",
  navPos: "sticky",
  bookingStartDate: null,
  bookingEndDate: null,
  list: {
    adult: 1,
    children: 0,
    infants: 0,
    pets: 0,
  },
  destination: "",
  results: [],
  hotelList: [],
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_BACKGROUND_COLOR:
      const { bg, pos } = action.payload;
      return { ...state, background: bg, navPos: pos };
    case BOOKING_DATES:
      const { startDate, endDate } = action.payload;
      return { ...state, bookingStartDate: startDate, bookingEndDate: endDate };
    case GUESTS_LIST_INCREMENT:
      const { value } = action.payload;
      switch (value) {
        case "adult":
          return {
            ...state,
            list: { ...state.list, adult: state.list.adult + 1 },
          };
        case "children":
          return {
            ...state,
            list: { ...state.list, children: state.list.children + 1 },
          };
        case "infants":
          return {
            ...state,
            list: { ...state.list, infants: state.list.infants + 1 },
          };
        case "pets":
          return {
            ...state,
            list: { ...state.list, pets: state.list.pets + 1 },
          };
        default:
          return state;
      }
    case GUESTS_LIST_DECREMENT:
      const { type } = action.payload;
      switch (type) {
        case "adult":
          return {
            ...state,
            list: {
              ...state.list,
              adult:
                state.list.adult > 1 ? state.list.adult - 1 : state.list.adult,
            },
          };
        case "children":
          return {
            ...state,
            list: {
              ...state.list,
              children:
                state.list.children > 0
                  ? state.list.children - 1
                  : state.list.children,
            },
          };
        case "infants":
          return {
            ...state,
            list: {
              ...state.list,
              infants:
                state.list.infants > 0
                  ? state.list.infants - 1
                  : state.list.infants,
            },
          };
        case "pets":
          return {
            ...state,
            list: {
              ...state.list,
              pets: state.list.pets > 0 ? state.list.pets - 1 : state.list.pets,
            },
          };
        default:
          return state;
      }
    case DESTINATION_SEARCH:
      const { location } = action.payload;
      return { ...state, destination: location };
    case SEARCH_RESULTS:
      const { data } = action.payload;
      console.log(data);
      return { ...state, results: state.results.concat(data) };
    case GET_HOTELS:
      const { list } = action.payload;
      return { ...state, hotelList: state.hotelList.concat(...list) };

    default:
      return state;
  }
};

export default Reducer;
