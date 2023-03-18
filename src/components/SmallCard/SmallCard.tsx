import Image from "next/image";
import React, { FC } from "react";
interface IProps {
  country: any;
}
const SmallCard: FC<IProps> = (props) => {
  const { country } = props;
  console.log(country);
  return (
    <div className="grid grid-cols-1 sm:grid-col-2 lg:grid-col-3 xl:grid-cols-4">
      {country?.map((countryData: any) => {
        return (
          <div
            key={countryData.id}
            className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out"
          >
            <div className="relative h-16 w-16">
              <Image
                className="rounded-lg"
                src={countryData.images}
                layout="fill"
                alt="country"
              />
            </div>
            <div>
              <h2>{countryData.location}</h2>
              <h3 className="text-gray-500 ">{countryData.Distance}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SmallCard;
