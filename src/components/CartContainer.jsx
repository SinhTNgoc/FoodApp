import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";

import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/actionType";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";

const CartContainer = () => {
  const [{ cartShow, cartItems }, dispatch] = useStateValue();
  const showCart = () => {
    dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, type: "spring" }}
      exit={{ opacity: 0, x: 200 }}
      className="w-full md:w-[375px] h-screen fixed top-0 right-0 z-[101] bg-white drop-shadow-sm flex flex-col"
    >
      <div className="w-full flex items-center justify-between p-4">
        <motion.div whileTap={{ scale: 0.4 }}>
          <MdOutlineKeyboardBackspace
            className="w-10 h-10 text-textColor cursor-pointer"
            onClick={showCart}
          />
        </motion.div>
        <p className="text-xl text-textColor font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.4 }}
          className="flex items-center gap-2 bg-gray-300 rounded-2xl cursor-pointer text-base text-textColor px-2 hover:bg-gray-200 hover:shadow-md transition-all duration-100 ease-in-out"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg  rounded-t-[2rem] flex flex-col">
          <div className="w-full h-340 md:h-[440px] px-6 py-10 flex flex-col gap-4 overflow-y-scroll scrollbar-none">
            {cartItems.map((item, index) => (
              <CartItem item={item} key={index} />
            ))}
          </div>

          <div className="w-full flex-1 bg-gray-300 overflow-x-hidden rounded-t-[2rem] flex flex-col  mt-4 md:mt-24 px-8 py-4 gap-3 justify-center">
            <div className="w-full flex items-center justify-between">
              <p className="text-base text-textColor capitalize">Sub total</p>
              <p className="text-base text-textColor">
                <span className="text-sm text-red-500">$</span>10
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-base text-textColor capitalize">Delivery</p>
              <p className="text-base text-textColor">
                <span className="text-sm text-red-500">$</span>10
              </p>
            </div>
            <hr className="border-1 border-gray-600 my-2" />
            <div className="w-full flex items-center justify-between">
              <p className="text-base text-textColor capitalize">Total</p>
              <p className="text-base text-textColor">
                <span className="text-sm text-red-500">$</span>10
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.75 }}
              type="button"
              className="w-full p-2 my-2 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-xl cursor-pointer text-base text-textColor capitalize"
            >
              Check out
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full h-340 md:h-[440px] px-6 py-10 flex flex-col justify-center items-center gap-4 overflow-y-scroll scrollbar-none">
          <img
            src={EmptyCart}
            alt="emptycart"
            className="w-full object-contain"
          />
          <p className="text-xl text-textColor">No items here!</p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
