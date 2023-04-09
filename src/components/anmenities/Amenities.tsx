import React, { useState } from "react";
import CustomModal from "../modal/CustomModal";
import { Modal } from "antd";
import bottle from "../../../public/bottle.png";
import hairdryer from "../../../public/hairdryer.png";
import dryer from "../../../public/dryer.png";
import list from "../../../public/list.png";
import washingmachine from "../../../public/washing-machine.png";
import hanger from "../../../public/clothes-hanger.png";
import iron from "../../../public/iron.png";
import tv from "../../../public/tv.png";
import ac from "../../../public/air-conditioner.png";
import extinguisher from "../../../public/fire-extinguisher.png";
import aid from "../../../public/first-aid-kit.png";
import parking from "../../../public/parking.png";

import Image from "next/image";

const Amenities = ({ amenities }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const amenitiesData = amenities?.split(",");
  const modalHandler = (): void => {
    setIsModalOpen(true);
  };
  return (
    <section className="border-b border-gray-200 pb-8">
      <h3 className="text-3xl text-black font-bold  my-8">
        What this place offers
      </h3>
      <div className="grid grid-cols-2">
        {amenitiesData.map((item: string) => {
          return <span>{item}</span>;
        })}
      </div>
      <button
        onClick={modalHandler}
        className="py-2 px-4 border border-black rounded-lg my-4 text-black font-semibold hover:bg-gray-200"
      >
        Show All Amenities
      </button>
      {isModalOpen && (
        <CustomModal>
          <Modal
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
          >
            <div className="text-lg h-[50rem]  overflow-y-auto my-12">
              <h3 className="font-bold text-2xl mb-4">
                What this place offers
              </h3>
              <p className="font-semibold text-black mb-4">Bathroom</p>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-2 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={hairdryer} layout="fill" alt="" />
                </div>
                <span className="text-base">Hair Dryer</span>
              </div>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-4 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={bottle} layout="fill" alt="" />
                </div>
                <span className="text-base">Shampoo</span>
              </div>
              <h3 className="font-semibold text-black my-4">
                Bedroom and laundry
              </h3>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-2 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={washingmachine} layout="fill" alt="" />
                </div>
                <span className="text-base">Washing Machine</span>
              </div>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-4 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={dryer} layout="fill" alt="" />
                </div>
                <span className="text-base">Dryer</span>
              </div>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-4 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={list} layout="fill" alt="" />
                </div>
                <div>
                  <span className="text-base">Essentials</span>
                  <p className="text-sm text-gray-400">
                    Towels, bed sheets, soap and toilet paper
                  </p>
                </div>
              </div>

              <h3 className="font-semibold mt-4">Other things to note</h3>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-4 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={hanger} layout="fill" alt="" />
                </div>
                <span className="text-base">Hangers</span>
              </div>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-4 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={dryer} layout="fill" alt="" />
                </div>
                <span className="text-base">Dryer</span>
              </div>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-4 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={iron} layout="fill" alt="" />
                </div>
                <span className="text-base">Iron</span>
              </div>
              <h3 className="font-semibold  mt-4">Entertainment</h3>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-4 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={tv} layout="fill" alt="" />
                </div>
                <span className="text-base">TV</span>
              </div>
              <h3 className="font-semibold  mt-4">Heating and Cooling</h3>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-4 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={ac} layout="fill" alt="" />
                </div>
                <span className="text-base">Air Conditioning</span>
              </div>
              <h3 className="font-semibold mt-4">Home Safety</h3>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-4 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={extinguisher} layout="fill" alt="" />
                </div>
                <span className="text-base">Fire extinguisher</span>
              </div>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-4 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={aid} layout="fill" alt="" />
                </div>
                <span className="text-base">First aid</span>
              </div>
              <h3 className="font-semibold mt-4">Parking and facilities</h3>
              <div className="flex  items-center gap-4 border-b border-gray-200 pt-4 pb-4">
                <div className="relative h-[1.5rem] w-[1.5rem]">
                  <Image src={parking} layout="fill" alt="" />
                </div>
                <span className="text-base">Parking</span>
              </div>
            </div>
          </Modal>
        </CustomModal>
      )}
    </section>
  );
};

export default Amenities;
