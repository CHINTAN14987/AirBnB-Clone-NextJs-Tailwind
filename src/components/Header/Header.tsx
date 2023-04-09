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
import { useRouter } from "next/router";
import SubHeader from "./SubHeader";
import Link from "next/link";

const Header = () => {
  const [input, setInput] = useState<string>("");
  const [guests, setGuests] = useState<string>("1");
  const router = useRouter();
  const [displayNav, setDisplayNav] = useState<Boolean>(false);

  const displaySubNavBarHandler = (): void => {
    setDisplayNav(true);
  };

  return (
    <header className="mx-20">
      <div className=" grid grid-cols-3 bg-white">
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

        {displayNav ? (
          <div className="flex justify-between items-center w-[25rem]">
            <button className="border-b-2 border-black text-lg text-gray-600">
              Stays
            </button>
            <button className="text-lg text-gray-600 hover:border-b-2 border-gray-400">
              Experiences
            </button>
            <Link
              href=""
              className="text-lg text-gray-600 hover:border-b-2 border-gray-400"
            >
              Online Experiences
            </Link>
          </div>
        ) : (
          <div className="flex items-center  w-[25rem] md:border-2 rounded-full py-2 md:shadow-sm cursor-pointer">
            <button
              className="font-semibold border-r-2 px-2 ml-5 text-center"
              onClick={displaySubNavBarHandler}
            >
              Anywhere
            </button>
            <button
              className="font-semibold border-r-2 px-2 text-center"
              onClick={displaySubNavBarHandler}
            >
              Any week
            </button>
            <button
              className="border-r-2 px-2 text-center mr-5"
              onClick={displaySubNavBarHandler}
            >
              Add guests
            </button>
            <SearchIcon className=" hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
          </div>
        )}
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
              <button className="flex-grow text-red-500">Search</button>
            </div>
          </div>
        )}
      </div>
      {displayNav && <SubHeader />}
    </header>
  );
};

export default Header;
