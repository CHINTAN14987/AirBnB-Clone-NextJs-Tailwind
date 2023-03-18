import Image from "next/image";
import React, { FC } from "react";
interface IProps {
  data: {
    image: string;
    description: string;
    title: string;
  };
}
const LargeCard: FC<IProps> = (props) => {
  const {
    data: { image, title, description },
  } = props;
  return (
    <div className="relative py-12 cursor-pointer">
      <div className="relative h-96 min-w-[300px]">
        <Image src={image} layout="fill" alt="card" />
      </div>
      <div className="absolute top-32 left-12">
        <h3 className="text-4xl mb-3 w-80 font-semibold overflow-rap">
          {title}
        </h3>
        <p className="font-semibold text-gray-800">{description}</p>
        <button className="text-sm text-white bg-gray-900 py-2 px-4 rounded-lg mt-5">
          Get Inspired
        </button>
      </div>
    </div>
  );
};

export default LargeCard;
