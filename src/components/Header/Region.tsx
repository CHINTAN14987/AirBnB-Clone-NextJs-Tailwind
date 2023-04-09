import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClockCircleOutlined } from "@ant-design/icons";
interface IRegionList {
  image: string;
  region: string;
}
const regionList: IRegionList[] = [
  {
    image:
      "https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg",
    region: "I'm Flexible",
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320",
    region: "Europe",
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/dbb2b5ef-2efe-4099-81ac-c7b957f384ed.jpg?im_w=320",
    region: "United Kingdom",
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/d77de9f5-5318-4571-88c7-e97d2355d20a.jpg?im_w=320",
    region: "Southeast Asia",
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/e1a36727-5064-4ba7-a870-4f9fec72def7.jpg?im_w=320",
    region: "United Arab Emirates",
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320",
    region: "Middle East",
  },
];

const Region = () => {
  const bookingDetails = useSelector((state: any) => state.Reducer);

  return (
    <div
      className="absolute z-30 border border-gray-200 rounded-2xl p-5 bg-white shadow-white shadow-lg flex left-0 top-20 flex "
      style={{ width: bookingDetails?.results?.length ? "45rem" : "28rem" }}
    >
      {bookingDetails?.results?.length ? (
        <div className="flex-grow border-r-2">
          <h3 className="text-sm font-semibold mb-8">Recent Searches</h3>
          <div className="flex flex-col space-y-6 pr-4">
            {bookingDetails?.results?.map((item: any, index: number) => {
              return (
                <div className="flex justify-between" key={index}>
                  <div className="w-[3rem] h-[3rem] flex items-center justify-center bg-gray-200 rounded-xl pb-2">
                    <ClockCircleOutlined className="text-3xl" />
                  </div>
                  <div>
                    <h3 className=" text-gray-600">{item.location} - Stays</h3>
                    {item.startDate && item.endDate ? (
                      <h3 className="text-xs text-gray-600">
                        {item.startDate} - {item.endDate}
                      </h3>
                    ) : (
                      <h3 className="text-xs text-gray-400">Any Week</h3>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="ml-8">
        <h3 className="text-sm font-semibold mb-8">Search regions</h3>
        <div className="grid grid-cols-3  ">
          {regionList?.map((content: IRegionList, index: number) => {
            return (
              <div key={index} className="pb-2">
                <div className="relative h-[7rem] w-[7rem] ">
                  <Image
                    src={content?.image}
                    alt="region"
                    layout="fill"
                    className="rounded-2xl border  border-gray-400 hover:border-black"
                  />
                </div>
                <h3 className="text-gray-900 text-sm mt-1">{content.region}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Region;
