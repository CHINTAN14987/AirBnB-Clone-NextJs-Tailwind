import React from "react";
import Slider from "../LargeCard/Slider";
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
import Image from "next/image";
const TopCarouselNav = () => {
  const data = [
    {
      name: "LakeFront",
      img: "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
    },
    {
      name: "National Parks",
      img: "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
    },
    {
      name: "OMG!",
      img: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
    },
    {
      name: "Cabins",
      img: "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
    },
    {
      name: "Historical Homes",
      img: "https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg",
    },
    {
      name: "Design",
      img: "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
    },
    {
      name: "Beach",
      img: "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
    },
    {
      name: "Farms",
      img: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
    },
    {
      img: "https://a0.muscache.com/pictures/6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg",
      name: "Golfing",
    },
    {
      img: "https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg",
      name: "Private Rooms",
    },
    {
      img: "https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg",
      name: "Amazing Pools",
    },
    {
      img: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
      name: "Amazing Views",
    },
    {
      img: "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
      name: "Country Side",
    },
  ];
  return (
    <>
      <div className="w-[80%] mx-auto flex justify-center mt-8">
        <OwlCarousel
          items={15}
          responsiveRefreshRate={0}
          dots={false}
          nav={true}
          loop={true}
          className="top-carousel owl-carousel"
        >
          {data?.map((item: any) => {
            return (
              <div className="flex flex-col w-[fit-content] items-center">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={item.img} layout="fill" alt="" />
                </div>
                <h3 className="text-xs font-bold text-gray-800 text-center">
                  {item?.name}
                </h3>
              </div>
            );
          })}
        </OwlCarousel>
      </div>
    </>
  );
};

export default TopCarouselNav;
