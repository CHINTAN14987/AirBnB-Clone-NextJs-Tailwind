import { getData } from "@/helper/helper";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
interface IProps {
  images: any;
}
const ImageContainer: FC<IProps> = (props) => {
  const {
    images: { id, groupImages },
  } = props;
  const [displayCarousel, setDisplayCarousel] = useState<boolean>(false);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const displayCarouselHandler = (index: number): void => {
    setDisplayCarousel(true);
    setCarouselIndex(index);
  };
  const cancelDisplayCarouselHandler = (): void => {
    setDisplayCarousel(false);
  };

  return (
    <div
      className={`${
        displayCarousel
          ? "bg-black h-[100vh] room-image-carousel-wrapper text-white pt-10"
          : ""
      }`}
    >
      <div className="room-image-carousel-wrapper text-white">
        {displayCarousel ? (
          <>
            <div className="flex">
              <span
                className="font-semibold text-base ml-10 cursor-pointer"
                onClick={cancelDisplayCarouselHandler}
              >
                {"close"}
              </span>
              <h3 className="text-white flex-grow text-center font-semibold">
                Total Images- {groupImages?.length}
              </h3>
            </div>
            <div className="w-[50%] mx-auto mt-10">
              <OwlCarousel
                items={1}
                responsiveRefreshRate={0}
                dots={true}
                margin={20}
                nav={true}
                loop={true}
                className=""
                center={true}
              >
                {groupImages?.map((item: string, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      {item && (
                        <div className="relative h-[30rem]">
                          <Image src={item} layout="fill" alt="" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </OwlCarousel>
            </div>
          </>
        ) : (
          <div className="mt-5">
            <Link
              href={`./${id}`}
              className="font-bold text-base ml-10 text-black"
            >
              {"Back"}
            </Link>
            <div className="flex  gap-2 w-[50%] mx-auto image-outer-wrapper flex-wrap mt-10 ">
              {groupImages?.map((item: string, index: number) => {
                return (
                  <div
                    className="relative min-h-[20rem] hover:opacity-50 hover:bg-black"
                    key={index}
                    onClick={() => {
                      displayCarouselHandler(index);
                    }}
                  >
                    <Image src={item} layout="fill" alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const getStaticProps = async (context: any) => {
  console.log(context);
  const response = await getData(
    "https://airbus-demo-1a4fb-default-rtdb.firebaseio.com/hotel.json"
  );
  const data = [];
  for (const key in response) {
    data.push({ id: key, ...response[key] });
  }

  const hotelImages = data.find(
    (item) => item.id === context?.params?.images?.[0]
  );
  console.log(hotelImages);
  return {
    props: { images: hotelImages },
  };
};
export const getStaticPaths = async () => {
  const response = await getData(
    "https://airbus-demo-1a4fb-default-rtdb.firebaseio.com/hotel.json"
  );
  const paramKey = [];
  for (const key in response) {
    paramKey.push({ params: { images: [key, `room-images-${key}`] } });
  }

  return {
    paths: paramKey,
    fallback: false,
  };
};

export default ImageContainer;
