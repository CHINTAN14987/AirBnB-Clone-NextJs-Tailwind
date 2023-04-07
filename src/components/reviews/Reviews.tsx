import React, { useState, FC } from "react";
import data from "./data.json";
import ReviewModal from "./ReviewModal";
import { Modal } from "antd";
import CustomModal from "../modal/CustomModal";

interface IProps {
  rating: string;
  modalActive: boolean;
  inputValue?: string;
}
const Reviews: FC<IProps> = (props) => {
  const { rating, modalActive, inputValue } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const detailedReviews = modalActive
    ? inputValue
      ? data?.reviewData.filter((item: any) => {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(inputValue.toLowerCase());
        })
      : data?.reviewData
    : data?.reviewData?.slice(0, 6);
  const ModalHandler = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <div
        className={`${
          modalActive ? "" : "grid grid-cols-2 gap-x-32 gap-y-8 mt-12"
        }`}
      >
        {detailedReviews.length ? (
          <>
            {detailedReviews.map((review: any) => {
              return (
                <div>
                  <div className="flex space-x-4">
                    <div className="h-[3rem] w-[3rem]">
                      <img src={review.img} alt="" className="rounded-full" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-base">
                        {review.name}
                      </span>
                      <span className="text-sm text-gray-600">
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <div>
                    {!modalActive && review.content.length > 150 ? (
                      <div>
                        <p className="mb-2 text-lg font-light">
                          {review.content.substring(0, 150)}...
                        </p>
                        <span
                          className="font-bold text-base cursor-pointer"
                          onClick={ModalHandler}
                        >
                          Show more {">"}
                        </span>
                      </div>
                    ) : (
                      <p
                        className={`${
                          modalActive
                            ? "mt-2 mb-8 text-base"
                            : "mb-2 text-lg font-light"
                        }`}
                      >
                        {review.content}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div>
            <h3 className="text-sm font-semibold mb-4">
              There are no results for {"‘none’"}
            </h3>
            <p className="text-base text-gray-400 mb-4">
              Reviews translated from another language will not appear. You can
              search in the original language.
            </p>
          </div>
        )}
        {!modalActive && (
          <button
            className="text-base font-semibold border border-black px-2 py-4 w-[15rem] rounded-xl mb-8 hover:bg-gray-100"
            onClick={ModalHandler}
          >
            Show All Reviews
          </button>
        )}
      </div>
      {isModalOpen && (
        <div className="review-modal">
          <Modal
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            style={{ minHeight: "20rem" }}
          >
            <ReviewModal rating={rating} />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Reviews;
