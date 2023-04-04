import {
  appBackground,
  GuestListBookingDecrement,
  GuestListBookingIncrement,
} from "@/redux/action";
import { Button, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../modal/CustomModal";
interface IProps {
  disabled?: boolean;
}
const Guests: FC<IProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayGuestList, setDisplayGuestList] = useState<Boolean>(true);
  const dispatch = useDispatch();
  const list = useSelector((state: any) => state.Reducer.list);
  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(appBackground({ bg: "rgba(0, 0, 0, 0.2)", pos: "initial" }));
  };
  useEffect(() => {
    dispatch(appBackground({ bg: "#fffff", pos: "initial" }));
  }, []);
  const increment = (value: string) => {
    dispatch(GuestListBookingIncrement({ value }));
  };
  const decrement = (type: string) => {
    dispatch(GuestListBookingDecrement({ type }));
  };
  const ModalHandler = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <div
        className="absolute z-30 top-20 w-[25rem] border border-gray-200 rounded-2xl p-10 bg-white"
        style={{ left: "-12.5rem", opacity: !displayGuestList ? "0" : "1" }}
      >
        <div>
          <div className="flex justify-between items-center h-[5rem]  border-b border-gray-200">
            <div className="flex flex-col">
              <h3 className="font-semibold">Adults</h3>
              <h3 className="text-gray-600 text-base">Age 13 or above</h3>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <button
                className="w-[2rem] h-[2rem] rounded-full border border-gray-200 font-bold text-gray-400 hover:text-black hover:border-black"
                onClick={() => {
                  decrement("adult");
                }}
                disabled={list?.adult === 1}
              >
                -
              </button>
              <span>{list?.adult}</span>
              <button
                className="w-[2rem] h-[2rem] rounded-full border border-gray-200 font-bold  text-gray-400 hover:text-black hover:border-black"
                onClick={() => {
                  increment("adult");
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center h-[5rem]  border-b border-gray-200">
            <div className="flex flex-col">
              <h3 className="font-semibold">Children</h3>
              <h3 className="text-gray-600 text-base">Ages 2 - 12</h3>
            </div>
            <div className="flex justify-between items-center space-x-4">
              <button
                className="w-[2rem] h-[2rem] rounded-full border border-gray-200 font-bold text-gray-400 hover:text-black hover:border-black"
                onClick={() => {
                  decrement("children");
                }}
              >
                -
              </button>
              <span>{list?.children}</span>
              <button
                className="w-[2rem] h-[2rem] rounded-full border border-gray-200 font-bold  text-gray-400 hover:text-black hover:border-black"
                onClick={() => {
                  increment("children");
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center h-[5rem]  border-b border-gray-200">
            <div className="flex flex-col">
              <h3 className="font-semibold">Infants</h3>
              <h3 className="text-gray-600 text-base">Under 2</h3>
            </div>
            <div className="flex justify-between items-center space-x-4">
              <button
                className="w-[2rem] h-[2rem] rounded-full border border-gray-200 font-bold  text-gray-400 hover:text-black hover:border-black"
                onClick={() => {
                  decrement("infants");
                }}
              >
                -
              </button>
              <span>{list?.infants}</span>
              <button
                className="w-[2rem] h-[2rem] rounded-full border border-gray-200 font-bold  text-gray-400 hover:text-black hover:border-black"
                onClick={() => {
                  increment("infants");
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center h-[5rem]  border-b border-gray-200">
            <div className="flex flex-col">
              <h3 className="font-semibold">Pets</h3>
              <h3
                className="text-gray-600 text-base font-semibold underline"
                onClick={() => {
                  setDisplayGuestList(false), ModalHandler();
                }}
              >
                Brining a service animal?
              </h3>
            </div>
            <div className="flex justify-between items-center  space-x-4">
              <button
                disabled={props && props.disabled}
                className={` ${
                  props.disabled ? "guests-list-disabled" : ""
                } w-[2rem] h-[2rem] rounded-full border border-gray-200 font-bold  text-gray-400 hover:text-black hover:border-black `}
                onClick={() => {
                  decrement("pets");
                }}
              >
                -
              </button>
              <span>{list?.pets}</span>
              <button
                disabled={props && props.disabled}
                className="w-[2rem] h-[2rem] rounded-full border border-gray-200 font-bold  text-gray-400 hover:text-black hover:border-black"
                onClick={() => {
                  increment("pets");
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CustomModal>
          <Modal open={isModalOpen} onCancel={handleCancel}>
            <div className="relative h-[30rem] w-[30rem]">
              <Image
                src="https://a0.muscache.com/pictures/adafb11b-41e9-49d3-908e-049dfd6934b6.jpg"
                alt="pet"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-xl">Service animals</h3>
              <p className="text-base mb-2">
                Service animals aren’t pets, so there’s no need to add them
                here.
              </p>
              <p className="text-base mb-1">
                Travelling with an emotional support animal? Check out our
              </p>
              <span className="text-base font-bold text-gray-800 underline">
                accessibility policy
              </span>
            </div>
          </Modal>
        </CustomModal>
      )}
    </div>
  );
};

export default Guests;
