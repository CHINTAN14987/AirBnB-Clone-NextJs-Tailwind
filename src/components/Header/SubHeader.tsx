import {
  appBackground,
  bookingDates,
  destinationSearch,
  searchResults,
} from "@/redux/action";
import { SearchIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/";
import BookingStartDate from "./BookingDate";
import BookingDate from "./BookingDate";
import Region from "./Region";
import { DatePicker, Space } from "antd";
import Guests from "./Guests";
import { DateRangePicker, isInclusivelyBeforeDay } from "react-dates";
import moment from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import FlexibleDates from "./FlexibleDates";
const { RangePicker } = DatePicker;
const SubHeader = () => {
  const [displayRegion, setDisplayRegion] = useState<Boolean>(false);
  const [displayGuests, setDisplayGuests] = useState<Boolean>(false);
  const bookingDetails = useSelector((state: any) => state.Reducer);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const guestsRef = useRef(null);
  // const [searchResults, setSearchResults] = useState<Boolean>(false);
  const dates = useSelector((state: any) => state.Reducer);
  const disptach = useDispatch();

  const onFocusRegionHandler = (): void => {
    setDisplayRegion(true);
    dispatch(appBackground({ bg: "rgba(0, 0, 0, 0.2)", pos: "initial" }));
  };

  const onFocusGuestsHandler = (): void => {
    setDisplayGuests(true);
  };
  const destinationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(destinationSearch({ location: e.target.value }));
  };
  const searchHandler = () => {
    // setSearchResults(true);
    dispatch(
      searchResults({
        data: {
          guests: bookingDetails.list,
          startDate: bookingDetails?.bookingStartDate?.format("DD-MM-YYYY"),
          endDate: bookingDetails?.bookingEndDate?.format("DD-MM-YYYY"),
          location: bookingDetails.destination,
        },
      })
    );
  };

  useEffect(() => {
    const clickHandler = (e: any) => {
      console.log(e.target, "hello");
      if (!ref?.current?.contains(e.target)) {
        setDisplayRegion(false);
      }
    };
    window.addEventListener("click", clickHandler);
    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY) {
        setDisplayRegion(false);
        dispatch(appBackground({ bg: "#ffffff", pos: "sticky" }));
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  useEffect(() => {
    const clickHandler = (e: any) => {
      if (!guestsRef?.current?.contains(e.target)) {
        setDisplayGuests(false);
      }
    };
    window.addEventListener("click", clickHandler);
    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, []);
  return (
    <nav className="flex justify-center items-center mt-5 relative z-30">
      <div className="flex justify-center items-center bg-gray-200 rounded-full">
        <div
          className="w-[18rem] flex flex-col justify-center p-3 rounded-full shadow-xl bg-white relative"
          ref={ref}
        >
          <h3 className="text-sm font-semibold">Where</h3>
          <input
            placeholder="Search destinations"
            className="outline-none"
            onFocus={onFocusRegionHandler}
            value={bookingDetails.destination}
            onChange={destinationHandler}
          />
          {displayRegion && <Region />}
        </div>
        <div className="flex justify-between items-center mr-2 w-[35rem]">
          <div className="ml-10 ">
            <h3 className="text-sm font-semibold">Check in</h3>
            <BookingStartDate />
          </div>
          <hr className="border h-8 border-gray-400" />
          <div>
            <h3 className="text-sm font-semibold h-[3.5rem]">Check out</h3>
          </div>
          <hr className="border h-8 border-gray-400" />
          <div className="flex">
            <div className="relative" ref={guestsRef}>
              <h3 className="text-sm font-semibold">Who</h3>
              <input
                placeholder="Add guests"
                className="bg-gray-200 w-[5rem] outline-none"
                readOnly
                onFocus={onFocusGuestsHandler}
              />
              {displayGuests && <Guests />}
            </div>
            <div>
              <div
                className=" flex items-center px-3 py-2 m-2 bg-red-400 text-white rounded-full cursor-pointer"
                onClick={searchHandler}
              >
                <SearchIcon className="w-[1.5rem]" />
                <span> Search</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SubHeader;
