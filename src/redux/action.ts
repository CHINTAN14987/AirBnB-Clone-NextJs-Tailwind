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

export const appBackground = (data: any) => ({
  type: TOGGLE_BACKGROUND_COLOR,
  payload: data,
});

export const bookingDates = (data: any) => ({
  type: BOOKING_DATES,
  payload: data,
});
export const GuestListBookingIncrement = (data: any) => ({
  type: GUESTS_LIST_INCREMENT,
  payload: data,
});
export const GuestListBookingDecrement = (data: any) => ({
  type: GUESTS_LIST_DECREMENT,
  payload: data,
});
export const destinationSearch = (data: any) => ({
  type: DESTINATION_SEARCH,
  payload: data,
});
export const searchResults = (data: any) => ({
  type: SEARCH_RESULTS,
  payload: data,
});

export const getHotels = (data: any) => ({ type: GET_HOTELS, payload: data });
