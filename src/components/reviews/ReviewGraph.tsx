import { StarFilled } from "@ant-design/icons";
import { Progress } from "antd";
import React, { FC } from "react";
import Reviews from "./Reviews";
interface IProps {
  rating: string;
  modalActive: boolean;
}
const ReviewGraph: FC<IProps> = (props) => {
  const { rating, modalActive } = props;
  const graphData = [
    { content: "Cleanliness", rating: "4.7" },
    { content: "Accuracy", rating: "4.8" },
    { content: "Location", rating: "4.9" },
    { content: "Check-in", rating: "4.9" },
    { content: "Communication", rating: "4.71" },
  ];
  return (
    <div className="mt-8">
      {rating && (
        <div className="flex items-center">
          <StarFilled className="-mt-2 text-2xl" />
          <span className="ml-1 font-bold text-xl">{rating}</span>
          <span className="ml-1 font-bold text-xl">. 10 Reviews</span>
        </div>
      )}
      <div
        className={`${
          modalActive ? "mr-8" : "grid grid-cols-2 gap-4 mt-4 graph"
        }`}
      >
        {graphData?.map((item) => {
          return (
            <div
              key={item.content}
              className="flex justify-between items-center"
            >
              <span>{item.content}</span>
              <div className="w-[15rem]">
                <Progress
                  percent={+item.rating * 20}
                  showInfo={false}
                  strokeColor="black"
                  style={{ width: "12rem" }}
                />
                <span className="font-bold">{item.rating}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewGraph;
