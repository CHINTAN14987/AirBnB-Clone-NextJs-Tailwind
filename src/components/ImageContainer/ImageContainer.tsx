import Image from "next/image";
import React, { FC } from "react";
interface IProps {
  view: any[];
}
const ImageContainer: FC<IProps> = (props) => {
  const { view } = props;
  return (
    <section>
      <div className="flex gap-x-2 h-[25rem]">
        <div className="relative flex-1 gap-2">
          <Image
            className="rounded-l-2xl"
            src={view[0]}
            layout="fill"
            alt="view"
            objectFit="cover "
          />
        </div>
        <div className="grid grid-cols-2 flex-1 gap-2">
          {Object.values(view)
            .splice(1, 4)
            ?.map((image: string, index: number) => {
              return (
                <div className="relative h-[12.2rem] flex-grow" key={index}>
                  <Image
                    src={image}
                    layout="fill"
                    alt="view"
                    style={{
                      borderTopRightRadius: view[2] === image ? "1rem" : "",
                      borderBottomRightRadius: view[4] === image ? "1rem" : "",
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ImageContainer;
