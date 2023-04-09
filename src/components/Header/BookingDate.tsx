import React, { FC, useState } from "react";
import { DateRangePicker } from "react-dates";
import moment from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { bookingDates } from "@/redux/action";
// import "@vf-alchemy/vattenfall-design-system/scss/main.scss";
const data = ["Exact Dates", "± 1days", "± 2days", "± 3days", "± 7days"];

const BookingDate = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const dates = useSelector((state: any) => state.Reducer);
  const disptach = useDispatch();

  return (
    <div>
      <div className="date-picker-component">
        <DateRangePicker
          className=""
          startDate={dates.bookingStartDate}
          startDateId="startDate"
          endDate={dates.bookingEndDate}
          endDateId="endDate"
          onDatesChange={({ startDate, endDate }) => {
            disptach(bookingDates({ startDate, endDate }));
          }}
          focusedInput={focusedInput}
          onFocusChange={setFocusedInput}
          // isOutsideRange={(day) => !isInclusivelyBeforeDay(day, moment())}
          initialVisibleMonth={() => moment().subtract(0, "month")}
          // numberOfMonths={1}
          orientation={"horizontal"}
        />

        {focusedInput && (
          <div
            className="flex justify-center bg-gray-300 max-w-fit mx-auto items-center p-1 w-[20rem] rounded-full absolute"
            style={{ top: "10rem", left: "-2.5rem", zIndex: 100 }}
          >
            <h3 className=" bg-white rounded-full p-2 w-[10rem] text-center font-semibold text-base">
              Choose Dates
            </h3>
            <h3 className="w-[10rem] text-center font-semibold text-base hover:bg-white rounded-full p-2">
              Flexible Dates
            </h3>
          </div>
        )}
      </div>

      {focusedInput && (
        <div
          className="flex gap-4 absolute items-center"
          style={{ top: "43rem", right: "17.8rem", zIndex: "100" }}
        >
          {data?.map((item: string, index: number) => {
            return (
              <span
                key={index}
                className=" w-[5.5rem] border border-gray-200 rounded-full py-1 text-center text-gray-800 text-sm hover:border-black cursor-pointer"
              >
                {item}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default BookingDate;
