import { getData } from "@/helper/helper";
import React, { useEffect, FC, useState } from "react";
import { StarFilled } from "@ant-design/icons";
import ImageContainer from "@/components/ImageContainer/ImageContainer";

import Amenities from "@/components/anmenities/Amenities";
import { BsFillAwardFill, BsBook } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";
import { BiShapeTriangle, BiBed } from "react-icons/bi";
import details from "../../public/details.png";
import BookingDate from "@/components/Header/BookingDate";

import { DateRangePicker } from "react-dates";
import moment from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { bookingDates } from "@/redux/action";
import CustomModal from "@/components/modal/CustomModal";
import { Modal } from "antd";
import Image from "next/image";
import RoomCheckIn from "@/components/RoomCheckIn/RoomCheckIn";
import Header from "@/components/Header/Header";
import { Data } from "@/owner-utils/OnwerUtils";
interface IProps {
  hotel: any;
}
const Rooms: FC<IProps> = (props) => {
  const { hotel } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const [displayCalender, setDisplayCalender] = useState<boolean>(false);
  const dates = useSelector((state: any) => state.Reducer);
  const [top, setTop] = useState(600);
  const [hydrated, setHydrated] = useState(false);
  const [width, setWidth] = useState("60%");
  const dispatch = useDispatch();
  const ModalHandler = () => {
    setIsModalOpen(true);
  };

  const cancelBookingDatesHandler = () => {
    dispatch(bookingDates({ startDate: "", endDate: "" }));
  };
  useEffect(() => {
    setHydrated(true);
  }, []);
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 600) {
        setTop(window.scrollY + 200);
        setDisplayCalender(true);
      } else if (window.screenY < 600) {
        setTop(600);
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  console.log(dates);
  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      console.log(entries);
      if (entries[0].boundingClientRect.y < 0) {
        console.log("Past 100px!");
      } else {
        console.log("Not past 100px");
      }
    });
    observer.observe(document.querySelector(".container")!);
  }, []);
  return (
    <div className="relative">
      <div className="">
        <Header />
      </div>
      <div className="w-[80%] mx-auto">
        <h3 className="font-bold text-xl my-2">{hotel?.name}</h3>
        <div className="flex items-center gap-2 mb-4">
          {hotel.rating && (
            <div className="flex items-center">
              <StarFilled />
              <span className="ml-1">{hotel.rating}</span>
            </div>
          )}
          <span className="font-bold">.</span>
          <span className="underline font-semibold">10 reviews </span>
          <span className="font-bold">.</span>
          <div className="flex items-center">
            <BsFillAwardFill />
            <span className="underline font-semibold">Superhost</span>
          </div>
          <span className="font-semibold">{hotel.country}</span>
        </div>
        <ImageContainer view={hotel.groupImages} />
        <main className=" mt-8 ">
          <div
            className="absolute input-scroller left-[60%]"
            style={{ top: `${top}px` }}
          >
            <RoomCheckIn
              reviews={"10reviews"}
              ratings={hotel.rating}
              price={hotel.discountedPrice}
            />
          </div>
          <section className="pb-6 border-b border-gray-200 w-[60%] container flex items-center ">
            <div className="flex-grow">
              <h3 className="text-2xl text-black font-bold mb-1">
                Entire villa hosted by{" "}
                {hydrated && Data?.[Math.floor(Math.random() * 8)]?.name}
              </h3>
              <h3 className="text-lg">
                {hotel.guests} . {hotel.bedroom} . {hotel.bed} .{" "}
                {hotel.bathroom}
              </h3>
            </div>
            <div className="relative w-[3rem] h-[3rem] ">
              {hydrated && (
                <img
                  className="rounded-full"
                  src={Data?.[Math.floor(Math.random() * 8)]?.img as any}
                  alt=""
                />
              )}
            </div>
          </section>
          <section className="mt-12 border-b border-gray-200 w-[60%]">
            <div className="flex gap-4 mb-4 w-[60%]">
              <BsBook className="text-2xl mt-2" />
              <div>
                <h3 className="text-base font-semibold text-black">
                  Featured in
                </h3>
                <h4 className="text-sm text-gray-600">Wallpaper*, May 2020</h4>
                <h4 className="text-sm text-gray-600">Vogue, September 2019</h4>
              </div>
            </div>
            <div className="flex gap-4 mb-4 ">
              <AiOutlineTrophy className="text-2xl  mt-2" />
              <div>
                <h3 className="text-base font-semibold text-black">
                  Awards won
                </h3>
                <h4 className="text-sm text-gray-600">
                  Architizer A+ Award, 2021
                </h4>
              </div>
            </div>
            <div className="flex gap-4 mb-4  mt-2">
              <BiShapeTriangle className="text-2xl" />
              <div>
                <h3 className="text-base font-semibold text-black">
                  Designed by
                </h3>
                <h4 className="text-sm text-gray-600">FormaFatal</h4>
              </div>
            </div>
          </section>
          <section className="py-8 border-b border-gray-200">
            <div className="w-[60%]">
              <h3 className="">
                <span className="text-pink-600 font-extrabold text-3xl">
                  air
                </span>
                <span className="text-black font-extrabold text-3xl">
                  cover
                </span>
              </h3>
              <p className="my-4">
                Every booking includes free protection from Host cancellations,
                listing inaccuracies, and other issues like trouble checking in.
              </p>
              <span className="font-semibold underline text-base">
                Learn More
              </span>
            </div>
          </section>
          <section className="my-8">
            <p className="text-gray-600">
              All accommodation BREAKFAST INCLUDED Transcend the boundaries
              between inside and outside. Slide open the walls, slip through,
              and behold the striking expanse of the outside world. Just above
              beautiful beach with ocean view and jungle setting. Just published
              in Wall Paper, Dezeen etc etc.
            </p>
            <p className="text-gray-600 mb-4">
              We are only 1km from the main road and beach on a steep unpaved
              road hill, giving you superb ocean view but you need 4x4 car for
              access....
            </p>
            <span
              className="font-semibold underline text-base cursor-pointer"
              onClick={ModalHandler}
            >
              Show More
            </span>
          </section>
          <section className="border-t border-gray-200">
            <h3 className="text-3xl text-black font-bold  mt-8">
              Where you'll sleep
            </h3>
            <div className="flex gap-4 mt-8">
              <div className="w-[12rem] h-[9rem] border border-gray-300 rounded-2xl">
                <div className="ml-4">
                  <BiBed className="text-2xl my-4" />
                  <h3 className="font-semibold">Bedroom 1</h3>
                  <h3 className="mt-1">1 double bed</h3>
                </div>
              </div>
              <div className="w-[12rem] h-[9rem] border border-gray-300 rounded-2xl">
                <div className="ml-4">
                  <BiBed className="text-2xl my-4" />
                  <h3 className="font-semibold">Bedroom 2</h3>
                  <h3 className="mt-1">1 double bed</h3>
                </div>
              </div>
              <div className="w-[12rem] h-[9rem] border border-gray-300 rounded-2xl">
                <div className="ml-4">
                  <BiBed className="text-2xl my-4" />
                  <h3 className="font-semibold">Bedroom 3</h3>
                  <h3 className="mt-1">1 double bed</h3>
                </div>
              </div>
            </div>
          </section>
          <section className="w-[60%]">
            <Amenities amenities={hotel?.details} />
            <section className="w-[60%]">
              <div className="room-date-picker mt-8">
                <h3 className="text-3xl text-black font-bold mb-1">
                  Select check-in date
                </h3>

                {!dates.bookingStartDate && !dates.bookingEndDate ? (
                  <h3 className=" text-gray-400">
                    Add your travel dates for exact pricing
                  </h3>
                ) : (
                  <h3 className=" text-gray-600">
                    {dates?.bookingStartDate?.format("DD-MM-YYYY")} -{" "}
                    {dates?.bookingEndDate?.format("DD-MM-YYYY")}
                  </h3>
                )}
                {
                  <div>
                    <DateRangePicker
                      startDate={dates.bookingStartDate}
                      startDateId="startDate"
                      endDate={dates.bookingEndDate}
                      disabled={true}
                      endDateId="endDate"
                      onDatesChange={({ startDate, endDate }) => {
                        dispatch(
                          bookingDates({
                            startDate,
                            endDate,
                          })
                        );
                      }}
                      focusedInput={
                        dates.bookingEndDate
                          ? "startDate"
                          : dates.bookingStartDate
                          ? "endDate"
                          : "startDate"
                      }
                      onFocusChange={setFocusedInput}
                      initialVisibleMonth={() => moment().subtract(0, "month")}
                      orientation={"horizontal"}
                    />
                  </div>
                }
                <div className="mt-[18rem] border-b border-gray-200">
                  <div className="flex  items-center gap-4 border-b border-gray-200 pt-2 pb-4 w-[35rem] justify-between">
                    <div className="relative h-[1.5rem] w-[1.5rem]">
                      <Image src={details} layout="fill" alt="" />
                    </div>
                    <span
                      className="text-base underline text-black font-semibold cursor-pointer"
                      onClick={cancelBookingDatesHandler}
                    >
                      Clear
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </main>

        {isModalOpen && (
          <CustomModal>
            <Modal
              open={isModalOpen}
              onCancel={() => {
                setIsModalOpen(false);
              }}
            >
              <div className="text-lg">
                <h3 className="font-bold text-2xl mb-4">About this space</h3>
                <p>All accommodation BREAKFAST INCLUDED</p>
                <p>
                  Transcend the boundaries between inside and outside. Slide
                  open the walls, slip through, and behold the striking expanse
                  of the outside world. Just above beautiful beach with ocean
                  view and jungle setting. Just published in Wall Paper, Dezeen
                  etc etc.
                </p>
                <p className="my-4">
                  We are only 1km from the main road and beach on a steep
                  unpaved road hill, giving you superb ocean view but you need
                  4x4 car for access....
                </p>
                <h3 className="font-bold text-base mt-4">The space</h3>
                <p className="mb-4">
                  All our accommodations are with BREAKFAST INCLUDED
                </p>
                <p>
                  IMPORTANT INFORMATION we are in a quiet neighborhood NO NOICE
                  AFTER 9.pm outside! If you like to play LOUD MUSIC we are not
                  a suitable place for you. We are NOT PARTY VILLA.
                </p>
                <p className="my-4">
                  A spacious interior filled with light and shade, crowned by a
                  rooftop jungle garden. Encounter the breath-giving force of
                  nature from a rare, serene space that merges the elements in
                  polished simplicity.
                </p>
                <h3 className="font-bold text-base">Other things to note</h3>
                <p>
                  Please note we are in a quiet neighborhood in the middle of
                  beautiful nature. We kindly ask you not to cause noise after 9
                  pm.
                </p>
                <p className="mt-4">
                  Please note we are in the open jungle. We have bed mosquito
                  net, but if you are afraid of insects, it is not for you.
                </p>
              </div>
            </Modal>
          </CustomModal>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps(context: any) {
  const response = await getData(
    "https://airbus-demo-1a4fb-default-rtdb.firebaseio.com/hotel.json"
  );
  const data = [];
  for (const key in response) {
    data.push({ id: key, ...response[key] });
  }

  const Hoteldetails = JSON.parse(
    JSON.stringify(data.find((item) => item.id === context.params.rooms))
  );

  return {
    props: { hotel: Hoteldetails },
  };
}
export async function getStaticPaths() {
  const response = await getData(
    "https://airbus-demo-1a4fb-default-rtdb.firebaseio.com/hotel.json"
  );
  const paramKey = [];
  for (const key in response) {
    paramKey.push({ params: { rooms: key } });
  }

  return {
    paths: paramKey,
    fallback: false,
  };
}

export default Rooms;
