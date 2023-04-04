import React, { FC, useState, useEffect, useRef } from "react";
import Slider from "./Slider";
import heartIcon from "../../../public/heart.svg";
import Image from "next/image";
import { HeartTwoTone, HeartFilled, StarFilled } from "@ant-design/icons";
import { addDoc, collection } from "firebase/firestore";
import { database, db } from "@/firebase/firebase";
import { getDatabase, ref, set, update } from "firebase/database";
import { useRouter } from "next/router";
import Link from "next/link";

interface IProps {
  data: any[];
}
const LargeCard: FC<IProps> = (props) => {
  const { data } = props;
  const [carouselItems, setCarouselItems] = useState<any[]>(data);
  const [hoverItemIndex, setHoverItemIndex] = useState<number>(-1);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [displayPrice, setDisplayPrice] = useState<boolean>(false);
  const [displayPriceItemIndex, setDisplayPriceItemIndex] =
    useState<number>(-1);
  const [carouselContentDisplay, setCarouselContentDisplay] =
    useState<boolean>(false);

  const carouselRef = React.useRef<HTMLDivElement | null>(null);
  const Router = useRouter();
  const onMouseEnterHandler = (index: number): void => {
    setHoverItemIndex(index);
  };
  const onMouseLeaveHandler = () => {
    setHoverItemIndex(-1);
  };
  const priceBreakDownHandler = (value: number) => {
    setDisplayPrice(true);
    setDisplayPriceItemIndex(value);
  };
  const whishlistAddHandler = (value: any) => {
    // const dbInstance = collection(database, "wishlist");
    // addDoc(dbInstance, value);
    setIsRefreshing(false);

    // console.log(getDatabase(database));
    update(ref(db, `hotel/${value.id}`), {
      wishlist: true,
    });
    setIsRefreshing(true);

    // Router.replace(Router.asPath);
    // console.log(value);
  };
  useEffect(() => {
    const clickHandler = (e: any) => {
      // const ele = document
      //   .getElementsByClassName("slider")[0]
      //   .querySelectorAll("img");
      // console.log(ele);
      // // console.log(carouselRef.current);
      // console.log(e.target);
      // console.log(carouselRef?.current?.contains(e.target));
    };
    window.addEventListener("click", clickHandler);
    // return () => {
    //   window.removeEventListener("click", clickHandler);
    // };
  }, []);
  const hotelRoomsHandler = (item: any) => {
    // Router.push({ pathname: "./rooms", query: { id: item.id } });
  };
  const whishlistRemoveHandler = async (value: any) => {
    setCarouselContentDisplay(true);
    setIsRefreshing(true);
    await update(ref(db, `hotel/${value.id}`), {
      wishlist: false,
    }).then((snapshot) => {});
    setIsRefreshing(false);
    // Router.replace(Router.asPath);
  };
  const cancelDiplayPriceHandler = () => {
    setDisplayPrice(false);
  };

  useEffect;

  useEffect(() => {
    const fetchData = async () => {
      const largeCardData = await (
        await fetch(
          "https://airbus-demo-1a4fb-default-rtdb.firebaseio.com/hotel.json"
        )
      ).json();

      return largeCardData;
    };
    fetchData().then((r) => {
      const carouselData: any[] = [];
      for (const key in r) {
        carouselData.push({ id: key, ...r[key] });
      }
      setCarouselItems(carouselData);
    });
  }, [isRefreshing]);

  return (
    <div className="relative cursor-pointer md:grid grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 w-[90%] mx-auto">
      {carouselItems?.map((item: any, index: number) => {
        return (
          <Link
            className="relative max-w-[20rem] min-h-[20rem] "
            // onClick={() => {
            //   hotelRoomsHandler(item);
            // }}
            href={`${item.id}`}
          >
            <div
              className="slider"
              onMouseEnter={() => {
                onMouseEnterHandler(index);
              }}
              onMouseLeave={onMouseLeaveHandler}
            >
              <Slider
                content={item.groupImages}
                hover={index === hoverItemIndex ? true : false}
              />
            </div>
            <div>
              {item.wishlist ? (
                <HeartFilled
                  ref={carouselRef}
                  className="absolute z-10 top-5 right-10 text-2xl text-red-600"
                  onClick={() => {
                    whishlistRemoveHandler(item);
                  }}
                />
              ) : (
                <HeartTwoTone
                  className="absolute z-10 top-5 right-10 text-2xl"
                  onClick={() => {
                    whishlistAddHandler(item);
                  }}
                />
              )}
            </div>
            <div className="mb-5">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  {item?.name}, {item?.country}
                </h3>
                {item.rating && (
                  <div>
                    <StarFilled className="text-black" />
                    <span> {item.rating}</span>
                  </div>
                )}
              </div>
              <h3 className="text-gray-400">{item?.nearby}</h3>
              <h3
                className="underline decoration-gray-400 cursor-pointer"
                onClick={() => {
                  priceBreakDownHandler(index);
                }}
              >
                <strong> ₹{item?.discountedPrice}</strong> total before taxes
              </h3>
            </div>
            {displayPrice && displayPriceItemIndex === index && (
              <div className="bg-white absolute z-10 w-[25rem] shadow-2xl top-44 flex flex-col justify-between rounded-xl ">
                <div className="h-[3rem] flex items-center relative">
                  <span
                    className="w-[7%]  px-2 flex justify-center hover:border rounded-full border-black absolute top-3 left-4"
                    onClick={cancelDiplayPriceHandler}
                  >
                    X
                  </span>
                  <h3 className="text-center w-[70%] font-bold flex-grow">
                    Price Breakdown
                  </h3>
                  <hr />
                </div>
                <div className="px-4 flex- flex-col justify-between items-center ">
                  <div className="flex justify-between items-center py-4">
                    <span>₹{item.discountedPrice} x 1 night</span>
                    <span>₹{item.discountedPrice}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center font-bold py-4">
                    <span>Total Before Taxes</span>
                    <span>₹{item.discountedPrice}</span>
                  </div>
                  <hr />
                </div>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default LargeCard;
