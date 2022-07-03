import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2" id="home">
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-200 p-2 rounded-xl">
          <p className="text-base text-orange-500">Bike Delivery</p>
          <div className="w-6 h-6 rounded-full bg-white overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              alt="Delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[2.5rem] md:text-[3rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor capitalize">
          The fastest delivery in {""}
          <span className="text-orange-500 text-[3rem] md:text-[4rem] lg:text-[5rem]">
            your city
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat qui
          numquam expedita iste ad blanditiis laboriosam ea modi perspiciatis
          pariatur neque quasi enim, iure quis cupiditate harum fugiat quaerat
          explicabo?
        </p>
        <button
          type="button"
          className="text-base text-textColor bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-100 ease-in-out"
        >
          Order now
        </button>
      </div>
      <div className="py-2 flex-1 relative">
        <div className="w-full flex items-center">
          <img
            src={HeroBg}
            alt="heroBg"
            className="w-full h-420 lg:w-auto lg:h-650 ml-auto"
          />
          <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center py-4  gap-3 lg:gap-4 lg:px-32 flex-wrap">
            {heroData &&
              heroData.map((data) => (
                <div
                  key={data.id}
                  className="w-[160px] lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-md flex items-center justify-center flex-col"
                >
                  <img
                    src={data.imageSrc}
                    alt="I1"
                    className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                  />
                  <p className="text-base lg:text-xl text-textColor font-semibold">
                    {data.name}
                  </p>
                  <p className=" text-[12px] lg:text-sm text-lightTextGray font-semibold  my-1 lg:my-2">
                    {data.desc}
                  </p>
                  <p className="text-base text-textColor">
                    <span className="text-xs text-red-500">$</span>
                    {data.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
