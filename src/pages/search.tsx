import Header from "@/components/Header/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { format } from "date-fns";
import Footer from "@/components/Footer/Footer";
interface IProps {
  data: any;
}
const Search: FC<IProps> = (props) => {
  const { data } = props;

  const { query } = useRouter();
  const formattedStartDate = format(
    new Date(query.startDate as string),
    "dd MMMM yy"
  );
  const formattedEndDate = format(
    new Date(query.endDate as string),
    "dd MMMM yy"
  );
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  const placeholder = `${query.location}-${formattedStartDate} - ${formattedEndDate}- ${query.noOfGuests}`;
  return (
    <div>
      <Header placeholder={placeholder} />
      <section>
        <main>
          <h3 className="font-semibold text-sm text-gray-700 py-2 m-5 mt-10">
            {range}
          </h3>
          <div
            className="d-flex items-center flex-w
          w-[100%] space-x-10 ml-5 mt-5"
          >
            <button className="button">Cancellation Policy</button>
            <button className="button">Type of Place</button>
            <button className="button">Price</button>
            <button className="button">Rooms & Beds</button>
            <button className="button">More Filters</button>
          </div>
        </main>
      </section>
      <section>
        <h3 className="cursor-pointer font-bold text-3xl m-5 text-gray-900 py-2">{`Stays in ${query.location}`}</h3>
        <main>
          {data?.map((hotelContent: any) => {
            return (
              <div
                key={hotelContent.id}
                className="flex space-x-5 p-8 shadow-sm flex-wrap hover:shadow-lg transition duration-200 ease-out first:border-t"
              >
                <div className="relative h-[300px] w-[300px] mx-5">
                  <Image
                    src={hotelContent.image}
                    alt="hotel"
                    layout="fill"
                    className="rounded-xl"
                  />
                </div>
                <div className="w-[800px] relative">
                  <h3 className="label">{`Private Rooms in Center of ${query.location}`}</h3>
                  <h3 className="element">{hotelContent.name}</h3>
                  <p className="title">
                    {hotelContent.guests} {hotelContent.bedroom}
                  </p>
                  <p className="desc">{hotelContent.details}</p>
                  <div className="">
                    <span className="text-xl font-semibold text-gray-600">
                      Final Price:
                    </span>{" "}
                    <span className="text-4xl font-bold text-gray-900">
                      {hotelContent.discountedPrice}
                    </span>{" "}
                    <span className="line-through text-gray-600 text-sm font-bold">
                      {hotelContent.price}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </section>
      <Footer />
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await (
    await fetch(
      "https://airbus-demo-1a4fb-default-rtdb.firebaseio.com/hotel.json"
    )
  ).json();
  const data = [];
  for (const key in response) {
    data.push({ id: key, ...response[key] });
  }
  return {
    props: { data },
  };
};

export default Search;
