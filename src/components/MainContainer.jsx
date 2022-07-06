import React, {useState } from "react";
import HomeContainer from "./HomeContainer";

import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import {useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const [{ foodItems, cartShow },dispatch] = useStateValue()

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold text-headingColor capitalize relative before:absolute before:rounded-lg before:content-[''] before:w-32 before:h-1 before:bottom-0 before:left-0 before:bg-gradient-to-tr from-orange-200 to-orange-600 transition-all duration-100 ease-in-out">
            Our fresh & healthy fruits
          </p>
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-md bg-orange-300 flex items-center justify-center cursor-pointer hover:bg-orange-500 hover:shadow-lg transition-all duration-100 ease-in-out "
            >
              <MdChevronLeft
                className="w-10 h-10 text-gray-500"
                onClick={() => setScrollValue(-416)}
              />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-md bg-orange-300 flex items-center justify-center hover:bg-orange-500 hover:shadow-lg transition-all duration-100 ease-in-out"
            >
              <MdChevronRight
                className="w-10 h-10 text-gray-500"
                onClick={() => setScrollValue(416)}
              />
            </motion.div>
          </div>
        </div>
        <RowContainer
          flag={true}
          data={foodItems?.filter((item) => item.category === "fruits")}
          scrollValue={scrollValue}
        />
      </section>

      <MenuContainer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
