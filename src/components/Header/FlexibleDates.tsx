import React from "react";

const FlexibleDates = () => {
  return (
    <div
      className="w-[50rem] absolute h-[42rem] top-[5rem]"
      style={{ left: "-18rem" }}
    >
      <h3>How long would you like to stay</h3>
      <div>
        <span>Weekend</span>
        <span>Week</span>
        <span>Month</span>
      </div>
      <h3>When Do you want to go</h3>
    </div>
  );
};

export default FlexibleDates;
