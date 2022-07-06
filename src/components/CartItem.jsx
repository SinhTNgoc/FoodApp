import React from 'react'
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";

const CartItem = ({item}) => {
  

  return (
    <div  className="w-full py-1 px-2 rounded-2xl bg-gray-300 flex items-center gap-2">
    <img
      src={item?.imageURL}
      alt=""
      className="w-[60px] h-20 max-w-[60px] object-contain"
    />
    <div className="flex flex-col gap-2">
      <p className="text-base text-textColor">{item?.title}</p>
      <p className="text-base text-textColor">
        <span className="text-sm text-red-500">$</span>{item?.price}
      </p>
    </div>
    <div className="group ml-auto flex items-center cursor-pointer gap-2">
      <motion.div whileTap={{ scale: 0.75 }}>
        <BiMinus className="text-2xl text-textColor" />
      </motion.div>
      <p className="w-5 h-5 rounded-full flex items-center justify-center text-base text-red-600 bg-white">
        1
      </p>
      <motion.div whileTap={{ scale: 0.75 }}>
        <BiPlus className="text-2xl text-textColor" />
      </motion.div>
    </div>
  </div>
  )
}

export default CartItem