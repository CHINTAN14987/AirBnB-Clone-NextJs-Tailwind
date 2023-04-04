import React, { useEffect, useRef, useState, FC } from "react";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import { VscTriangleDown } from "react-icons/vsc";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { bookingDates } from "@/redux/action";
import Guests from "../Header/Guests";
import { StarFilled } from "@ant-design/icons";
// import "@vf-alchemy/vattenfall-design-system/scss/main.scss";

interface IProps {
  reviews: any;
  ratings: string;
  price: string;
}
const RoomCheckIn: FC<IProps> = (props) => {
  const { ratings, reviews, price } = props;
  const [focusedInput, setFocusedInput] = useState(null);
  const dates = useSelector((state: any) => state.Reducer);
  const [displayGuests, setDisplayGuests] = useState(false);
  const disptach = useDispatch();
  const bookingGuestsList: any = useSelector(
    (state: any) => state.Reducer.list
  );
  const guestRef = useRef(null);
  const guestContentRef = useRef(null);
  useEffect(() => {
    const clickHandler = (e: any) => {
      if (
        !guestRef?.current?.contains(e.target) &&
        !guestContentRef?.current?.contains(e.target)
      ) {
        setDisplayGuests(false);
      }
    };
    window.addEventListener("click", clickHandler);
    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <div className="flex flex-col border border-gray-400 rounded-xl w-[25rem] relative px-6">
      <div className="flex justify-between h-[5rem] items-center  bg-white">
        <div>
          <h3 className="font-bold text-2xl">₹{price}</h3>
          <h3 className="font-lg text-gray-600">Total before taxes</h3>
        </div>
        <div className="flex items-center space-x-4">
          {ratings && (
            <div className="flex items-center">
              <StarFilled />
              <span className="ml-1">{ratings}</span>
            </div>
          )}
          <span className="underline font-semibold">10 reviews </span>
        </div>
      </div>
      <div className="flex border border-gray-400 h-[4rem] rounded-t-xl border-b-0">
        <div className="border-r border-gray-400 flex-grow flex flex-col pt-2">
          <span className="text-xs font-bold pl-7">CHECK-IN</span>
          <div className="checkin-date-picker">
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
          </div>
        </div>
        <div className=" flex-grow flex flex-col pt-2">
          <span className="text-xs font-bold pl-10">CHECK-OUT</span>
        </div>
      </div>
      <div
        className=" flex-grow flex flex-col h-[4rem] pl-7 border border-gray-400 rounded-b-xl pt-2"
        onClick={() => {
          setDisplayGuests(true);
        }}
        ref={guestRef}
      >
        <span className="text-xs font-bold ">GUESTS</span>
        <h3 className="text-gray-400 font-semibold text-sm">
          {
            <>
              {Object.values(bookingGuestsList)
                .splice(0, 2)
                ?.reduce(
                  (initial: number | any, acc: number | any) => initial + acc,
                  0
                )}{" "}
              Guests
              {bookingGuestsList.infants ? (
                <>
                  {", "}
                  {Object.values(bookingGuestsList)
                    .splice(2, 1)
                    ?.reduce(
                      (initial: number | any, acc: number | any) =>
                        initial + acc,
                      0
                    )}{" "}
                  Infants
                </>
              ) : (
                <></>
              )}{" "}
            </>
          }
        </h3>

        <VscTriangleDown className=" relative left-64 -top-8" />
      </div>

      <button className="bg-pink-600 h-[4rem] text-white font-semibold rounded-xl my-4">
        Check Availability
      </button>
      <h3 className="text-sm text-center mb-4">You won't be charged yet</h3>

      {displayGuests && (
        <div className="absolute top-32 left-48" ref={guestContentRef}>
          <Guests disabled={true} />
        </div>
      )}
    </div>
  );
};

export default RoomCheckIn;
