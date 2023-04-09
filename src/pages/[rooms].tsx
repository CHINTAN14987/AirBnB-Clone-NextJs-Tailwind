import { getData } from "@/helper/helper";
import React, { FC, useState } from "react";
import { StarFilled } from "@ant-design/icons";
import { CgDice6 } from "react-icons/cg";
import ImageContainer from "@/components/ImageContainer/ImageContainer";
import Amenities from "@/components/anmenities/Amenities";
import { BsFillAwardFill, BsBook } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";
import { BiShapeTriangle, BiBed } from "react-icons/bi";
import details from "../../public/details.png";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { bookingDates } from "@/redux/action";
import { Modal } from "antd";
import Image from "next/image";
import RoomCheckIn from "@/components/RoomCheckIn/RoomCheckIn";
import Header from "@/components/Header/Header";
import ReviewGraph from "@/components/reviews/ReviewGraph";
import Reviews from "@/components/reviews/Reviews";
import ReviewModal from "@/components/reviews/ReviewModal";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";
interface IProps {
  hotel: any;
}
const Rooms: FC<IProps> = (props) => {
  const { hotel } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const router = useRouter();
  const dates = useSelector((state: any) => state.Reducer);
  const dispatch = useDispatch();
  const ModalHandler = () => {
    setIsModalOpen(true);
  };
  const [displayReviewModal, setDisplayReviewModal] = useState<boolean>(false);
  const [displayAdditionalInfoModal, setDisplayAdditionalInfoModal] =
    useState<boolean>(false);

  const cancelBookingDatesHandler = () => {
    dispatch(bookingDates({ startDate: "", endDate: "" }));
  };
  const displayAllImagesHandler = (value: any) => {
    router.push({
      pathname: `./${value.id}/room-images-${value.id}`,
      query: {
        startDate: dates.startDate,
        endDate: dates.endDate,
        location: dates.destination,
        adults: dates.list.adult,
        children: dates.list.children,
        infants: dates.list.infants,
        pets: dates.list.pets,
      },
    });
  };
  return (
    <div className="relative">
      <div className="bg-white w-[100%] z-20">
        <div className="py-4 border-b border-gray-200 w-[100%]">
          <Header />
        </div>
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
          <span
            className="underline font-semibold cursor-pointer"
            onClick={() => {
              setDisplayReviewModal(true);
            }}
          >
            10 reviews{" "}
          </span>
          <span className="font-bold">.</span>
          <div className="flex items-center">
            <BsFillAwardFill />
            <span className="underline font-semibold">Superhost</span>
          </div>
          <span className="font-semibold">{hotel.country}</span>
        </div>
        <section className="relative">
          <ImageContainer view={hotel.groupImages} />
          <button
            className="flex items-center gap-2 font-semibold p-2 border border-black rounded-xl bg-white absolute bottom-8 right-20"
            onClick={() => {
              displayAllImagesHandler(hotel);
            }}
          >
            <CgDice6 />
            <span>Show All Photos</span>
          </button>
        </section>
        <main className=" mt-8 flex justify-between">
          <div className="w-[50%]">
            <section className="pb-6 border-b border-gray-200 container flex items-center ">
              <div className="flex-grow">
                <h3 className="text-2xl text-black font-bold mb-1">
                  Entire villa hosted by {hotel?.ownerDetails?.name}
                </h3>
                <h3 className="text-lg">
                  {hotel.guests} . {hotel.bedroom} . {hotel.bed} .{" "}
                  {hotel.bathroom}
                </h3>
              </div>
              <div className="relative w-[3rem] h-[3rem] ">
                <Image
                  className="rounded-full"
                  layout="fill"
                  src={hotel?.ownerDetails?.img}
                  alt=""
                />
              </div>
            </section>
            <section className="mt-12 border-b border-gray-200">
              <div className="flex gap-4 mb-4">
                <BsBook className="text-2xl mt-2" />
                <div>
                  <h3 className="text-base font-semibold text-black">
                    Featured in
                  </h3>
                  <h4 className="text-sm text-gray-600">
                    Wallpaper*, May 2020
                  </h4>
                  <h4 className="text-sm text-gray-600">
                    Vogue, September 2019
                  </h4>
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
              <div>
                <h3>
                  <span className="text-pink-600 font-extrabold text-3xl">
                    air
                  </span>
                  <span className="text-black font-extrabold text-3xl">
                    cover
                  </span>
                </h3>
                <p className="my-4">
                  Every booking includes free protection from Host
                  cancellations, listing inaccuracies, and other issues like
                  trouble checking in.
                </p>
                <span
                  className="font-semibold underline text-base cursor-pointer"
                  onClick={() => {
                    setDisplayAdditionalInfoModal(true);
                  }}
                >
                  Learn More
                </span>
              </div>
            </section>
            <section className="my-8">
              <p className="">
                All accommodation BREAKFAST INCLUDED Transcend the boundaries
                between inside and outside. Slide open the walls, slip through,
                and behold the striking expanse of the outside world. Just above
                beautiful beach with ocean view and jungle setting. Just
                published in Wall Paper, Dezeen etc etc.
              </p>
              <p className=" mt-2 mb-4">
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
            <section className="border-t border-gray-200 bed-section ">
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

            <Amenities amenities={hotel?.details} />
          </div>
          <section>
            <div
              className="sticky input-scroller bg-white z-50 mt-20"
              style={{ right: "10%", top: "10%" }}
            >
              <RoomCheckIn
                reviews={"10reviews"}
                ratings={hotel.rating}
                price={hotel.discountedPrice}
              />
            </div>
          </section>
        </main>
        <section className="w-[50%]">
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
            <div className="mt-[18rem] mb-8">
              <div className="flex  items-center gap-4 pt-2 pb-4 w-[35rem] justify-between">
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
        <section className="border-t border-gray-200 pt-8">
          <ReviewGraph rating={hotel.rating} modalActive={false} />
          <Reviews rating={hotel.rating} modalActive={false} />
        </section>
        {displayReviewModal && (
          <Modal
            open={displayReviewModal}
            onCancel={() => {
              setDisplayReviewModal(false);
            }}
            style={{ minHeight: "20rem" }}
            width={"50rem"}
          >
            <ReviewModal rating={hotel.rating} />
          </Modal>
        )}
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            width={"40rem"}
          >
            <div className="text-base mt-8 h-[30rem] overflow-y-auto pr-4">
              <h3 className="font-bold text-2xl mb-4">About this space</h3>
              <p>All accommodation BREAKFAST INCLUDED</p>
              <p>
                Transcend the boundaries between inside and outside. Slide open
                the walls, slip through, and behold the striking expanse of the
                outside world. Just above beautiful beach with ocean view and
                jungle setting. Just published in Wall Paper, Dezeen etc etc.
              </p>
              <p className="my-4">
                We are only 1km from the main road and beach on a steep unpaved
                road hill, giving you superb ocean view but you need 4x4 car for
                access....
              </p>
              <h3 className="font-bold text-base mt-4">The space</h3>
              <p className="mb-4">
                All our accommodations are with BREAKFAST INCLUDED
              </p>
              <p>
                IMPORTANT INFORMATION we are in a quiet neighborhood NO NOICE
                AFTER 9.pm outside! If you like to play LOUD MUSIC we are not a
                suitable place for you. We are NOT PARTY VILLA.
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
                Please note we are in the open jungle. We have bed mosquito net,
                but if you are afraid of insects, it is not for you.
              </p>
            </div>
          </Modal>
        )}
        {displayAdditionalInfoModal && (
          <Modal
            open={displayAdditionalInfoModal}
            onCancel={() => {
              setDisplayAdditionalInfoModal(false);
            }}
            width={"60rem"}
          >
            <div className="pt-8">
              <h3 className="mb-4">
                <span className="text-pink-600 font-extrabold text-4xl">
                  air
                </span>
                <span className="text-black font-extrabold text-4xl">
                  cover
                </span>
              </h3>
              <h3 className="text-base font-light mb-8 text-black">
                AirCover is comprehensive protection included for free with
                every booking.
              </h3>
              <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-8">
                <div>
                  <h3 className="font-bold text-base mb-2">
                    Booking Protection Guarantee
                  </h3>
                  <p className="text-base text-gray-[#717171]">
                    In the unlikely event that a Host needs to cancel your
                    booking within 30 days of check-in, well find you a similar
                    or better home or well refund you.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2">
                    Check-In Guarantee
                  </h3>
                  <p className="text-base  text-gray-[#717171]">
                    If you cant check into your home and the Host cannot resolve
                    the issue, well find you a similar or better home for the
                    length of your original stay or well refund you.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2">
                    Get-What-You-Booked Guarantee
                  </h3>
                  <p className="text-base  text-gray-[#717171]">
                    If at any time during your stay you find your listing isn't
                    as advertised - for example, the refrigerator stops working
                    and your Host cant easily fix it, or it has fewer bedrooms
                    than listed - you'll have three days to report it and well
                    find you a similar or better home, or well refund you.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2">
                    24-hour Safety Line
                  </h3>
                  <p className="text-base text-gray-[#717171]">
                    If you ever feel unsafe, you’ll get priority access to
                    specially trained safety agents, day or night.
                  </p>
                </div>
              </div>
              <p className="text-base font-light mb-8 text-black mt-8">
                Find complete details on how AirCover protects your booking in
                our <strong>Help Centre</strong>
              </p>
            </div>
          </Modal>
        )}
      </div>
      <Footer />
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
