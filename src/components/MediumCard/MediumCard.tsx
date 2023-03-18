import Image from "next/image";
import React, { FC } from "react";

interface IProp {
  data: any[];
}
const MediumCard: FC<IProp> = (props) => {
  const { data } = props;
  return (
    <div className="flex overflow-scroll scrollbar-hide">
      {data?.map((location: any, index: number) => {
        return (
          <div
            key={index}
            className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out p-3"
          >
            <div className="relative h-80 w-80 ">
              <Image
                src={location.image}
                alt={"location"}
                layout="fill"
                className="rounded-xl"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MediumCard;
