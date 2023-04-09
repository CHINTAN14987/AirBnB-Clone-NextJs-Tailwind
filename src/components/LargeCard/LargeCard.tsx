import React, { FC, useState, useEffect } from "react";
import Slider from "./Slider";
import { HeartTwoTone, HeartFilled, StarFilled } from "@ant-design/icons";
import { db } from "@/firebase/firebase";
import { ref, update } from "firebase/database";
import { useRouter } from "next/router";

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
    setIsRefreshing(false);
    update(ref(db, `hotel/${value.id}`), {
      wishlist: true,
    });
    setIsRefreshing(true);
  };

  const hotelRoomsHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => {
    e.preventDefault();
    (e.target as HTMLElement).tagName === "IMG" &&
      Router.push({ pathname: `./${item.id}`, query: { id: item.id } });
  };
  const whishlistRemoveHandler = async (value: any) => {
    setIsRefreshing(true);
    await update(ref(db, `hotel/${value.id}`), {
      wishlist: false,
    });
  };
  const cancelDiplayPriceHandler = () => {
    setDisplayPrice(false);
  };

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
  }, [props]);

  return (
    <div className="relative cursor-pointer md:grid grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 w-[90%] mx-auto">
      {carouselItems?.map((item: any, index: number) => {
        return (
          <div className="relative max-w-[20rem] min-h-[20rem] " key={index}>
            <div
              onMouseEnter={() => {
                onMouseEnterHandler(index);
              }}
              onClick={(e) => {
                hotelRoomsHandler(e, item);
              }}
              onMouseLeave={onMouseLeaveHandler}
              className="slider"
            >
              <Slider
                content={item.groupImages}
                hover={index === hoverItemIndex ? true : false}
              />
            </div>
            <div>
              {item.wishlist ? (
                <HeartFilled
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
          </div>
        );
      })}
    </div>
  );
};

export default LargeCard;
