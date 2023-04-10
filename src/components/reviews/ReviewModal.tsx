import React, { FC, useState } from "react";
import ReviewGraph from "./ReviewGraph";
import Reviews from "./Reviews";
interface IProps {
  rating: string;
  modalActive?: boolean;
}
const ReviewModal: FC<IProps> = (props) => {
  const { rating } = props;
  const [value, setValue] = useState("");
  return (
    <div className="flex max-h-[30rem] overflow-y-auto mt-12">
      <div>
        <ReviewGraph rating={rating} modalActive={true} />
      </div>
      <div className="mr-4">
        <input
          className="w-[20rem] h-[3rem] border border-gray-400 rounded-full bg-gray-200 placeholder-gray-800 text-base pl-4 mb-4"
          placeholder="search reviews"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <Reviews modalActive={true} rating={rating} inputValue={value} />
      </div>
    </div>
  );
};

export default ReviewModal;
