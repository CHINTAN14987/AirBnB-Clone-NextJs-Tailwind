import Image from "next/image";
import React, { useState } from "react";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";

const Header = ({ placeholder }: any) => {
  const [input, setInput] = useState<string>("");
  const [StartDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [guests, setGuests] = useState<string>("1");
  const router = useRouter();
  const SelectionRange: { startDate: Date; endDate: Date; key: string } = {
    startDate: StartDate,
    endDate: endDate,
    key: "selection",
  };
  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          alt=""
          objectFit="contain"
          objectPosition="left"
          onClick={() => {
            router.push({ pathname: "/" });
          }}
        />
      </div>
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          placeholder={placeholder || "Enter the Date"}
          className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <SearchIcon className=" hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <p className=" hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
      {input && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[SelectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5681"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              className="w-12 pl-2 text-lg outline-none text-red-400"
              value={guests}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setGuests(e.target.value);
              }}
              min={1}
            />
          </div>
          <div className="flex">
            <button
              className="flex-grow text-gray-500"
              onClick={() => {
                setInput("");
              }}
            >
              Cancel
            </button>
            <button
              className="flex-grow text-red-500"
              onClick={() => {
                router.push({
                  pathname: "/search",
                  query: {
                    location: input,
                    startDate: StartDate.toISOString(),
                    endDate: endDate.toISOString(),
                    noOfGuests: guests,
                  },
                });
              }}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
