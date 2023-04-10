import React, { FC } from "react";
var $ = require("jquery");
declare global {
  interface Window {
    $?: any;
    jQuery?: any;
  }
}
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
interface IProps {
  content: any;
  hover: boolean;
}
const Slider: FC<IProps> = (props) => {
  const { content, hover } = props;

  return (
    <div className="">
      <OwlCarousel
        items={1}
        responsiveRefreshRate={0}
        dots={true}
        nav={hover}
        loop={true}
        className="carousel-width owl-carousel owl-theme"
      >
        {content?.map((item: string, index: number) => {
          return (
            <div key={index}>
              {item && (
                <div>
                  <div
                    className="relative h-[20rem] w-[20rem]"
                    style={{ zIndex: 10 }}
                  >
                    <Image
                      src={item}
                      layout="fill"
                      alt="hotel"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </OwlCarousel>
    </div>
  );
};

export default Slider;
