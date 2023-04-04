import Image from "next/image";
import React, { FC } from "react";
import Form from "./Form";
interface IProps {
  data: {
    image: string;
    description: string;
    title: string;
  };
}
const Banner: FC<IProps> = (props) => {
  const {
    data: { image, title, description },
  } = props;
  return (
    <div className="cursor-pointer mx-auto p-16">
      <div className="flex justify-end">
        <div className="relative h-[35rem] w-[60rem] ">
          <Image src={image} layout="fill" alt="card" className="rounded-xl" />
        </div>
      </div>
      <Form />
    </div>
  );
};

export default Banner;
