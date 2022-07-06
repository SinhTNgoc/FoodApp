import React, { useContext, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categoriesData } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { globalState } from "../context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");
  const [{ foodItems },dispatch] = useContext(globalState);
  return (
    <section className="w-full" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold text-headingColor capitalize mr-auto relative before:absolute before:rounded-lg before:content-[''] before:w-16 before:h-1 before:bottom-0 before:left-0 before:bg-gradient-to-tr from-orange-200 to-orange-600 transition-all duration-100 ease-in-out">
          Our host dishes
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categoriesData &&
            categoriesData.map((item) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={item.id}
                className={`group ${
                  filter === item.urlParamName ? "bg-red-500" : "bg-cardOverlay"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-md drop-shadow-xl flex flex-col gap-3 items-center justify-center transition-all duration-100 ease-in-out hover:bg-red-500`}
                onClick={(e) => setFilter(item.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    filter === item.urlParamName
                      ? "bg-cardOverlay"
                      : "bg-red-500"
                  }  group-hover:bg-cardOverlay`}
                >
                  <IoFastFood className="w-5 h-5  text-white  group-hover:text-textColor" />
                </div>
                <p
                  className={`text-base ${
                    filter === item.urlParamName
                      ? "text-cardOverlay"
                      : "text-textColor"
                  }  group-hover:text-cardOverlay`}
                >
                  {item.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((item) => item.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
